export type NotificationCategory = "Appointment" | "Medication" | "Emergency" | "AI Alert";

export type Notification = {
  id: string;
  category: NotificationCategory;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
};

export const notifications: Notification[] = [
  { id: "n1", category: "Emergency", title: "Critical: James Whitaker", message: "Oxygen saturation dropped to 89% — review required.", timestamp: "12m ago", read: false },
  { id: "n2", category: "Emergency", title: "Critical: Robert Clarke", message: "ST changes on ECG monitor — cardiology paged.", timestamp: "15m ago", read: false },
  { id: "n3", category: "AI Alert", title: "AI Risk Prediction Updated", message: "3 patients flagged for elevated 30-day readmission risk.", timestamp: "40m ago", read: false },
  { id: "n4", category: "Medication", title: "Medication Due", message: "9 patients have medication due within the hour.", timestamp: "1h ago", read: true },
  { id: "n5", category: "Appointment", title: "Upcoming Appointment", message: "Aisha Rahman — Antenatal check at 14:00.", timestamp: "2h ago", read: true },
  { id: "n6", category: "Medication", title: "Refill Needed", message: "William Turner's Co-careldopa has 6 doses remaining.", timestamp: "3h ago", read: true },
  { id: "n7", category: "Appointment", title: "Appointment Cancelled", message: "William Turner's swallowing assessment was cancelled.", timestamp: "1d ago", read: true },
  { id: "n8", category: "AI Alert", title: "Care Plan Generated", message: "AI drafted a new care plan for Emma Wilson — pending review.", timestamp: "1d ago", read: true },
];

export const notificationStats = {
  unread: notifications.filter((n) => !n.read).length,
};
