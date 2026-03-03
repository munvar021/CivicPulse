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
    label: "Pending Assignment",
    value: stats.pending,
    icon: faPause,
    color: "#3b82f6",
    sectionTitle: "Department Overview",
  },
  {
    label: "Reassigned",
    value: stats.reassigned,
    icon: faFileAlt,
    color: "#f97316",
  },
  {
    label: "In Progress",
    value: stats.inProgress,
    icon: faHourglassHalf,
    color: "#f59e0b",
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
  description: "No complaints in your department at the moment",
});
