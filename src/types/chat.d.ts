export interface ChatHistoryMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  createdAt: string;
}
