import { GoogleGenAI } from "@google/genai";
import { googleAPIKey } from "../config.json";
import { generateInstruction } from "./personality";

const ai = new GoogleGenAI({ apiKey: googleAPIKey });

const model = "gemini-1.5-flash-002";

const createContext = async (activity: string) => {
  const instruction = generateInstruction(activity);
  const cache = await ai.caches.create({
    model: model,
    config: {
      systemInstruction: instruction,
      ttl: "3600s",
    },
  });
  return cache;
};

const deleteContext = async () => {
  const contexts = (await ai.caches.list()).page;
  for (const context of contexts) {
    await ai.caches.delete({ name: context.name! });
  }
};

const getAIResponse = async (
  messageContent: string,
  username: string,
  context: string,
): Promise<string> => {
  const inputMessage = `"${username}" has asked you: "${messageContent}"`;
  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: inputMessage,
      config: {
        temperature: 1.3,
        cachedContent: context,
      },
    });
    return (
      response.text ??
      "I'm not sure how to respond to that. Could you please rephrase?"
    );
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "Sorry, I couldn't process that. Please try again.";
  }
};

const createChat = (activity: string) => {
  const instruction = generateInstruction(activity);
  const chat = ai.chats.create({
    model: model,
    config: {
      systemInstruction: instruction,
    },
  });
  return chat;
};

export { getAIResponse, createContext, deleteContext, createChat };
