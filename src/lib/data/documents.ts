export type DocumentFolder = { id: string; name: string; count: number };

export type Document = {
  id: string;
  folderId: string;
  name: string;
  type: "pdf" | "image" | "record";
  uploadedDate: string;
  uploadedBy: string;
  size: string;
  relatedPatientId?: string;
};

export const folders: DocumentFolder[] = [
  { id: "f1", name: "Medical Records", count: 3 },
  { id: "f2", name: "Reports", count: 3 },
  { id: "f3", name: "Images & Scans", count: 2 },
  { id: "f4", name: "Consent Forms", count: 2 },
];

export const documents: Document[] = [
  { id: "d1", folderId: "f1", name: "Margaret O'Neill — Care Summary.pdf", type: "pdf", uploadedDate: "2026-07-06", uploadedBy: "Sarah Taylor", size: "1.2 MB", relatedPatientId: "p1" },
  { id: "d2", folderId: "f2", name: "James Whitaker — Chest X-Ray Report.pdf", type: "pdf", uploadedDate: "2026-06-18", uploadedBy: "Dr. Amelia Hart", size: "3.4 MB", relatedPatientId: "p2" },
  { id: "d3", folderId: "f3", name: "Aisha Rahman — 28wk Scan.png", type: "image", uploadedDate: "2026-07-06", uploadedBy: "Grace Mitchell", size: "2.1 MB", relatedPatientId: "p7" },
  { id: "d4", folderId: "f2", name: "Robert Clarke — ECG & Troponin.pdf", type: "pdf", uploadedDate: "2026-07-08", uploadedBy: "Michael Reed", size: "0.8 MB", relatedPatientId: "p14" },
  { id: "d5", folderId: "f4", name: "Emma Wilson — Treatment Consent.pdf", type: "pdf", uploadedDate: "2026-06-25", uploadedBy: "Dr. Amelia Hart", size: "0.4 MB", relatedPatientId: "p9" },
  { id: "d6", folderId: "f1", name: "Henry Okafor — Falls Assessment.pdf", type: "pdf", uploadedDate: "2026-07-04", uploadedBy: "Dr. Amelia Hart", size: "1.5 MB", relatedPatientId: "p8" },
  { id: "d7", folderId: "f3", name: "Sophia Brown — Renal Ultrasound.png", type: "image", uploadedDate: "2026-07-02", uploadedBy: "Dr. Amelia Hart", size: "2.8 MB", relatedPatientId: "p11" },
  { id: "d8", folderId: "f1", name: "Priya Sharma — Discharge Plan.pdf", type: "pdf", uploadedDate: "2026-07-07", uploadedBy: "Emily Clark", size: "0.6 MB", relatedPatientId: "p3" },
  { id: "d9", folderId: "f2", name: "Olivia Davis — Respiratory Function Test.pdf", type: "pdf", uploadedDate: "2026-07-07", uploadedBy: "Dr. Amelia Hart", size: "0.9 MB", relatedPatientId: "p13" },
  { id: "d10", folderId: "f4", name: "William Turner — Care Consent Form.pdf", type: "pdf", uploadedDate: "2026-06-10", uploadedBy: "Daniel Foster", size: "0.3 MB", relatedPatientId: "p16" },
];

export function getDocumentsForPatient(patientId: string) {
  return documents.filter((d) => d.relatedPatientId === patientId);
}
