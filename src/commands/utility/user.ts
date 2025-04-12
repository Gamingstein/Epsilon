import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("user")
  .setDescription("Replies with User Info!");

export async function execute(interaction: ChatInputCommandInteraction) {
  console.log(interaction.member);
  await interaction.reply(
    `This command was run by ${interaction.user.username}.`,
  );
}
