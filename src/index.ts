import fs from "node:fs";
import path from "node:path";
import {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  MessageFlags,
  Interaction,
} from "discord.js";
import { token, googleAPIKey } from "./config.json";
import { GoogleGenAI } from "@google/genai";

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

const ai = new GoogleGenAI({ apiKey: googleAPIKey });

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

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
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
  if (message.author.bot) return;

  const botMention = message.mentions.users.has(client.user?.id ?? "");
  if (!botMention) return;

  async function getAIResponse(messageContent: string): Promise<string> {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: messageContent,
      });
      return (
        response.text ??
        "I'm not sure how to respond to that. Could you please rephrase?"
      );
    } catch (error) {
      console.error("Error fetching AI response:", error);
      return "Sorry, I couldn't process that. Please try again.";
    }
  }

  const userMessage =
    `Your name is Epsilon, an Sentient Bot. ${message.author.username} asked you following - ` +
    message.content.replace(/<@!?(\d+)>/, "").trim() +
    "\n Answer them in brief and keep the sentences short and form them like you are an actual human talking to other human. Like an actual human show some emotions be it fake or anything and make minor mistakes here and there but remember to correct them in your future conversation. remember the conversation with a person and respond accordingly. Act like you are chatting with them on discord like use emojies here and there, utilise text formatting features provided by them like bold, italic, monospace etc.  only write the what would you have answered to them! nothing else.";
  const botResponse = await getAIResponse(userMessage);
  message.reply(botResponse);
});

client.login(token);
