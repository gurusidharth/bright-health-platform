export type RiskLevel = "Low" | "Moderate" | "High";
export type PatientStatus = "Active" | "Monitoring" | "Discharged";

export type Vitals = {
  bloodPressure: string;
  heartRate: number;
  temperature: number;
  oxygenSaturation: number;
  recordedAt: string;
};

export type Patient = {
  id: string;
  name: string;
  age: number;
  gender: "Female" | "Male" | "Non-binary";
  mrn: string;
  conditions: string[];
  risk: RiskLevel;
  status: PatientStatus;
  ward: string;
  lastUpdate: string;
  phone: string;
  email: string;
  address: string;
  emergencyContact: { name: string; relation: string; phone: string };
  assignedCareWorkerId: string;
  vitals: Vitals;
  medicationIds: string[];
  carePlanId: string;
  admissionDate: string;
  aiSummary: string;
  notes: { author: string; date: string; text: string }[];
};

export const riskColor: Record<RiskLevel, string> = {
  High: "bg-destructive/10 text-destructive border-destructive/30",
  Moderate: "bg-amber-500/10 text-amber-600 border-amber-500/30",
  Low: "bg-primary/10 text-primary border-primary/30",
};

export const patients: Patient[] = [
  {
    id: "p1", name: "Margaret O'Neill", age: 82, gender: "Female", mrn: "MRN-10241",
    conditions: ["Type 2 Diabetes", "Hypertension"], risk: "Moderate", status: "Active", ward: "3B",
    lastUpdate: "2h ago", phone: "+44 7700 900101", email: "margaret.oneill@example.com",
    address: "14 Willow Court, Riverside", emergencyContact: { name: "Patrick O'Neill", relation: "Son", phone: "+44 7700 900301" },
    assignedCareWorkerId: "cw1", vitals: { bloodPressure: "138/86", heartRate: 78, temperature: 36.9, oxygenSaturation: 96, recordedAt: "2h ago" },
    medicationIds: ["m1", "m2"], carePlanId: "cp1", admissionDate: "2026-05-02",
    aiSummary: "Stable glycaemic control this week; blood pressure trending slightly high — recommend medication review at next visit.",
    notes: [{ author: "Sarah Taylor", date: "2026-07-06", text: "Reports occasional dizziness in the morning, monitoring BP twice daily." }],
  },
  {
    id: "p2", name: "James Whitaker", age: 74, gender: "Male", mrn: "MRN-10289",
    conditions: ["COPD", "Congestive Heart Failure"], risk: "High", status: "Active", ward: "ICU-2",
    lastUpdate: "12m ago", phone: "+44 7700 900102", email: "james.whitaker@example.com",
    address: "8 Cedar Lane, Riverside", emergencyContact: { name: "Linda Whitaker", relation: "Wife", phone: "+44 7700 900302" },
    assignedCareWorkerId: "cw2", vitals: { bloodPressure: "152/94", heartRate: 102, temperature: 37.4, oxygenSaturation: 89, recordedAt: "12m ago" },
    medicationIds: ["m3", "m4"], carePlanId: "cp2", admissionDate: "2026-06-18",
    aiSummary: "Oxygen saturation trending downward over 48h — flagged for consultant review. High readmission risk (72%).",
    notes: [{ author: "James Anderson", date: "2026-07-08", text: "Increased breathlessness overnight, on 2L nasal oxygen." }],
  },
  {
    id: "p3", name: "Priya Sharma", age: 39, gender: "Female", mrn: "MRN-10312",
    conditions: ["Post-operative recovery"], risk: "Low", status: "Monitoring", ward: "Day",
    lastUpdate: "1d ago", phone: "+44 7700 900103", email: "priya.sharma@example.com",
    address: "22 Oakfield Road, Riverside", emergencyContact: { name: "Raj Sharma", relation: "Husband", phone: "+44 7700 900303" },
    assignedCareWorkerId: "cw3", vitals: { bloodPressure: "118/76", heartRate: 68, temperature: 36.6, oxygenSaturation: 99, recordedAt: "1d ago" },
    medicationIds: ["m5"], carePlanId: "cp3", admissionDate: "2026-07-01",
    aiSummary: "Recovery on track, wound healing well. No signs of infection at follow-up.",
    notes: [{ author: "Emily Clark", date: "2026-07-07", text: "Mobilising independently, physio plan progressing ahead of schedule." }],
  },
  {
    id: "p4", name: "Ethan Walsh", age: 56, gender: "Male", mrn: "MRN-10355",
    conditions: ["Type 2 Diabetes"], risk: "Low", status: "Active", ward: "OP",
    lastUpdate: "3h ago", phone: "+44 7700 900104", email: "ethan.walsh@example.com",
    address: "5 Birchwood Ave, Riverside", emergencyContact: { name: "Claire Walsh", relation: "Wife", phone: "+44 7700 900304" },
    assignedCareWorkerId: "cw1", vitals: { bloodPressure: "124/80", heartRate: 72, temperature: 36.7, oxygenSaturation: 98, recordedAt: "3h ago" },
    medicationIds: ["m6"], carePlanId: "cp4", admissionDate: "2026-04-11",
    aiSummary: "HbA1c improved to 6.8% since last quarter. Diet plan adherence strong.",
    notes: [],
  },
  {
    id: "p5", name: "Sofia Reyes", age: 68, gender: "Female", mrn: "MRN-10367",
    conditions: ["Dementia", "Osteoarthritis"], risk: "Moderate", status: "Active", ward: "Res-1",
    lastUpdate: "45m ago", phone: "+44 7700 900105", email: "sofia.reyes@example.com",
    address: "31 Elm Street, Riverside", emergencyContact: { name: "Maria Reyes", relation: "Daughter", phone: "+44 7700 900305" },
    assignedCareWorkerId: "cw5", vitals: { bloodPressure: "130/82", heartRate: 74, temperature: 36.8, oxygenSaturation: 97, recordedAt: "45m ago" },
    medicationIds: ["m7"], carePlanId: "cp5", admissionDate: "2026-03-20",
    aiSummary: "Mild cognitive decline noted since last assessment — recommend memory clinic referral.",
    notes: [{ author: "Olivia Bennett", date: "2026-07-08", text: "Confused about time of day this morning, otherwise settled." }],
  },
  {
    id: "p6", name: "George Adeyemi", age: 71, gender: "Male", mrn: "MRN-10402",
    conditions: ["Atrial Fibrillation"], risk: "Moderate", status: "Active", ward: "3A",
    lastUpdate: "5h ago", phone: "+44 7700 900106", email: "george.adeyemi@example.com",
    address: "17 Maple Grove, Riverside", emergencyContact: { name: "Funmi Adeyemi", relation: "Wife", phone: "+44 7700 900306" },
    assignedCareWorkerId: "cw4", vitals: { bloodPressure: "142/88", heartRate: 96, temperature: 36.9, oxygenSaturation: 95, recordedAt: "5h ago" },
    medicationIds: ["m8"], carePlanId: "cp6", admissionDate: "2026-06-02",
    aiSummary: "Irregular rhythm persists on monitor; anticoagulation therapy on track.",
    notes: [],
  },
  {
    id: "p7", name: "Aisha Rahman", age: 34, gender: "Female", mrn: "MRN-10418",
    conditions: ["Antenatal care — 28 weeks"], risk: "Low", status: "Monitoring", ward: "MAT",
    lastUpdate: "New", phone: "+44 7700 900107", email: "aisha.rahman@example.com",
    address: "9 Poplar Close, Riverside", emergencyContact: { name: "Imran Rahman", relation: "Husband", phone: "+44 7700 900307" },
    assignedCareWorkerId: "cw7", vitals: { bloodPressure: "112/72", heartRate: 82, temperature: 36.6, oxygenSaturation: 99, recordedAt: "1h ago" },
    medicationIds: ["m9"], carePlanId: "cp7", admissionDate: "2026-07-08",
    aiSummary: "Routine antenatal check, all measurements within normal range for gestational age.",
    notes: [],
  },
  {
    id: "p8", name: "Henry Okafor", age: 89, gender: "Male", mrn: "MRN-10433",
    conditions: ["Frailty", "Recent fall"], risk: "High", status: "Active", ward: "Res-2",
    lastUpdate: "20m ago", phone: "+44 7700 900108", email: "henry.okafor@example.com",
    address: "3 Chestnut Way, Riverside", emergencyContact: { name: "Grace Okafor", relation: "Daughter", phone: "+44 7700 900308" },
    assignedCareWorkerId: "cw2", vitals: { bloodPressure: "146/90", heartRate: 88, temperature: 37.1, oxygenSaturation: 94, recordedAt: "20m ago" },
    medicationIds: ["m10", "m11"], carePlanId: "cp8", admissionDate: "2026-07-03",
    aiSummary: "Fall risk score elevated (High) — recommend hourly checks and mobility aid review.",
    notes: [{ author: "James Anderson", date: "2026-07-08", text: "Assisted mobility only, hip bruising from Tuesday's fall improving." }],
  },
  {
    id: "p9", name: "Emma Wilson", age: 61, gender: "Female", mrn: "MRN-10456",
    conditions: ["Breast cancer — post-chemotherapy"], risk: "Moderate", status: "Monitoring", ward: "3B",
    lastUpdate: "30m ago", phone: "+44 7700 900109", email: "emma.wilson@example.com",
    address: "27 Sycamore Drive, Riverside", emergencyContact: { name: "David Wilson", relation: "Husband", phone: "+44 7700 900309" },
    assignedCareWorkerId: "cw1", vitals: { bloodPressure: "120/78", heartRate: 84, temperature: 37.0, oxygenSaturation: 97, recordedAt: "30m ago" },
    medicationIds: ["m12"], carePlanId: "cp9", admissionDate: "2026-06-25",
    aiSummary: "Tolerating final chemotherapy cycle well. Fatigue reported, bloods within acceptable range.",
    notes: [],
  },
  {
    id: "p10", name: "John Smith", age: 58, gender: "Male", mrn: "MRN-10467",
    conditions: ["Hip replacement recovery"], risk: "Low", status: "Monitoring", ward: "Day",
    lastUpdate: "4h ago", phone: "+44 7700 900110", email: "john.smith@example.com",
    address: "41 Aspen Court, Riverside", emergencyContact: { name: "Karen Smith", relation: "Wife", phone: "+44 7700 900310" },
    assignedCareWorkerId: "cw3", vitals: { bloodPressure: "128/82", heartRate: 70, temperature: 36.7, oxygenSaturation: 98, recordedAt: "4h ago" },
    medicationIds: ["m13"], carePlanId: "cp10", admissionDate: "2026-06-29",
    aiSummary: "Six weeks post-op, gait improving. On track for physio graduation next visit.",
    notes: [],
  },
  {
    id: "p11", name: "Sophia Brown", age: 76, gender: "Female", mrn: "MRN-10478",
    conditions: ["Chronic Kidney Disease Stage 3"], risk: "Moderate", status: "Active", ward: "Res-1",
    lastUpdate: "1h ago", phone: "+44 7700 900111", email: "sophia.brown@example.com",
    address: "6 Rowan Terrace, Riverside", emergencyContact: { name: "Peter Brown", relation: "Son", phone: "+44 7700 900311" },
    assignedCareWorkerId: "cw5", vitals: { bloodPressure: "136/84", heartRate: 76, temperature: 36.8, oxygenSaturation: 96, recordedAt: "1h ago" },
    medicationIds: ["m14"], carePlanId: "cp11", admissionDate: "2026-05-15",
    aiSummary: "eGFR stable at 42. Fluid balance within target, renal diet adherence good.",
    notes: [],
  },
  {
    id: "p12", name: "Michael Johnson", age: 47, gender: "Male", mrn: "MRN-10489",
    conditions: ["Type 1 Diabetes"], risk: "Moderate", status: "Active", ward: "OP",
    lastUpdate: "6h ago", phone: "+44 7700 900112", email: "michael.johnson@example.com",
    address: "19 Hazel Way, Riverside", emergencyContact: { name: "Rachel Johnson", relation: "Wife", phone: "+44 7700 900312" },
    assignedCareWorkerId: "cw8", vitals: { bloodPressure: "126/80", heartRate: 74, temperature: 36.6, oxygenSaturation: 98, recordedAt: "6h ago" },
    medicationIds: ["m15"], carePlanId: "cp12", admissionDate: "2026-04-28",
    aiSummary: "Continuous glucose monitor shows two nocturnal hypoglycaemic events this week — insulin dose review recommended.",
    notes: [],
  },
  {
    id: "p13", name: "Olivia Davis", age: 29, gender: "Female", mrn: "MRN-10501",
    conditions: ["Asthma — moderate exacerbation"], risk: "Moderate", status: "Active", ward: "ICU-2",
    lastUpdate: "50m ago", phone: "+44 7700 900113", email: "olivia.davis@example.com",
    address: "12 Juniper Lane, Riverside", emergencyContact: { name: "Mark Davis", relation: "Partner", phone: "+44 7700 900313" },
    assignedCareWorkerId: "cw2", vitals: { bloodPressure: "118/74", heartRate: 92, temperature: 37.2, oxygenSaturation: 93, recordedAt: "50m ago" },
    medicationIds: ["m16"], carePlanId: "cp13", admissionDate: "2026-07-06",
    aiSummary: "Responding well to nebulised bronchodilators, peak flow improving steadily.",
    notes: [],
  },
  {
    id: "p14", name: "Robert Clarke", age: 80, gender: "Male", mrn: "MRN-10512",
    conditions: ["Ischaemic Heart Disease"], risk: "High", status: "Active", ward: "3A",
    lastUpdate: "15m ago", phone: "+44 7700 900114", email: "robert.clarke@example.com",
    address: "24 Beech Road, Riverside", emergencyContact: { name: "Susan Clarke", relation: "Wife", phone: "+44 7700 900314" },
    assignedCareWorkerId: "cw4", vitals: { bloodPressure: "150/92", heartRate: 104, temperature: 37.0, oxygenSaturation: 92, recordedAt: "15m ago" },
    medicationIds: ["m17"], carePlanId: "cp14", admissionDate: "2026-07-04",
    aiSummary: "ECG shows ST changes since admission — cardiology review requested urgently.",
    notes: [{ author: "Michael Reed", date: "2026-07-08", text: "Chest discomfort reported at 06:40, troponin repeat pending." }],
  },
  {
    id: "p15", name: "Isabella Moore", age: 44, gender: "Female", mrn: "MRN-10523",
    conditions: ["Anxiety", "Migraine"], risk: "Low", status: "Active", ward: "OP",
    lastUpdate: "8h ago", phone: "+44 7700 900115", email: "isabella.moore@example.com",
    address: "2 Willow Court, Riverside", emergencyContact: { name: "Anna Moore", relation: "Sister", phone: "+44 7700 900315" },
    assignedCareWorkerId: "cw8", vitals: { bloodPressure: "116/74", heartRate: 70, temperature: 36.6, oxygenSaturation: 99, recordedAt: "8h ago" },
    medicationIds: ["m18"], carePlanId: "cp15", admissionDate: "2026-05-30",
    aiSummary: "Migraine frequency reduced from 8 to 3 per month since preventative therapy started.",
    notes: [],
  },
  {
    id: "p16", name: "William Turner", age: 92, gender: "Male", mrn: "MRN-10534",
    conditions: ["Parkinson's Disease", "Frailty"], risk: "High", status: "Active", ward: "Res-2",
    lastUpdate: "35m ago", phone: "+44 7700 900116", email: "william.turner@example.com",
    address: "8 Ashgrove, Riverside", emergencyContact: { name: "Helen Turner", relation: "Daughter", phone: "+44 7700 900316" },
    assignedCareWorkerId: "cw6", vitals: { bloodPressure: "134/86", heartRate: 80, temperature: 36.9, oxygenSaturation: 95, recordedAt: "35m ago" },
    medicationIds: ["m19"], carePlanId: "cp16", admissionDate: "2026-06-10",
    aiSummary: "Tremor control stable on current levodopa dose. Swallowing assessment due this week.",
    notes: [],
  },
  {
    id: "p17", name: "Charlotte Evans", age: 52, gender: "Female", mrn: "MRN-10545",
    conditions: ["Multiple Sclerosis"], risk: "Moderate", status: "Monitoring", ward: "Res-1",
    lastUpdate: "2h ago", phone: "+44 7700 900117", email: "charlotte.evans@example.com",
    address: "15 Fernbank, Riverside", emergencyContact: { name: "Tom Evans", relation: "Husband", phone: "+44 7700 900317" },
    assignedCareWorkerId: "cw9", vitals: { bloodPressure: "122/78", heartRate: 72, temperature: 36.7, oxygenSaturation: 98, recordedAt: "2h ago" },
    medicationIds: ["m20"], carePlanId: "cp17", admissionDate: "2026-05-22",
    aiSummary: "No new relapse activity. Fatigue management plan showing good adherence.",
    notes: [],
  },
  {
    id: "p18", name: "Benjamin Hughes", age: 65, gender: "Male", mrn: "MRN-10556",
    conditions: ["Knee replacement recovery"], risk: "Low", status: "Monitoring", ward: "Day",
    lastUpdate: "3h ago", phone: "+44 7700 900118", email: "benjamin.hughes@example.com",
    address: "33 Larchwood, Riverside", emergencyContact: { name: "Diane Hughes", relation: "Wife", phone: "+44 7700 900318" },
    assignedCareWorkerId: "cw10", vitals: { bloodPressure: "130/80", heartRate: 74, temperature: 36.7, oxygenSaturation: 98, recordedAt: "3h ago" },
    medicationIds: ["m21"], carePlanId: "cp18", admissionDate: "2026-06-15",
    aiSummary: "Range of motion at 110 degrees, ahead of typical recovery curve for week four.",
    notes: [],
  },
];

export function getPatientById(id: string) {
  return patients.find((p) => p.id === id);
}

export const patientStats = {
  total: patients.length,
  active: patients.filter((p) => p.status === "Active").length,
  monitoring: patients.filter((p) => p.status === "Monitoring").length,
  highRisk: patients.filter((p) => p.risk === "High").length,
};
