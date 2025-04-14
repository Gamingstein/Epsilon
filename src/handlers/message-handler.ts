import { Client, Message, OmitPartialGroupDMChannel } from "discord.js";
import {
  createContext,
  deleteContext,
  getAIResponse,
} from "../utility/google-api";
import { activityResolver } from "../utility/random-activity";

async function handleMessageCreate(
  message: OmitPartialGroupDMChannel<Message<boolean>>,
  client: Client<boolean>,
  context: string[],
) {
  if (message.author.bot) return;
  if (!message.mentions.users.has(client.user?.id ?? "")) return;
  const userMessage = message.content.replace(/<@!?(\d+)>/, "").trim();
  const currentActivity = client.user?.presence.activities[0];
  if (context.length === 0) {
    try {
      const ctx = await createContext(activityResolver(currentActivity!));
      context.push(ctx.name!);
      const botResponse = await getAIResponse(
        userMessage,
        message.author.globalName ?? message.author.username,
        ctx.name!,
      );
      message.reply({ content: botResponse });
    } catch (error) {
      console.error("Error creating context or getting AI response:", error);
    }
    return;
  }

  try {
    const botResponse = await getAIResponse(
      userMessage,
      message.author.globalName ?? message.author.username,
      context[0],
    );
    message.reply({ content: botResponse });
    if (userMessage.toLowerCase().includes("bye")) {
      await deleteContext();
      context.pop();
      console.log("Context Deleted!");
    }
  } catch (error) {
    console.error("Error getting AI response or deleting context:", error);
  }
}

export { handleMessageCreate };
