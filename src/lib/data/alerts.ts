export type AlertPriority = "Critical" | "High" | "Medium";
export type AlertStatus = "Active" | "Acknowledged" | "Resolved";

export type EmergencyAlert = {
  id: string;
  patientId: string;
  type: "Fall" | "Medication Missed" | "Vital Sign Deterioration" | "Emergency Call";
  priority: AlertPriority;
  status: AlertStatus;
  timestamp: string;
  ward: string;
  assignedTo: string;
  description: string;
  timeline: { time: string; event: string }[];
};

export const alertPriorityColor: Record<AlertPriority, string> = {
  Critical: "bg-destructive/10 text-destructive border-destructive/30",
  High: "bg-amber-500/10 text-amber-600 border-amber-500/30",
  Medium: "bg-primary/10 text-primary border-primary/30",
};

export const alerts: EmergencyAlert[] = [
  { id: "al1", patientId: "p2", type: "Vital Sign Deterioration", priority: "Critical", status: "Active", timestamp: "12m ago", ward: "ICU-2", assignedTo: "cw2",
    description: "Oxygen saturation dropped to 89% over the last hour, downward trend.",
    timeline: [{ time: "07:40", event: "SpO2 recorded at 92%" }, { time: "07:55", event: "SpO2 recorded at 89%, alert triggered" }, { time: "08:00", event: "Nurse James Anderson notified" }] },
  { id: "al2", patientId: "p14", type: "Vital Sign Deterioration", priority: "Critical", status: "Active", timestamp: "15m ago", ward: "3A", assignedTo: "cw4",
    description: "ST changes on continuous ECG monitor with chest discomfort reported.",
    timeline: [{ time: "06:40", event: "Patient reports chest discomfort" }, { time: "06:45", event: "ECG shows ST depression" }, { time: "06:50", event: "Cardiology paged" }] },
  { id: "al3", patientId: "p8", type: "Fall", priority: "High", status: "Acknowledged", timestamp: "3h ago", ward: "Res-2", assignedTo: "cw2",
    description: "Patient found on floor near bedside, assisted back to bed, no visible injury beyond bruising.",
    timeline: [{ time: "05:10", event: "Fall detected via sensor" }, { time: "05:12", event: "Staff attended" }, { time: "05:30", event: "Assessment completed, no fracture" }] },
  { id: "al4", patientId: "p8", type: "Medication Missed", priority: "Medium", status: "Resolved", timestamp: "1d ago", ward: "Res-2", assignedTo: "cw2",
    description: "Co-codamol dose missed during shift changeover.",
    timeline: [{ time: "14:00", event: "Missed dose flagged" }, { time: "14:20", event: "Dose administered late" }] },
  { id: "al5", patientId: "p13", type: "Vital Sign Deterioration", priority: "High", status: "Acknowledged", timestamp: "50m ago", ward: "ICU-2", assignedTo: "cw2",
    description: "Oxygen saturation at 93% during asthma exacerbation, responding to nebuliser.",
    timeline: [{ time: "08:00", event: "SpO2 at 93%, nebuliser given" }, { time: "08:20", event: "SpO2 improving to 95%" }] },
  { id: "al6", patientId: "p5", type: "Emergency Call", priority: "Medium", status: "Resolved", timestamp: "6h ago", ward: "Res-1", assignedTo: "cw5",
    description: "Patient pressed call bell reporting confusion about time of day.",
    timeline: [{ time: "03:00", event: "Call bell activated" }, { time: "03:05", event: "Staff reassured patient, settled" }] },
];

export function getAlertsForPatient(patientId: string) {
  return alerts.filter((a) => a.patientId === patientId);
}

export const alertStats = {
  active: alerts.filter((a) => a.status === "Active").length,
  critical: alerts.filter((a) => a.priority === "Critical").length,
  resolvedToday: alerts.filter((a) => a.status === "Resolved").length,
};
