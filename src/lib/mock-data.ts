export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  rating: number;
  experience: number;
};

export type Appointment = {
  id: string;
  patient: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  status: "Confirmed" | "Pending" | "Completed" | "Cancelled";
  type: "In-person" | "Video";
};

export type Invoice = {
  id: string;
  patient: string;
  service: string;
  date: string;
  amount: number;
  status: "Paid" | "Unpaid" | "Overdue";
};

export type LabReport = {
  id: string;
  patient: string;
  test: string;
  date: string;
  status: "Ready" | "Processing" | "Pending";
  doctor: string;
  summary: string;
  results: { marker: string; value: string; range: string; flag: "Normal" | "High" | "Low" }[];
};

export const doctors: Doctor[] = [
  { id: "d1", name: "Dr. Aarav Mehta", specialty: "Cardiology", avatar: "AM", rating: 4.9, experience: 14 },
  { id: "d2", name: "Dr. Sara Lin", specialty: "Dermatology", avatar: "SL", rating: 4.8, experience: 9 },
  { id: "d3", name: "Dr. Omar Haddad", specialty: "Neurology", avatar: "OH", rating: 4.7, experience: 17 },
  { id: "d4", name: "Dr. Priya Nair", specialty: "Pediatrics", avatar: "PN", rating: 4.9, experience: 11 },
  { id: "d5", name: "Dr. Lukas Weber", specialty: "Orthopedics", avatar: "LW", rating: 4.6, experience: 20 },
  { id: "d6", name: "Dr. Hana Sato", specialty: "General Medicine", avatar: "HS", rating: 4.8, experience: 7 },
];

export const appointments: Appointment[] = [
  { id: "a1", patient: "Maria Gomez", doctor: "Dr. Aarav Mehta", specialty: "Cardiology", date: "2026-05-14", time: "09:30", status: "Confirmed", type: "In-person" },
  { id: "a2", patient: "James O'Connor", doctor: "Dr. Sara Lin", specialty: "Dermatology", date: "2026-05-14", time: "10:15", status: "Confirmed", type: "Video" },
  { id: "a3", patient: "Yuki Tanaka", doctor: "Dr. Aarav Mehta", specialty: "Cardiology", date: "2026-05-14", time: "11:00", status: "Pending", type: "In-person" },
  { id: "a4", patient: "Noah Becker", doctor: "Dr. Priya Nair", specialty: "Pediatrics", date: "2026-05-15", time: "14:00", status: "Confirmed", type: "In-person" },
  { id: "a5", patient: "Anika Rao", doctor: "Dr. Omar Haddad", specialty: "Neurology", date: "2026-05-13", time: "16:30", status: "Completed", type: "Video" },
  { id: "a6", patient: "Diego Alvarez", doctor: "Dr. Lukas Weber", specialty: "Orthopedics", date: "2026-05-12", time: "08:45", status: "Cancelled", type: "In-person" },
];

export const invoices: Invoice[] = [
  { id: "INV-10293", patient: "Maria Gomez", service: "Cardiology consultation", date: "2026-05-08", amount: 180, status: "Paid" },
  { id: "INV-10294", patient: "James O'Connor", service: "Skin biopsy", date: "2026-05-09", amount: 420, status: "Unpaid" },
  { id: "INV-10295", patient: "Yuki Tanaka", service: "ECG + consult", date: "2026-05-10", amount: 240, status: "Paid" },
  { id: "INV-10296", patient: "Noah Becker", service: "Pediatric visit", date: "2026-05-10", amount: 95, status: "Paid" },
  { id: "INV-10297", patient: "Anika Rao", service: "MRI brain", date: "2026-05-04", amount: 1180, status: "Overdue" },
  { id: "INV-10298", patient: "Diego Alvarez", service: "X-ray (knee)", date: "2026-05-11", amount: 130, status: "Unpaid" },
];

export const labReports: LabReport[] = [
  {
    id: "LAB-7781",
    patient: "Maria Gomez",
    test: "Lipid Panel",
    date: "2026-05-09",
    status: "Ready",
    doctor: "Dr. Aarav Mehta",
    summary: "Cholesterol within target range. Continue current statin therapy and recheck in 6 months.",
    results: [
      { marker: "Total Cholesterol", value: "184 mg/dL", range: "< 200", flag: "Normal" },
      { marker: "LDL", value: "108 mg/dL", range: "< 130", flag: "Normal" },
      { marker: "HDL", value: "42 mg/dL", range: "> 40", flag: "Normal" },
      { marker: "Triglycerides", value: "212 mg/dL", range: "< 150", flag: "High" },
    ],
  },
  {
    id: "LAB-7782",
    patient: "Anika Rao",
    test: "Complete Blood Count",
    date: "2026-05-08",
    status: "Ready",
    doctor: "Dr. Omar Haddad",
    summary: "Mild anemia detected. Recommend iron supplementation and dietary review.",
    results: [
      { marker: "Hemoglobin", value: "10.8 g/dL", range: "12.0 – 15.5", flag: "Low" },
      { marker: "WBC", value: "6.4 ×10⁹/L", range: "4.0 – 11.0", flag: "Normal" },
      { marker: "Platelets", value: "245 ×10⁹/L", range: "150 – 400", flag: "Normal" },
    ],
  },
  {
    id: "LAB-7783",
    patient: "James O'Connor",
    test: "Skin biopsy histology",
    date: "2026-05-11",
    status: "Processing",
    doctor: "Dr. Sara Lin",
    summary: "Awaiting pathology review.",
    results: [],
  },
  {
    id: "LAB-7784",
    patient: "Yuki Tanaka",
    test: "Thyroid Function",
    date: "2026-05-10",
    status: "Pending",
    doctor: "Dr. Hana Sato",
    summary: "Sample collection scheduled.",
    results: [],
  },
];

export const specialties = [
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "General Medicine",
];
