import { Router } from "express";
import { sendMessage, getChatHistory } from "../controllers/chat.controller";

const chatRouter = Router();

chatRouter.post("/chat/message", sendMessage);

chatRouter.get("/chat/history/:conversationId", getChatHistory);

export default chatRouter;
