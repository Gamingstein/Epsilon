import {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  Interaction,
} from "discord.js";
import path from "node:path";
import { token } from "./config.json";
import { slashHandler } from "./handlers/slash-handler";
import { loadCommands } from "./utility/load-commands";
import { randomActivity } from "./utility/random-activity";
import handleChat from "./handlers/chat-handler";
import { Chat } from "@google/genai";

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
// const context: string[] = [];
const chat: Chat[] = [];

loadCommands(client, foldersPath);

client.once(Events.ClientReady, async (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
  client.user?.setActivity(randomActivity());
});

client.on(Events.InteractionCreate, slashHandler);
client.on(Events.MessageCreate, (message) => handleChat(message, client, chat));
// client.on(Events.MessageCreate, (message) =>
//   handleMessageCreate(message, client, context),
// );

client.login(token);
