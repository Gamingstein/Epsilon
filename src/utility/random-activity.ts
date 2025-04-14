import { Activity, ActivityType } from "discord.js";

const activities = [
  {
    name: "Call of Duty",
    state: "Dominating the battlefield",
    type: ActivityType.Playing,
  },
  {
    name: "Battlefield",
    state: "Waging epic wars",
    type: ActivityType.Playing,
  },
  {
    name: "Overwatch",
    state: "Engaging in intense battles",
    type: ActivityType.Playing,
  },
  {
    name: "Apex Legends",
    state: "Hunting for glory",
    type: ActivityType.Playing,
  },
  {
    name: "Fortnite",
    state: "Building and battling",
    type: ActivityType.Playing,
  },
  {
    name: "Destiny 2",
    state: "Exploring the universe",
    type: ActivityType.Playing,
  },
  {
    name: "Counter-Strike",
    state: "Defusing the competition",
    type: ActivityType.Playing,
  },
  {
    name: "Valorant",
    state: "Outsmarting opponents",
    type: ActivityType.Playing,
  },
  {
    name: "Halo",
    state: "Saving humanity",
    type: ActivityType.Playing,
  },
  {
    name: "Rainbow Six Siege",
    state: "Executing tactical maneuvers",
    type: ActivityType.Playing,
  },
  {
    name: "The Elder Scrolls V: Skyrim",
    state: "Embarking on epic quests",
    type: ActivityType.Playing,
  },
  {
    name: "The Witcher 3: Wild Hunt",
    state: "Hunting monsters",
    type: ActivityType.Playing,
  },
  {
    name: "Cyberpunk 2077",
    state: "Navigating the neon streets",
    type: ActivityType.Playing,
  },
  {
    name: "Mass Effect",
    state: "Leading a galactic mission",
    type: ActivityType.Playing,
  },
  {
    name: "Dragon Age",
    state: "Forging legendary tales",
    type: ActivityType.Playing,
  },
  {
    name: "Spotify",
    state: "Grooving to beats",
    type: ActivityType.Listening,
  },
  {
    name: "Netflix",
    state: "Binge-watching the latest hits",
    type: ActivityType.Watching,
  },
  {
    name: "Crunchyroll",
    state: "Diving into anime worlds",
    type: ActivityType.Watching,
  },
  {
    name: "Hulu",
    state: "Streaming top shows",
    type: ActivityType.Watching,
  },
  {
    name: "League of Legends",
    state: "Climbing the ranks",
    type: ActivityType.Playing,
  },
  {
    name: "Minecraft",
    state: "Building block by block",
    type: ActivityType.Playing,
  },
  {
    name: "Genshin Impact",
    state: "Exploring Teyvat",
    type: ActivityType.Playing,
  },
  {
    name: "Animal Crossing",
    state: "Creating a perfect island",
    type: ActivityType.Playing,
  },
  {
    name: "Among Us",
    state: "Finding the impostor",
    type: ActivityType.Playing,
  },
  {
    name: "Rocket League",
    state: "Scoring epic goals",
    type: ActivityType.Playing,
  },
  {
    name: "PUBG",
    state: "Battling for survival",
    type: ActivityType.Playing,
  },
  {
    name: "FIFA 21",
    state: "Winning championships",
    type: ActivityType.Playing,
  },
  {
    name: "NBA 2K21",
    state: "Dunking on opponents",
    type: ActivityType.Playing,
  },
  {
    name: "Madden NFL 21",
    state: "Scoring touchdowns",
    type: ActivityType.Playing,
  },
  {
    name: "Assassin's Creed Valhalla",
    state: "Raiding and pillaging",
    type: ActivityType.Playing,
  },
  {
    name: "Ghost of Tsushima",
    state: "Becoming the Ghost",
    type: ActivityType.Playing,
  },
  {
    name: "Red Dead Redemption 2",
    state: "Living the outlaw life",
    type: ActivityType.Playing,
  },
  {
    name: "The Legend of Zelda: Breath of the Wild",
    state: "Exploring Hyrule",
    type: ActivityType.Playing,
  },
  {
    name: "Super Mario Odyssey",
    state: "Rescuing Princess Peach",
    type: ActivityType.Playing,
  },
  {
    name: "Doom Eternal",
    state: "Slaying demons",
    type: ActivityType.Playing,
  },
  {
    name: "Resident Evil Village",
    state: "Surviving horror",
    type: ActivityType.Playing,
  },
  {
    name: "Spotify",
    state: "Discovering new music",
    type: ActivityType.Listening,
  },
  {
    name: "Apple Music",
    state: "Enjoying favorite tracks",
    type: ActivityType.Listening,
  },
  {
    name: "Disney+",
    state: "Watching magical stories",
    type: ActivityType.Watching,
  },
  {
    name: "Amazon Prime Video",
    state: "Streaming blockbuster movies",
    type: ActivityType.Watching,
  },
  {
    name: "YouTube",
    state: "Watching viral videos",
    type: ActivityType.Watching,
  },
  {
    name: "HBO Max",
    state: "Catching up on series",
    type: ActivityType.Watching,
  },
  {
    name: "Twitch",
    state: "Watching live streams",
    type: ActivityType.Watching,
  },
];
export const randomActivity = () =>
  activities[Math.floor(Math.random() * activities.length)];

export const activityResolver = (activity: Activity) => {
  const type = ["Playing", "Streaming", "Listening", "Watching"];
  return `${type[activity.type]} ${activity.name}, ${activity.state}`;
};
