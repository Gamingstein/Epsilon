import { Client } from "discord.js";
import fs from "node:fs";
import path from "node:path";

export function loadCommands(client: Client, foldersPath: string) {
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
}
