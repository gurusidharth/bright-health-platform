export type ChatMessage = {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  status: "sent" | "delivered" | "read";
};

export type Conversation = {
  id: string;
  name: string;
  avatarInitials: string;
  online: boolean;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  messages: ChatMessage[];
};

export const conversations: Conversation[] = [
  {
    id: "c1", name: "Sarah Taylor", avatarInitials: "ST", online: true, lastMessage: "Margaret's BP is back within range this morning.",
    lastMessageAt: "9:12 AM", unreadCount: 2,
    messages: [
      { id: "m1", senderId: "cw1", text: "Morning! Just did rounds on 3B.", timestamp: "9:05 AM", status: "read" },
      { id: "m2", senderId: "cw1", text: "Margaret's BP is back within range this morning.", timestamp: "9:12 AM", status: "delivered" },
      { id: "m3", senderId: "me", text: "Great, thanks for the update.", timestamp: "9:14 AM", status: "read" },
    ],
  },
  {
    id: "c2", name: "James Anderson", avatarInitials: "JA", online: true, lastMessage: "James Whitaker's sats are still dropping, can you review?",
    lastMessageAt: "8:58 AM", unreadCount: 1,
    messages: [
      { id: "m1", senderId: "cw2", text: "James Whitaker's sats are still dropping, can you review?", timestamp: "8:58 AM", status: "delivered" },
    ],
  },
  {
    id: "c3", name: "Emily Clark", avatarInitials: "EC", online: false, lastMessage: "Physio session with Priya went well today.",
    lastMessageAt: "Yesterday", unreadCount: 0,
    messages: [
      { id: "m1", senderId: "cw3", text: "Physio session with Priya went well today.", timestamp: "Yesterday", status: "read" },
      { id: "m2", senderId: "me", text: "Great, keep up the momentum.", timestamp: "Yesterday", status: "read" },
    ],
  },
  {
    id: "c4", name: "Care Team — 3B", avatarInitials: "3B", online: true, lastMessage: "Shift handover notes uploaded.",
    lastMessageAt: "Yesterday", unreadCount: 0,
    messages: [
      { id: "m1", senderId: "cw1", text: "Shift handover notes uploaded.", timestamp: "Yesterday", status: "read" },
    ],
  },
  {
    id: "c5", name: "Michael Reed", avatarInitials: "MR", online: false, lastMessage: "Robert Clarke's troponin repeat is due at 10am.",
    lastMessageAt: "2 days ago", unreadCount: 0,
    messages: [
      { id: "m1", senderId: "cw4", text: "Robert Clarke's troponin repeat is due at 10am.", timestamp: "2 days ago", status: "read" },
    ],
  },
];

export const aiConversationSeed = [
  { id: "ai1", role: "assistant" as const, text: "Good morning, Dr. Hart. You have 3 critical alerts and 8 appointments today. Would you like a summary?", timestamp: "8:00 AM" },
];
