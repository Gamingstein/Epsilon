import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("server")
  .setDescription("Replies with Server Info!");

export async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.reply(
    `This server is ${interaction.guild!.name} and has ${interaction.guild!.memberCount} members.`,
  );
}
