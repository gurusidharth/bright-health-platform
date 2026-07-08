import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { conversations as seedConversations, type Conversation, type ChatMessage } from "@/lib/data/messages";

type ChatState = {
  conversations: Conversation[];
  activeConversationId: string | null;
};

const initialState: ChatState = {
  conversations: seedConversations,
  activeConversationId: seedConversations[0]?.id ?? null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveConversation(state, action: PayloadAction<string>) {
      state.activeConversationId = action.payload;
      const convo = state.conversations.find((c) => c.id === action.payload);
      if (convo) convo.unreadCount = 0;
    },
    sendMessage(state, action: PayloadAction<{ conversationId: string; message: ChatMessage }>) {
      const convo = state.conversations.find((c) => c.id === action.payload.conversationId);
      if (convo) {
        convo.messages.push(action.payload.message);
        convo.lastMessage = action.payload.message.text;
        convo.lastMessageAt = action.payload.message.timestamp;
      }
    },
  },
});

export const { setActiveConversation, sendMessage } = chatSlice.actions;
export default chatSlice.reducer;
