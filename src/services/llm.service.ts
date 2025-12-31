import { groq } from "../config/groq.client";
import { SYSTEM_PROMPT } from "../constants/supportPrompt";
import type { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions";

interface ChatHistoryMessage {
  sender: "user" | "ai";
  text: string;
}

export const generateReply = async (
  history: ChatHistoryMessage[],
  userMessage: string
): Promise<string> => {
  try {
    const messages: ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      ...history.slice(-6).map(
        (msg): ChatCompletionMessageParam => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text,
        })
      ),
      {
        role: "user",
        content: userMessage,
      },
    ];

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages,
      temperature: 0.3,
      max_tokens: 200,
    });

    return (
      response.choices[0]?.message?.content ??
      "Sorry, I could not generate a response."
    );
  } catch (error: any) {
    console.error("Groq LLM error:", error.message || error);
    return "Sorry, our support assistant is temporarily unavailable.";
  }
};
