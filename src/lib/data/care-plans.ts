export type CarePlan = {
  id: string;
  patientId: string;
  title: string;
  createdDate: string;
  completionPercentage: number;
  dailyTasks: { task: string; time: string; done: boolean }[];
  exercise: string;
  diet: string;
  aiRecommendations: string[];
};

export const carePlans: CarePlan[] = [
  { id: "cp1", patientId: "p1", title: "Type 2 Diabetes & Hypertension Management", createdDate: "2025-11-01", completionPercentage: 82,
    dailyTasks: [{ task: "Blood glucose check", time: "08:00", done: true }, { task: "Blood pressure check", time: "08:15", done: true }, { task: "Evening medication", time: "19:00", done: false }],
    exercise: "20-minute walk, twice daily", diet: "Low-sodium, carbohydrate-controlled diet",
    aiRecommendations: ["Consider reducing sodium intake further given BP trend", "Schedule HbA1c recheck in 4 weeks"] },
  { id: "cp2", patientId: "p2", title: "COPD & Heart Failure Management", createdDate: "2026-06-18", completionPercentage: 64,
    dailyTasks: [{ task: "Oxygen saturation monitoring", time: "Every 4h", done: true }, { task: "Fluid balance chart", time: "All day", done: true }, { task: "Nebuliser", time: "12:00", done: false }],
    exercise: "Seated breathing exercises, 3x daily", diet: "Fluid-restricted (1.5L/day)",
    aiRecommendations: ["Urgent: escalate declining SpO2 to consultant", "Consider chest X-ray if no improvement in 24h"] },
  { id: "cp3", patientId: "p3", title: "Post-Operative Recovery Plan", createdDate: "2026-07-01", completionPercentage: 91,
    dailyTasks: [{ task: "Wound dressing check", time: "09:00", done: true }, { task: "Mobility exercises", time: "11:00", done: true }, { task: "Pain assessment", time: "15:00", done: true }],
    exercise: "Graduated walking programme with physiotherapist", diet: "High-protein diet to support healing",
    aiRecommendations: ["On track for discharge within 3-5 days"] },
  { id: "cp4", patientId: "p4", title: "Type 2 Diabetes Management", createdDate: "2025-08-12", completionPercentage: 95,
    dailyTasks: [{ task: "Blood glucose check", time: "07:30", done: true }, { task: "Medication", time: "08:00", done: true }],
    exercise: "30-minute cycling, 4x weekly", diet: "Mediterranean-style, carbohydrate-controlled",
    aiRecommendations: ["Excellent adherence — consider reducing check-in frequency"] },
  { id: "cp5", patientId: "p5", title: "Dementia & Osteoarthritis Support Plan", createdDate: "2026-03-20", completionPercentage: 70,
    dailyTasks: [{ task: "Orientation check", time: "Morning", done: true }, { task: "Joint mobility exercises", time: "14:00", done: false }, { task: "Medication", time: "18:00", done: true }],
    exercise: "Gentle seated stretching, daily", diet: "Soft diet with nutritional supplements",
    aiRecommendations: ["Recommend memory clinic referral given cognitive decline"] },
  { id: "cp6", patientId: "p6", title: "Atrial Fibrillation Management", createdDate: "2026-06-02", completionPercentage: 78,
    dailyTasks: [{ task: "Pulse check", time: "09:00", done: true }, { task: "Anticoagulant", time: "20:00", done: false }],
    exercise: "Light walking as tolerated", diet: "Vitamin K consistent diet",
    aiRecommendations: ["INR stable — continue current warfarin-alternative regimen"] },
  { id: "cp7", patientId: "p7", title: "Antenatal Care Plan", createdDate: "2026-01-10", completionPercentage: 100,
    dailyTasks: [{ task: "Folic acid", time: "08:00", done: true }, { task: "Kick count monitoring", time: "Evening", done: true }],
    exercise: "Prenatal yoga, 2x weekly", diet: "Balanced antenatal nutrition plan",
    aiRecommendations: ["All measurements normal for 28 weeks gestation"] },
  { id: "cp8", patientId: "p8", title: "Frailty & Falls Prevention Plan", createdDate: "2026-07-03", completionPercentage: 55,
    dailyTasks: [{ task: "Hourly safety check", time: "All day", done: true }, { task: "Mobility aid use", time: "All day", done: false }, { task: "Pain relief", time: "12:00", done: true }],
    exercise: "Supervised transfers only", diet: "High-calorie, high-protein diet",
    aiRecommendations: ["High fall risk — recommend bed rail and hourly rounding continue"] },
  { id: "cp9", patientId: "p9", title: "Oncology Recovery Plan", createdDate: "2026-06-25", completionPercentage: 60,
    dailyTasks: [{ task: "Bloods check", time: "08:00", done: true }, { task: "Anti-nausea medication", time: "As needed", done: false }],
    exercise: "Light stretching as tolerated", diet: "Small frequent high-calorie meals",
    aiRecommendations: ["Monitor fatigue levels; consider occupational therapy referral"] },
  { id: "cp10", patientId: "p10", title: "Hip Replacement Recovery Plan", createdDate: "2026-06-29", completionPercentage: 88,
    dailyTasks: [{ task: "Physiotherapy exercises", time: "10:00", done: true }, { task: "Pain assessment", time: "16:00", done: true }],
    exercise: "Graduated weight-bearing programme", diet: "Standard balanced diet",
    aiRecommendations: ["Ahead of typical recovery curve — consider physio step-down"] },
  { id: "cp11", patientId: "p11", title: "Chronic Kidney Disease Management", createdDate: "2026-05-15", completionPercentage: 73,
    dailyTasks: [{ task: "Fluid intake log", time: "All day", done: true }, { task: "Medication", time: "08:00", done: true }],
    exercise: "Light walking, 15 minutes daily", diet: "Renal diet — potassium and phosphate restricted",
    aiRecommendations: ["eGFR stable — continue current management"] },
  { id: "cp12", patientId: "p12", title: "Type 1 Diabetes Management", createdDate: "2025-09-08", completionPercentage: 68,
    dailyTasks: [{ task: "CGM review", time: "Continuous", done: true }, { task: "Insulin dose", time: "20:00", done: false }],
    exercise: "Moderate exercise with glucose monitoring", diet: "Carbohydrate-counted diet",
    aiRecommendations: ["Review nocturnal basal insulin dose given hypoglycaemic events"] },
  { id: "cp13", patientId: "p13", title: "Asthma Exacerbation Management", createdDate: "2026-07-06", completionPercentage: 80,
    dailyTasks: [{ task: "Peak flow measurement", time: "08:00", done: true }, { task: "Nebuliser", time: "As needed", done: true }],
    exercise: "Rest with gradual return to activity", diet: "Standard diet",
    aiRecommendations: ["Peak flow improving — plan step-down to home therapy"] },
  { id: "cp14", patientId: "p14", title: "Ischaemic Heart Disease Management", createdDate: "2026-07-04", completionPercentage: 40,
    dailyTasks: [{ task: "ECG monitoring", time: "Continuous", done: true }, { task: "Antiplatelet therapy", time: "08:00", done: true }],
    exercise: "Bed rest pending cardiology review", diet: "Low-fat, low-sodium diet",
    aiRecommendations: ["Urgent cardiology review required for ST changes"] },
  { id: "cp15", patientId: "p15", title: "Anxiety & Migraine Management", createdDate: "2026-05-30", completionPercentage: 85,
    dailyTasks: [{ task: "Preventative medication", time: "08:00", done: true }, { task: "Mindfulness session", time: "18:00", done: true }],
    exercise: "Yoga, 3x weekly", diet: "Trigger-food elimination diet",
    aiRecommendations: ["Migraine frequency down 60% — continue current regimen"] },
  { id: "cp16", patientId: "p16", title: "Parkinson's Disease Care Plan", createdDate: "2026-06-10", completionPercentage: 76,
    dailyTasks: [{ task: "Levodopa dose", time: "Four times daily", done: true }, { task: "Swallowing assessment", time: "Weekly", done: false }],
    exercise: "Physiotherapy-guided balance exercises", diet: "Soft diet, protein redistribution",
    aiRecommendations: ["Swallowing assessment overdue — schedule this week"] },
  { id: "cp17", patientId: "p17", title: "Multiple Sclerosis Management Plan", createdDate: "2026-05-22", completionPercentage: 89,
    dailyTasks: [{ task: "Fatigue management routine", time: "Morning", done: true }, { task: "Medication", time: "08:00", done: true }],
    exercise: "Aquatic therapy, weekly", diet: "Anti-inflammatory diet",
    aiRecommendations: ["No relapse activity — continue current disease-modifying therapy"] },
  { id: "cp18", patientId: "p18", title: "Knee Replacement Recovery Plan", createdDate: "2026-06-15", completionPercentage: 92,
    dailyTasks: [{ task: "Range-of-motion exercises", time: "10:00", done: true }, { task: "Ice therapy", time: "14:00", done: true }],
    exercise: "Progressive strengthening programme", diet: "Standard balanced diet",
    aiRecommendations: ["Ahead of recovery curve — plan discharge physio referral"] },
];

export function getCarePlanForPatient(patientId: string) {
  return carePlans.find((c) => c.patientId === patientId);
}
