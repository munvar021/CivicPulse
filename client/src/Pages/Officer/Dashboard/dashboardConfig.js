import {
  faFileAlt,
  faHourglassHalf,
  faCheckCircle,
  faBan,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";

export const getStatsConfig = (stats) => [
  {
    label: "Total Assigned",
    value: stats.total,
    icon: faFileAlt,
    color: "#667eea",
    sectionTitle: "Performance Statistics",
  },
  {
    label: "In Progress",
    value: stats.inProgress,
    icon: faHourglassHalf,
    color: "#f59e0b",
  },
  {
    label: "Completed",
    value: stats.completed,
    icon: faCheckCircle,
    color: "#10b981",
  },
  { label: "Blocked", value: stats.blocked, icon: faBan, color: "#ef4444" },
];

export const getEmptyStateConfig = () => ({
  sectionTitle: "Active Tasks",
  icon: faTasks,
  title: "No active tasks",
  description: "You don't have any tasks assigned at the moment",
});
