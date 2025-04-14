import {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  Interaction,
  MessageFlags,
} from "discord.js";
import fs from "node:fs";
import path from "node:path";
import { token } from "./config.json";
import {
  createContext,
  deleteContext,
  getAIResponse,
} from "./utility/google-api";
import { activityResolver, randomActivity } from "./utility/random-activity";

interface Command {
  data: {
    name: string;
  };
  execute: (interaction: Interaction) => Promise<void>;
}

declare module "discord.js" {
  interface Client {
    commands: Collection<string, Command>;
  }
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
});

client.commands = new Collection();
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);
const context: string[] = [];

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    import(filePath)
      .then((command) => {
        if ("data" in command && "execute" in command) {
          client.commands.set(command.data.name, command);
        } else {
          console.log(
            `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
          );
        }
      })
      .catch((error) => {
        console.error(`Error loading command at ${filePath}:`, error);
      });
  }
}

client.once(Events.ClientReady, async (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
  client.user?.setActivity(randomActivity());
});

client.on(Events.InteractionCreate, async (interaction) => {
  //slash commands
  if (!interaction.isChatInputCommand()) return;
  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        flags: MessageFlags.Ephemeral,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        flags: MessageFlags.Ephemeral,
      });
    }
  }
});

client.on(Events.MessageCreate, async (message) => {
  //mentions
  if (message.author.bot) return;
  if (!message.mentions.users.has(client.user?.id ?? "")) return;
  const userMessage = message.content.replace(/<@!?(\d+)>/, "").trim();
  const currentActivity = client.user?.presence.activities[0];
  if (context.length === 0) {
    createContext(activityResolver(currentActivity!)).then(async (ctx) => {
      context.push(ctx.name!);
      const botResponse = await getAIResponse(
        userMessage,
        message.author.globalName ?? message.author.username,
        ctx.name!,
      );
      message.reply({ content: botResponse });
    });
    return;
  }

  getAIResponse(
    userMessage,
    message.author.globalName ?? message.author.username,
    context[0],
  ).then(async (botResponse) => {
    message.reply({ content: botResponse });
    if (userMessage.toLowerCase().includes("bye")) {
      await deleteContext();
      context.pop();
      console.log("Context Deleted!");
    }
  });
});

client.login(token);
