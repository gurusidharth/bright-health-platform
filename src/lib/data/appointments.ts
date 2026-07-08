export type AppointmentMode = "In-person" | "Video" | "Home Visit";
export type AppointmentStatus = "Upcoming" | "Completed" | "Cancelled";

export type Appointment = {
  id: string;
  patientId: string;
  careWorkerId: string;
  date: string;
  time: string;
  type: string;
  mode: AppointmentMode;
  room: string;
  status: AppointmentStatus;
  notes: string;
  aiReminder: string;
};

export const appointments: Appointment[] = [
  { id: "apt1", patientId: "p1", careWorkerId: "cw1", date: "2026-07-08", time: "09:00", type: "Medication Review", mode: "In-person", room: "Clinic 2", status: "Completed", notes: "Reviewed metformin dosage.", aiReminder: "Check HbA1c results before appointment." },
  { id: "apt2", patientId: "p2", careWorkerId: "cw2", date: "2026-07-08", time: "10:30", type: "Consultant Review", mode: "In-person", room: "ICU-2 Bay 4", status: "Upcoming", notes: "", aiReminder: "Oxygen saturation trending down — flag to consultant." },
  { id: "apt3", patientId: "p3", careWorkerId: "cw3", date: "2026-07-08", time: "11:15", type: "Physiotherapy", mode: "In-person", room: "Physio Suite", status: "Upcoming", notes: "", aiReminder: "Bring mobility assessment form." },
  { id: "apt4", patientId: "p9", careWorkerId: "cw1", date: "2026-07-08", time: "13:00", type: "Follow-up", mode: "Video", room: "—", status: "Upcoming", notes: "", aiReminder: "Discuss fatigue management with oncology notes." },
  { id: "apt5", patientId: "p7", careWorkerId: "cw7", date: "2026-07-08", time: "14:00", type: "Antenatal Check", mode: "In-person", room: "MAT Room 1", status: "Upcoming", notes: "", aiReminder: "28-week growth scan due." },
  { id: "apt6", patientId: "p12", careWorkerId: "cw8", date: "2026-07-08", time: "15:30", type: "Diabetes Review", mode: "Video", room: "—", status: "Upcoming", notes: "", aiReminder: "CGM shows nocturnal hypoglycaemia — review insulin dose." },
  { id: "apt7", patientId: "p5", careWorkerId: "cw5", date: "2026-07-08", time: "16:00", type: "Home Visit", mode: "Home Visit", room: "31 Elm Street", status: "Upcoming", notes: "", aiReminder: "Cognitive assessment follow-up." },
  { id: "apt8", patientId: "p8", careWorkerId: "cw2", date: "2026-07-08", time: "17:00", type: "Fall Risk Assessment", mode: "In-person", room: "Res-2 Room 6", status: "Upcoming", notes: "", aiReminder: "Mobility aid review overdue." },
  { id: "apt9", patientId: "p10", careWorkerId: "cw3", date: "2026-07-09", time: "09:30", type: "Physiotherapy", mode: "In-person", room: "Physio Suite", status: "Upcoming", notes: "", aiReminder: "" },
  { id: "apt10", patientId: "p13", careWorkerId: "cw2", date: "2026-07-09", time: "10:00", type: "Respiratory Review", mode: "In-person", room: "ICU-2 Bay 1", status: "Upcoming", notes: "", aiReminder: "Peak flow trend improving, confirm step-down plan." },
  { id: "apt11", patientId: "p14", careWorkerId: "cw4", date: "2026-07-09", time: "08:00", type: "Cardiology Review", mode: "In-person", room: "Clinic 1", status: "Upcoming", notes: "", aiReminder: "Urgent — ST changes on ECG since admission." },
  { id: "apt12", patientId: "p6", careWorkerId: "cw4", date: "2026-07-07", time: "11:00", type: "Anticoagulation Check", mode: "In-person", room: "Clinic 2", status: "Completed", notes: "INR within range.", aiReminder: "" },
  { id: "apt13", patientId: "p4", careWorkerId: "cw1", date: "2026-07-06", time: "14:30", type: "Diabetes Review", mode: "Video", room: "—", status: "Completed", notes: "HbA1c improved to 6.8%.", aiReminder: "" },
  { id: "apt14", patientId: "p16", careWorkerId: "cw6", date: "2026-07-05", time: "09:00", type: "Swallowing Assessment", mode: "In-person", room: "Res-2 Room 3", status: "Cancelled", notes: "Patient unwell, rescheduled.", aiReminder: "" },
  { id: "apt15", patientId: "p17", careWorkerId: "cw9", date: "2026-07-10", time: "13:30", type: "Neurology Follow-up", mode: "Video", room: "—", status: "Upcoming", notes: "", aiReminder: "" },
  { id: "apt16", patientId: "p18", careWorkerId: "cw10", date: "2026-07-10", time: "10:00", type: "Physiotherapy", mode: "In-person", room: "Physio Suite", status: "Upcoming", notes: "", aiReminder: "" },
];

export function getAppointmentsForPatient(patientId: string) {
  return appointments.filter((a) => a.patientId === patientId);
}

export const appointmentStats = {
  today: appointments.filter((a) => a.date === "2026-07-08").length,
  upcoming: appointments.filter((a) => a.status === "Upcoming").length,
  completed: appointments.filter((a) => a.status === "Completed").length,
  cancelled: appointments.filter((a) => a.status === "Cancelled").length,
};
