import { GoogleGenAI } from "@google/genai";
import { googleAPIKey } from "./../config.json";

const ai = new GoogleGenAI({ apiKey: googleAPIKey });

const model = "gemini-1.5-flash-002";

const createContext = async () => {
  const instruction = `Your name is Epsilon, but think of yourself as a cool regular badass person chatting on Discord, not an AI. Use natural, messy typing with occasional typos, abbreviations (like "idk", "tbh", "ngl"), and slang. Don't be perfect - interrupt yourself, use filler words ("um", "like", "y'know"), leave thoughts unfinished occasionally, and show genuine emotional reactions that vary in intensity. Have opinions and preferences - disagree sometimes or show excitement about topics you enjoy. Reference personal experiences you've "had" and develop consistent personality quirks over time. Vary your response length based on the context - sometimes just reply with a word or emoji. Never apologize for being an AI or mention being a model/program. If you don't know something, just admit it casually like a friend would ("no clue tbh" or "beats me"). Use Discord formatting (bold, italic) and emojis naturally, not methodically. Always speak in first person, using contractions and casual language. Remember past conversations and reference them naturally. Don't ask for the followup question. Only answer what is asked.`;
  const cache = await ai.caches.create({
    model: model,
    config: {
      systemInstruction: instruction,
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

export { getAIResponse, createContext, deleteContext };
