import {
  faFileAlt,
  faCheckCircle,
  faHourglassHalf,
} from "@fortawesome/free-solid-svg-icons";

export const profileFields = [
  { key: "name", label: "Name" },
  { key: "employeeId", label: "Employee ID" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "department", label: "Department" },
  { key: "zone", label: "Assigned Zone" },
  { key: "createdAt", label: "Joined Date" },
];

export const statsConfig = {
  title: "Performance Summary",
  cards: [
    {
      key: "totalManaged",
      label: "Total Managed",
      icon: faFileAlt,
      color: "#667eea",
    },
    {
      key: "resolved",
      label: "Resolved",
      icon: faCheckCircle,
      color: "#10b981",
    },
    {
      key: "pending",
      label: "Pending",
      icon: faHourglassHalf,
      color: "#f59e0b",
    },
  ],
};

export const navigationButtons = [
  {
    label: "View Reports",
    path: "/admin/reports",
  },
];
