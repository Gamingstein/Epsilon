import {
  ChatInputCommandInteraction,
  MessageFlags,
  SlashCommandBuilder,
} from "discord.js";

const getRandomGif = () => {
  const gifs = [
    "https://media.giphy.com/media/dykJfX4dbM0Vy/giphy.gif",
    "https://media.giphy.com/media/5Zesu5VPNGJlm/giphy.gif",
    "https://media.giphy.com/media/WRQBXSCnEFJIuxktnw/giphy.gif",
    "https://media.giphy.com/media/c7PcKQlOqZ8Ws/giphy.gif",
    "https://media.giphy.com/media/APqEbxBsVlkWSuFpth/giphy.gif",
    "https://media.giphy.com/media/a5viI92PAF89q/giphy.gif",
  ];
  return gifs[Math.floor(Math.random() * gifs.length)];
};

const getRandomColor = () => {
  const colors = [
    0x1abc9c, // Turquoise
    0x3498db, // Peter River
    0x9b59b6, // Amethyst
    0xe91e63, // Pink
    0xf1c40f, // Sun Flower
    0x2ecc71, // Emerald
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const data = new SlashCommandBuilder()
  .setName("start")
  .setDescription("Start the bot.");

export async function execute(interaction: ChatInputCommandInteraction) {
  const embed = {
    color: getRandomColor(),
    title: "Bot is Now Online!",
    description:
      "🚀 The bot has launched into action and is here to help you conquer the digital realm! 🌟",
    thumbnail: {
      url: "https://media.giphy.com/media/TIxfp0OX8RsdXWgUdn/giphy.gif",
    },
    fields: [
      {
        name: "User",
        value: interaction.user.username,
        inline: true,
      },
      {
        name: "Joined Discord",
        value: new Date(interaction.user.createdAt).toLocaleString(),
        inline: true,
      },
    ],
    image: {
      url: getRandomGif(),
    },
    timestamp: new Date().toISOString(),
    footer: {
      text: "Bot Startup Routine",
      iconURL: "https://media.giphy.com/media/TIxfp0OX8RsdXWgUdn/giphy.gif",
    },
  };

  await interaction.reply({
    embeds: [embed],
    content:
      "🌟 The bot has successfully launched and is now online! 🚀 Get ready to explore a world of endless possibilities and let the digital adventure begin. Whether you need assistance, entertainment, or just a friendly companion, the bot is here to make your experience extraordinary. Let's conquer the digital realm together! 🌐",
    flags: MessageFlags.Ephemeral,
  });
}
