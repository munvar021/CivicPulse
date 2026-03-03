import React from "react";
import {
  faDownload,
  faCheckCircle,
  faHourglassHalf,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import ReportsLayout from "../../../components/Layouts/ReportsLayout/reportsLayout";
import adminService from "../../../services/adminService";

const Reports = () => {
  const periodOptions = [
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "quarterly", label: "Quarterly" },
  ];

  const statsConfig = [
    {
      key: "received",
      label: "Complaints Received",
      icon: faDownload,
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
    { key: "reassigned", label: "Reassigned", icon: faClock, color: "#f97316" },
  ];

  const tableConfig = {
    title: "Priority-wise Breakdown",
    columns: [
      { key: "priority", label: "Priority" },
      { key: "total", label: "Total" },
      { key: "resolved", label: "Resolved" },
      { key: "pending", label: "Pending" },
      {
        key: "resolutionRate",
        label: "Resolution Rate",
        render: (row) =>
          row.total > 0
            ? `${((row.resolved / row.total) * 100).toFixed(1)}%`
            : "0%",
      },
    ],
  };

  const service = {
    getReports: async (period) => {
      const data = await adminService.getReports(period);
      return {
        stats: data.overallStats,
        tableData: data.priorityBreakdown,
      };
    },
  };

  return (
    <ReportsLayout
      title="Performance Reports"
      service={service}
      periodOptions={periodOptions}
      statsConfig={statsConfig}
      tableConfig={tableConfig}
      exportFileName="admin_report"
    />
  );
};

export default Reports;
