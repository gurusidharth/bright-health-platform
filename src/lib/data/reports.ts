export type MedicalReport = {
  id: string;
  patientId: string;
  title: string;
  type: "Discharge Summary" | "Lab Result" | "Imaging" | "Specialist Letter";
  uploadDate: string;
  uploadedBy: string;
  aiSummary: string;
  importantFindings: string[];
  recommendations: string[];
};

export const reports: MedicalReport[] = [
  { id: "r1", patientId: "p2", title: "Chest X-Ray — Admission", type: "Imaging", uploadDate: "2026-06-18", uploadedBy: "Dr. Amelia Hart",
    aiSummary: "Mild bilateral basal atelectasis consistent with COPD exacerbation. No consolidation or effusion identified.",
    importantFindings: ["Bilateral basal atelectasis", "No pneumothorax"], recommendations: ["Continue bronchodilator therapy", "Repeat imaging if no clinical improvement in 48h"] },
  { id: "r2", patientId: "p14", title: "ECG & Troponin Panel", type: "Lab Result", uploadDate: "2026-07-08", uploadedBy: "Michael Reed",
    aiSummary: "ST depression in leads V4-V6 with mildly elevated troponin. Findings consistent with NSTEMI — urgent cardiology input required.",
    importantFindings: ["ST depression V4-V6", "Troponin 0.08 ng/mL (elevated)"], recommendations: ["Urgent cardiology referral", "Repeat troponin in 3 hours"] },
  { id: "r3", patientId: "p9", title: "Oncology Discharge Summary", type: "Discharge Summary", uploadDate: "2026-06-24", uploadedBy: "Dr. Amelia Hart",
    aiSummary: "Completed cycle 5 of 6 chemotherapy. Tolerated well with grade 1 fatigue. Bloods within acceptable range for continuation.",
    importantFindings: ["Neutrophils within safe range", "Grade 1 fatigue reported"], recommendations: ["Proceed with final cycle as planned", "Monitor for delayed nausea"] },
  { id: "r4", patientId: "p11", title: "Renal Function Panel", type: "Lab Result", uploadDate: "2026-07-05", uploadedBy: "Dr. Amelia Hart",
    aiSummary: "eGFR stable at 42 mL/min, consistent with CKD stage 3. Potassium and phosphate within target range on current diet.",
    importantFindings: ["eGFR 42 mL/min", "Potassium 4.6 mmol/L"], recommendations: ["Continue current renal diet", "Recheck bloods in 4 weeks"] },
  { id: "r5", patientId: "p8", title: "Fall Assessment Letter", type: "Specialist Letter", uploadDate: "2026-07-04", uploadedBy: "Dr. Amelia Hart",
    aiSummary: "Comprehensive falls assessment following Tuesday's incident. Bruising to right hip, no fracture on imaging. Elevated fall risk score.",
    importantFindings: ["No fracture identified", "Fall risk score: High"], recommendations: ["Hourly safety checks", "Physiotherapy mobility review"] },
  { id: "r6", patientId: "p7", title: "28-Week Growth Scan", type: "Imaging", uploadDate: "2026-07-06", uploadedBy: "Grace Mitchell",
    aiSummary: "Fetal growth tracking on 55th centile, consistent with gestational age. Normal amniotic fluid volume and placental position.",
    importantFindings: ["Growth on 55th centile", "Normal fluid volume"], recommendations: ["Routine follow-up at 32 weeks"] },
  { id: "r7", patientId: "p13", title: "Respiratory Function Test", type: "Lab Result", uploadDate: "2026-07-07", uploadedBy: "Dr. Amelia Hart",
    aiSummary: "Peak flow improved to 78% of predicted, up from 52% on admission. Responding well to current bronchodilator regimen.",
    importantFindings: ["Peak flow 78% predicted"], recommendations: ["Continue step-down plan toward home therapy"] },
];

export function getReportsForPatient(patientId: string) {
  return reports.filter((r) => r.patientId === patientId);
}
