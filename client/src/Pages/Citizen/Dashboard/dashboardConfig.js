import {
  faFileAlt,
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
    sectionTitle: "Complaint Summary",
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
    label: "Escalated",
    value: stats.escalated,
    icon: faExclamationTriangle,
    color: "#ef4444",
  },
];

export const getQuickActionsConfig = () => [
  {
    title: "Report New Issue",
    description: "Submit a new civic complaint with location and proof",
    label: "Report Issue",
    path: "/report-issue",
    variant: "primary",
  },
  {
    title: "View Nearby Issues",
    description: "See issues reported in your area",
    label: "View Nearby",
    path: "/nearby-issues",
    variant: "secondary",
  },
];

export const getEmptyStateConfig = () => ({
  sectionTitle: "Recent Complaints",
  icon: faInbox,
  title: "No recent complaints",
  description: "You haven't reported any issues yet",
});
