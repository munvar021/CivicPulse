import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import TablePageLayout from "../../../components/Layouts/TablePageLayout/tablePageLayout";
import adminService from "../../../services/adminService";
import { getStatusColor, getPriorityColor } from "../../../utils/colorMapper";
import {
  StatusBadge,
  PriorityBadge,
  ActionButton,
  DelayBadge,
} from "./escalationsStyles";

const Escalations = () => {
  const navigate = useNavigate();
  const [escalations, setEscalations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEscalations();
  }, [currentPage]);

  const fetchEscalations = async () => {
    try {
      setLoading(true);
      const data = await adminService.getEscalatedComplaints(currentPage);
      setEscalations(data.complaints);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError("Failed to load escalations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const calculateDaysDelayed = (dueDate) => {
    if (!dueDate) return 0;
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = today - due;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const columns = [
    { key: "title", label: "Title" },
    {
      key: "citizen",
      label: "Citizen",
      render: (citizen) => citizen?.name || "N/A",
    },
    {
      key: "status",
      label: "Status",
      render: (status) => (
        <StatusBadge color={getStatusColor(status)}>{status}</StatusBadge>
      ),
    },
    {
      key: "severity",
      label: "Priority",
      render: (severity) => (
        <PriorityBadge color={getPriorityColor(severity)}>
          {severity}
        </PriorityBadge>
      ),
    },
    {
      key: "assignedTo",
      label: "Assigned To",
      render: (assignedTo) => assignedTo?.name || "Unassigned",
    },
    {
      key: "dueDate",
      label: "Due Date",
      render: (dueDate) =>
        dueDate ? new Date(dueDate).toLocaleDateString("en-GB") : "N/A",
    },
    {
      key: "daysDelayed",
      label: "Days Delayed",
      render: (_, complaint) => {
        const days = calculateDaysDelayed(complaint.dueDate);
        return days > 0 ? <DelayBadge>{days} days</DelayBadge> : "N/A";
      },
    },
    {
      key: "actions",
      label: "Actions",
      render: (_, complaint) => (
        <ActionButton
          onClick={() => navigate(`/admin/complaint/${complaint._id}`)}
          title="View Details"
        >
          <FontAwesomeIcon icon={faEye} />
        </ActionButton>
      ),
    },
  ];

  return (
    <TablePageLayout
      title="Escalation Management"
      columns={columns}
      data={escalations}
      loading={loading}
      error={error}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      emptyMessage="No escalated complaints found."
    />
  );
};

export default Escalations;
