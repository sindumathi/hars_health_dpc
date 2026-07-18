export const genderData = [
  { id: 2, label: "Female", value: "female" },
  { id: 3, label: "Male", value: "male" },
  { id: 4, label: "Transgender", value: "trans" },
];

// export type DepartmentCategory = "Family"|"Medical"| "Surgical"| "Paediatrics"| "Emergency" | "Maternity";
// export interface Department {
//   id: string;
//   name: string;
//   category: DepartmentCategory;
//   code: string; // short code used in submissions and staff filters
// }

export const departments = [
  // --- Emergency ---
  {
    id: "dept_ae",
    name: "Accident & Emergency (A&E)",
    category: "Emergency",
    code: "AE",
  },

  // --- Medical ---
  { id: "dept_cardio", name: "Cardiology", category: "Medical", code: "CAR" },

  {
    id: "dept_gastro",
    name: "Gastroenterology",
    category: "Medical",
    code: "GAS",
  },
  { id: "dept_neuro", name: "Neurology", category: "Medical", code: "NEU" },
  { id: "dept_rheum", name: "Rheumatology", category: "Medical", code: "RHE" },
  {
    id: "dept_infect",
    name: "Infectious Diseases",
    category: "Medical",
    code: "INF",
  },
  { id: "dept_derm", name: "Dermatology", category: "Medical", code: "DER" },

  // --- Surgical ---
  {
    id: "dept_gen_surg",
    name: "General Surgery",
    category: "Surgical",
    code: "GEN",
  },
  { id: "dept_ortho", name: "Orthopaedics", category: "Surgical", code: "ORT" },
  {
    id: "dept_ent",
    name: "Ear, Nose & Throat (ENT)",
    category: "Surgical",
    code: "ENT",
  },

  // --- Paediatrics ---
  {
    id: "dept_paeds",
    name: "General Paediatrics",
    category: "Paediatrics",
    code: "PAE",
  },
  {
    id: "dept_nicu",
    name: "Neonatal Intensive Care (NICU)",
    category: "Paediatrics",
    code: "NIC",
  },

  // --- Maternity ---
  { id: "dept_obs", name: "Obstetrics", category: "Maternity", code: "OBS" },
  { id: "dept_gynae", name: "Gynaecology", category: "Maternity", code: "GYN" },
];
