import {
  faFileAlt,
  faCheckCircle,
  faHourglassHalf,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

export const profileFields = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  {
    key: "createdAt",
    label: "Member Since",
    format: (value) =>
      value ? new Date(value).toLocaleDateString("en-GB") : "N/A",
  },
];

export const statsConfig = {
  title: "Complaint Statistics",
  cards: [
    {
      key: "total",
      label: "Total Complaints",
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
      key: "inProgress",
      label: "Pending",
      icon: faHourglassHalf,
      color: "#f59e0b",
    },
    {
      key: "escalated",
      label: "Escalated",
      icon: faExclamationTriangle,
      color: "#ef4444",
    },
  ],
};

export const navigationButtons = [
  {
    label: "View All Complaints",
    path: "/my-complaints",
  },
];
