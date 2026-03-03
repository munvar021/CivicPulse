export const getStatusColor = (status) => {
  if (!status) return "#6b7280";

  const normalizedStatus = status.toLowerCase().replace(/[_\s]/g, "");

  const statusColors = {
    resolved: "#10b981",
    completed: "#10b981",
    inprogress: "#f59e0b",
    pending: "#3b82f6",
    submitted: "#3b82f6",
    assigned: "#8b5cf6",
    reassigned: "#f97316",
    delayed: "#ef4444",
    escalated: "#ef4444",
    blocked: "#ef4444",
    rejected: "#ef4444",
  };

  return statusColors[normalizedStatus] || "#6b7280";
};

export const getPriorityColor = (priority) => {
  if (!priority) return "#6b7280";

  const normalizedPriority = priority.toLowerCase();

  const priorityColors = {
    high: "#ef4444",
    medium: "#f59e0b",
    low: "#3b82f6",
  };

  return priorityColors[normalizedPriority] || "#6b7280";
};

export const getSeverityColor = (severity) => {
  if (!severity) return "#6b7280";

  const normalizedSeverity = severity.toLowerCase();

  const severityColors = {
    critical: "#dc2626",
    high: "#ef4444",
    medium: "#f59e0b",
    low: "#3b82f6",
  };

  return severityColors[normalizedSeverity] || "#6b7280";
};

export const getCategoryColor = (category) => {
  if (!category) return "#6b7280";

  const normalizedCategory = category.toLowerCase();

  const categoryColors = {
    roads: "#3b82f6",
    water: "#06b6d4",
    electricity: "#f59e0b",
    sanitation: "#10b981",
    streetlights: "#eab308",
    drainage: "#0ea5e9",
    parks: "#22c55e",
    traffic: "#ef4444",
    noise: "#8b5cf6",
    pollution: "#64748b",
    other: "#6b7280",
  };

  return categoryColors[normalizedCategory] || "#6b7280";
};

export const formatStatus = (status) => {
  if (!status) return "";
  return status
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const getColorWithOpacity = (color, opacity = 0.1) => {
  const hex = color.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
