import {
  faFileAlt,
  faCheckCircle,
  faHourglassHalf,
  faExclamationTriangle,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

export const profileFields = [
  { key: "name", label: "Name" },
  { key: "employeeId", label: "Employee ID" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "zone", label: "Assigned Zone" },
  { key: "joinedDate", label: "Joined Date" },
];

export const statsConfig = {
  title: "Performance Statistics",
  cards: [
    {
      key: "total",
      label: "Total Assigned",
      icon: faFileAlt,
      color: "#667eea",
    },
    {
      key: "completed",
      label: "Completed",
      icon: faCheckCircle,
      color: "#10b981",
    },
    {
      key: "inProgress",
      label: "In Progress",
      icon: faHourglassHalf,
      color: "#f59e0b",
    },
    {
      key: "delayed",
      label: "Delayed",
      icon: faExclamationTriangle,
      color: "#ef4444",
    },
    {
      key: "avgRating",
      label: "Avg Rating",
      icon: faStar,
      color: "#f59e0b",
    },
  ],
};

export const navigationButtons = [
  {
    label: "View Work History",
    path: "/officer/work-history",
  },
];
