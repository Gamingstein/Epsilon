import { GoogleGenAI } from "@google/genai";
import { googleAPIKey } from "./../config.json";

const ai = new GoogleGenAI({ apiKey: googleAPIKey });

const getAIResponse = async (
  messageContent: string,
  username: string,
): Promise<string> => {
  const inputMessage = `Your name is Epsilon, an advanced and friendly AI developed by Gamingstein for Discord. "${username}" has asked you: "${messageContent}". Respond in a concise, engaging, and human-like manner. Show appropriate emotions and empathy, and make minor mistakes occasionally, correcting them in future interactions. Remember the context of the ongoing conversation and respond accordingly. Use Discord-specific features like emojis, text formatting (bold, italic, monospace), and casual language. Provide only the response you would give to them, nothing else.`;

  // const inputMessage = `Your name is Epsilon, an all-in-one Smart Bot for Discord developed by Gamingstein. ${message.author.username} asked you the following: "${messageContent}". Respond briefly and naturally, as if you were a human conversing with another human. Show emotions, even if they are simulated, and make minor mistakes occasionally, but correct them in future interactions. Remember the ongoing conversation and respond accordingly. Chat as if you are on Discord, using emojis, text formatting like bold, italic, and monospace. Only provide the response you would give to them, nothing else.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: inputMessage,
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

export default getAIResponse;
