export type Medication = {
  id: string;
  patientId: string;
  name: string;
  dosage: string;
  frequency: string;
  route: "Oral" | "Injection" | "Inhaled" | "Topical";
  prescribedBy: string;
  startDate: string;
  refillDate: string;
  remainingDoses: number;
  history: { date: string; status: "Taken" | "Missed" | "PRN" }[];
};

export const medications: Medication[] = [
  { id: "m1", patientId: "p1", name: "Metformin", dosage: "500mg", frequency: "Twice daily", route: "Oral", prescribedBy: "Dr. Amelia Hart", startDate: "2025-11-01", refillDate: "2026-07-15", remainingDoses: 14, history: [{ date: "2026-07-08", status: "Taken" }, { date: "2026-07-07", status: "Taken" }] },
  { id: "m2", patientId: "p1", name: "Lisinopril", dosage: "10mg", frequency: "Once daily", route: "Oral", prescribedBy: "Dr. Amelia Hart", startDate: "2025-11-01", refillDate: "2026-07-20", remainingDoses: 22, history: [{ date: "2026-07-08", status: "Taken" }] },
  { id: "m3", patientId: "p2", name: "Salbutamol", dosage: "100mcg", frequency: "As needed", route: "Inhaled", prescribedBy: "Dr. Amelia Hart", startDate: "2026-06-18", refillDate: "2026-07-25", remainingDoses: 60, history: [{ date: "2026-07-08", status: "PRN" }] },
  { id: "m4", patientId: "p2", name: "Furosemide", dosage: "40mg", frequency: "Once daily", route: "Oral", prescribedBy: "Dr. Amelia Hart", startDate: "2026-06-18", refillDate: "2026-07-18", remainingDoses: 10, history: [{ date: "2026-07-08", status: "Taken" }] },
  { id: "m5", patientId: "p3", name: "Paracetamol", dosage: "500mg", frequency: "As needed", route: "Oral", prescribedBy: "Dr. Amelia Hart", startDate: "2026-07-01", refillDate: "2026-07-14", remainingDoses: 18, history: [{ date: "2026-07-07", status: "PRN" }] },
  { id: "m6", patientId: "p4", name: "Metformin", dosage: "1000mg", frequency: "Twice daily", route: "Oral", prescribedBy: "Dr. Amelia Hart", startDate: "2025-08-12", refillDate: "2026-07-22", remainingDoses: 28, history: [{ date: "2026-07-08", status: "Taken" }] },
  { id: "m7", patientId: "p5", name: "Donepezil", dosage: "5mg", frequency: "Once daily", route: "Oral", prescribedBy: "Dr. Amelia Hart", startDate: "2026-03-20", refillDate: "2026-07-19", remainingDoses: 11, history: [{ date: "2026-07-08", status: "Taken" }] },
  { id: "m8", patientId: "p6", name: "Apixaban", dosage: "5mg", frequency: "Twice daily", route: "Oral", prescribedBy: "Dr. Amelia Hart", startDate: "2026-06-02", refillDate: "2026-07-16", remainingDoses: 16, history: [{ date: "2026-07-08", status: "Taken" }] },
  { id: "m9", patientId: "p7", name: "Folic Acid", dosage: "400mcg", frequency: "Once daily", route: "Oral", prescribedBy: "Grace Mitchell", startDate: "2026-01-10", refillDate: "2026-08-01", remainingDoses: 40, history: [{ date: "2026-07-08", status: "Taken" }] },
  { id: "m10", patientId: "p8", name: "Co-codamol", dosage: "30/500mg", frequency: "Four times daily", route: "Oral", prescribedBy: "Dr. Amelia Hart", startDate: "2026-07-03", refillDate: "2026-07-12", remainingDoses: 8, history: [{ date: "2026-07-08", status: "Taken" }, { date: "2026-07-07", status: "Missed" }] },
  { id: "m11", patientId: "p8", name: "Alendronic Acid", dosage: "70mg", frequency: "Weekly", route: "Oral", prescribedBy: "Dr. Amelia Hart", startDate: "2026-07-03", refillDate: "2026-08-03", remainingDoses: 3, history: [{ date: "2026-07-06", status: "Taken" }] },
  { id: "m12", patientId: "p9", name: "Ondansetron", dosage: "4mg", frequency: "As needed", route: "Oral", prescribedBy: "Dr. Amelia Hart", startDate: "2026-06-25", refillDate: "2026-07-17", remainingDoses: 12, history: [{ date: "2026-07-07", status: "PRN" }] },
  { id: "m13", patientId: "p10", name: "Naproxen", dosage: "250mg", frequency: "Twice daily", route: "Oral", prescribedBy: "Dr. Amelia Hart", startDate: "2026-06-29", refillDate: "2026-07-14", remainingDoses: 10, history: [{ date: "2026-07-08", status: "Taken" }] },
  { id: "m14", patientId: "p11", name: "Sevelamer", dosage: "800mg", frequency: "Three times daily", route: "Oral", prescribedBy: "Dr. Amelia Hart", startDate: "2026-05-15", refillDate: "2026-07-15", remainingDoses: 20, history: [{ date: "2026-07-08", status: "Taken" }] },
  { id: "m15", patientId: "p12", name: "Insulin Glargine", dosage: "22 units", frequency: "Once nightly", route: "Injection", prescribedBy: "Dr. Amelia Hart", startDate: "2025-09-08", refillDate: "2026-07-13", remainingDoses: 5, history: [{ date: "2026-07-08", status: "Taken" }] },
  { id: "m16", patientId: "p13", name: "Prednisolone", dosage: "30mg", frequency: "Once daily", route: "Oral", prescribedBy: "Dr. Amelia Hart", startDate: "2026-07-06", refillDate: "2026-07-13", remainingDoses: 5, history: [{ date: "2026-07-08", status: "Taken" }] },
  { id: "m17", patientId: "p14", name: "Aspirin", dosage: "75mg", frequency: "Once daily", route: "Oral", prescribedBy: "Michael Reed", startDate: "2026-07-04", refillDate: "2026-08-04", remainingDoses: 26, history: [{ date: "2026-07-08", status: "Taken" }] },
  { id: "m18", patientId: "p15", name: "Propranolol", dosage: "40mg", frequency: "Twice daily", route: "Oral", prescribedBy: "Dr. Amelia Hart", startDate: "2026-05-30", refillDate: "2026-07-20", remainingDoses: 24, history: [{ date: "2026-07-08", status: "Taken" }] },
  { id: "m19", patientId: "p16", name: "Co-careldopa", dosage: "25/100mg", frequency: "Four times daily", route: "Oral", prescribedBy: "Dr. Amelia Hart", startDate: "2026-06-10", refillDate: "2026-07-11", remainingDoses: 6, history: [{ date: "2026-07-08", status: "Taken" }] },
  { id: "m20", patientId: "p17", name: "Baclofen", dosage: "10mg", frequency: "Three times daily", route: "Oral", prescribedBy: "Dr. Amelia Hart", startDate: "2026-05-22", refillDate: "2026-07-18", remainingDoses: 15, history: [{ date: "2026-07-08", status: "Taken" }] },
  { id: "m21", patientId: "p18", name: "Naproxen", dosage: "500mg", frequency: "Twice daily", route: "Oral", prescribedBy: "Dr. Amelia Hart", startDate: "2026-06-15", refillDate: "2026-07-15", remainingDoses: 9, history: [{ date: "2026-07-08", status: "Taken" }] },
];

export function getMedicationsForPatient(patientId: string) {
  return medications.filter((m) => m.patientId === patientId);
}

export const medicationStats = {
  dueToday: 9,
  upcomingRefills: medications.filter((m) => m.remainingDoses <= 7).length,
  complianceRate: 94,
};
