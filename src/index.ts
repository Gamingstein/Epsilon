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

async function getAIResponse(
  messageContent: string,
  username: string,
): Promise<string> {
  const inputMessage = `Your name is Epsilon, an advanced and friendly AI developed by Gamingstein for Discord. "${username}" has asked you: "${messageContent}". Respond in a concise, engaging, and human-like manner. Show appropriate emotions and empathy, and make minor mistakes occasionally, correcting them in future interactions. Remember the context of the ongoing conversation and respond accordingly. Use Discord-specific features like emojis, text formatting (bold, italic, monospace), and casual language. Provide only the response you would give to them, nothing else.`;

  // const inputMessage = `Your name is Epsilon, an all-in-one Smart Bot for Discord developed by Gamingstein. ${message.author.username} asked you the following: "${messageContent}". Respond briefly and naturally, as if you were a human conversing with another human. Show emotions, even if they are simulated, and make minor mistakes occasionally, but correct them in future interactions. Remember the ongoing conversation and respond accordingly. Chat as if you are on Discord, using emojis, text formatting like bold, italic, and monospace. Only provide the response you would give to them, nothing else.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: inputMessage,
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

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;
  if (!message.mentions.users.has(client.user?.id ?? "")) return;

  const userMessage = message.content.replace(/<@!?(\d+)>/, "").trim();
  const botResponse = await getAIResponse(userMessage, message.author.username);

  message.reply(botResponse);
});

client.login(token);
