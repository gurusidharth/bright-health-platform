export type CareWorker = {
  id: string;
  name: string;
  role: string;
  avatarInitials: string;
  availability: "Available" | "On Shift" | "Off Duty";
  experienceYears: number;
  skills: string[];
  shift: "Morning" | "Afternoon" | "Night";
  patientsAssigned: string[];
  rating: number;
  performance: number;
  phone: string;
  email: string;
  ward: string;
};

export const careWorkers: CareWorker[] = [
  {
    id: "cw1", name: "Sarah Taylor", role: "Registered Nurse", avatarInitials: "ST",
    availability: "On Shift", experienceYears: 9, skills: ["Wound Care", "IV Therapy", "Medication Management"],
    shift: "Morning", patientsAssigned: ["p1", "p4", "p9"], rating: 4.9, performance: 96,
    phone: "+44 7700 900201", email: "sarah.taylor@medixcare.ai", ward: "3B",
  },
  {
    id: "cw2", name: "James Anderson", role: "Senior Care Worker", avatarInitials: "JA",
    availability: "On Shift", experienceYears: 6, skills: ["Mobility Support", "Dementia Care", "First Aid"],
    shift: "Morning", patientsAssigned: ["p2", "p8", "p13"], rating: 4.7, performance: 91,
    phone: "+44 7700 900202", email: "james.anderson@medixcare.ai", ward: "ICU-2",
  },
  {
    id: "cw3", name: "Emily Clark", role: "Physiotherapist", avatarInitials: "EC",
    availability: "Available", experienceYears: 5, skills: ["Rehabilitation", "Post-op Recovery", "Exercise Planning"],
    shift: "Afternoon", patientsAssigned: ["p3", "p10"], rating: 4.8, performance: 94,
    phone: "+44 7700 900203", email: "emily.clark@medixcare.ai", ward: "Day",
  },
  {
    id: "cw4", name: "Michael Reed", role: "Registered Nurse", avatarInitials: "MR",
    availability: "On Shift", experienceYears: 12, skills: ["Cardiac Care", "Chronic Disease Management"],
    shift: "Morning", patientsAssigned: ["p6", "p14"], rating: 4.9, performance: 97,
    phone: "+44 7700 900204", email: "michael.reed@medixcare.ai", ward: "3A",
  },
  {
    id: "cw5", name: "Olivia Bennett", role: "Care Assistant", avatarInitials: "OB",
    availability: "Off Duty", experienceYears: 3, skills: ["Personal Care", "Meal Support"],
    shift: "Night", patientsAssigned: ["p5", "p11"], rating: 4.5, performance: 87,
    phone: "+44 7700 900205", email: "olivia.bennett@medixcare.ai", ward: "Res-1",
  },
  {
    id: "cw6", name: "Daniel Foster", role: "Senior Care Worker", avatarInitials: "DF",
    availability: "Available", experienceYears: 8, skills: ["Fall Prevention", "Frailty Care", "First Aid"],
    shift: "Afternoon", patientsAssigned: ["p8", "p16"], rating: 4.6, performance: 90,
    phone: "+44 7700 900206", email: "daniel.foster@medixcare.ai", ward: "Res-2",
  },
  {
    id: "cw7", name: "Grace Mitchell", role: "Midwife", avatarInitials: "GM",
    availability: "On Shift", experienceYears: 7, skills: ["Antenatal Care", "Maternal Health"],
    shift: "Morning", patientsAssigned: ["p7"], rating: 5.0, performance: 98,
    phone: "+44 7700 900207", email: "grace.mitchell@medixcare.ai", ward: "MAT",
  },
  {
    id: "cw8", name: "Ryan Walker", role: "Registered Nurse", avatarInitials: "RW",
    availability: "On Shift", experienceYears: 4, skills: ["Diabetes Management", "Patient Education"],
    shift: "Afternoon", patientsAssigned: ["p1", "p12"], rating: 4.6, performance: 89,
    phone: "+44 7700 900208", email: "ryan.walker@medixcare.ai", ward: "OP",
  },
  {
    id: "cw9", name: "Chloe Robinson", role: "Care Assistant", avatarInitials: "CR",
    availability: "Available", experienceYears: 2, skills: ["Personal Care", "Companionship"],
    shift: "Night", patientsAssigned: ["p5", "p17"], rating: 4.4, performance: 85,
    phone: "+44 7700 900209", email: "chloe.robinson@medixcare.ai", ward: "Res-1",
  },
  {
    id: "cw10", name: "Thomas Hughes", role: "Physiotherapist", avatarInitials: "TH",
    availability: "On Shift", experienceYears: 10, skills: ["Sports Injury", "Rehabilitation", "Manual Therapy"],
    shift: "Morning", patientsAssigned: ["p3", "p18"], rating: 4.8, performance: 93,
    phone: "+44 7700 900210", email: "thomas.hughes@medixcare.ai", ward: "Day",
  },
];

export function getCareWorkerById(id: string) {
  return careWorkers.find((w) => w.id === id);
}
