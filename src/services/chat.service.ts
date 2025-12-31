import { supabase } from "../config/supabase.client";
import { ChatHistoryMessage } from "../types/chat";
import { generateReply } from "./llm.service";

export const processChatMessage = async (
  message: string,
  sessionId?: string
): Promise<{ conversationId: string; aiReply: string }> => {
  let conversationId: string;

  // Create conversation if needed
  if (sessionId) {
    conversationId = sessionId;
  } else {
    const { data, error } = await supabase
      .from("conversations")
      .insert({})
      .select("id")
      .single();

    if (error || !data) {
      throw new Error("Failed to create conversation");
    }

    conversationId = data.id;
  }

  // Save user message
  await supabase.from("messages").insert({
    conversation_id: conversationId,
    sender: "user",
    text: message,
  });

  // Fetch last messages for context
  const { data: history } = await supabase
    .from("messages")
    .select("sender, text")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true })
    .limit(6);

  // Generate AI reply
  const aiReply = await generateReply(history || [], message);

  // Save AI reply
  await supabase.from("messages").insert({
    conversation_id: conversationId,
    sender: "ai",
    text: aiReply,
  });

  return { conversationId, aiReply };
};

export const getChatHistoryByConversationId = async (
  conversationId: string
): Promise<ChatHistoryMessage[]> => {
  const { data, error } = await supabase
    .from("messages")
    .select("id, sender, text, created_at")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error("Failed to fetch chat history");
  }

  return data.map((msg) => ({
    id: msg.id,
    sender: msg.sender,
    text: msg.text,
    createdAt: msg.created_at,
  }));
};
