import { Request, Response } from "express";
import { processChatMessage } from "../services/chat.service";
import { getChatHistoryByConversationId } from "../services/chat.service";

const MAX_MESSAGE_LENGTH = 1000;

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { message, sessionId } = req.body;

    // Validate input
    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({
        error: "Message is too long. Please keep it under 1000 characters.",
      });
    }

    const { conversationId, aiReply } = await processChatMessage(
      message,
      sessionId
    );

    return res.status(200).json({
      sessionId: conversationId,
      reply: aiReply,
    });
  } catch (error: any) {
    console.error("sendMessage error:", error.message || error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getChatHistory = async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;

    if (!conversationId) {
      return res.status(400).json({
        error: "conversationId is required",
      });
    }

    const messages = await getChatHistoryByConversationId(conversationId);

    return res.status(200).json({
      conversationId,
      messages,
    });
  } catch (error: any) {
    console.error("getChatHistory error:", error.message || error);
    return res.status(500).json({
      error: "Failed to fetch chat history",
    });
  }
};
