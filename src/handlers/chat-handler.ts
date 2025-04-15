import { Client, Message, OmitPartialGroupDMChannel } from "discord.js";
import { createChat } from "../utility/google-api";
import { activityResolver } from "../utility/random-activity";
import { Chat } from "@google/genai";

async function handleChat(
  message: OmitPartialGroupDMChannel<Message<boolean>>,
  client: Client<boolean>,
  chatSession: Chat[],
) {
  if (message.author.bot) return;
  if (!message.mentions.users.has(client.user?.id ?? "")) return;
  const userMessage = message.content.replace(/<@!?(\d+)>/, "").trim();
  const currentActivity = client.user?.presence.activities[0];
  if (chatSession.length === 0) {
    try {
      const chat = createChat(activityResolver(currentActivity!));
      chatSession.push(chat);
      const botResponse = await chat.sendMessage({
        message: userMessage,
      });
      message.reply({
        content: `${message.author.username} says "${botResponse.text}"`,
      });
    } catch (error) {
      console.error("Error creating context or getting AI response:", error);
    }
    return;
  }
  try {
    const botResponse = await chatSession[0].sendMessage({
      message: userMessage,
    });
    message.reply({ content: botResponse.text });
  } catch (error) {
    console.error("Error getting AI response or deleting context:", error);
  }
}

export default handleChat;
