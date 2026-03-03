import {
  faFileAlt,
  faPause,
  faHourglassHalf,
  faCheckCircle,
  faExclamationTriangle,
  faInbox,
} from "@fortawesome/free-solid-svg-icons";

export const getStatsConfig = (stats) => [
  {
    label: "Total Complaints",
    value: stats.total,
    icon: faFileAlt,
    color: "#667eea",
    sectionTitle: "System Overview",
  },
  { label: "Pending", value: stats.pending, icon: faPause, color: "#f59e0b" },
  {
    label: "In Progress",
    value: stats.inProgress,
    icon: faHourglassHalf,
    color: "#3b82f6",
  },
  {
    label: "Resolved",
    value: stats.resolved,
    icon: faCheckCircle,
    color: "#10b981",
  },
  {
    label: "Delayed",
    value: stats.delayed,
    icon: faExclamationTriangle,
    color: "#ef4444",
  },
];

export const getEmptyStateConfig = () => ({
  sectionTitle: "Recent Complaints",
  icon: faInbox,
  title: "No recent complaints",
  description: "No complaints in the system at the moment",
});
