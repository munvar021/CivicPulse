import React from "react";
import {
  faFileAlt,
  faCheckCircle,
  faHourglassHalf,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import ReportsLayout from "../../../components/Layouts/ReportsLayout/reportsLayout";
import superAdminService from "../../../services/superAdminService";

const GlobalReports = () => {
  const periodOptions = [
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "quarterly", label: "Quarterly" },
    { value: "yearly", label: "Yearly" },
  ];

  const statsConfig = [
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
      key: "pending",
      label: "Pending",
      icon: faHourglassHalf,
      color: "#f59e0b",
    },
    {
      key: "avgTime",
      label: "Avg Resolution Time",
      icon: faClock,
      color: "#3b82f6",
    },
  ];

  const tableConfig = {
    title: "Zone-wise Performance Comparison",
    columns: [
      { key: "zone", label: "Zone" },
      { key: "total", label: "Total Complaints" },
      { key: "resolved", label: "Resolved" },
      { key: "efficiency", label: "Efficiency" },
    ],
  };

  const service = {
    getReports: async (period) => {
      const { data } = await superAdminService.getSuperAdminReports(period);
      return {
        stats: data.stats,
        tableData: data.zoneComparison,
      };
    },
  };

  return (
    <ReportsLayout
      title="Global Reports"
      service={service}
      periodOptions={periodOptions}
      statsConfig={statsConfig}
      tableConfig={tableConfig}
      exportFileName="superadmin_reports"
    />
  );
};

export default GlobalReports;
