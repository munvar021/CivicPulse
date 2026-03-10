import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEdit,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import StatusBadge from "../../../components/StatusBadge/statusBadge";
import PriorityBadge from "../../../components/PriorityBadge/priorityBadge";
import TablePageLayout from "../../../components/Layouts/TablePageLayout/tablePageLayout";
import officerService from "../../../services/officerService";
import {
  ActionButton,
  ActionsWrapper,
  CompleteButton,
} from "./assignedTasksStyles";

const AssignedTasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filterOptions = [
    { value: "all", label: "All" },
    { value: "assigned", label: "Assigned" },
    { value: "in_progress", label: "In Progress" },
    { value: "delayed", label: "Delayed" },
    { value: "resolved", label: "Resolved" },
  ];

  useEffect(() => {
    fetchData();
  }, [filter, currentPage, searchTerm]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await officerService.getOfficerAssignedTasks(
        filter,
        currentPage,
        searchTerm,
      );
      setTasks(data.tasks);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError("Failed to load assigned tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (option) => {
    setFilter(option.value);
    setCurrentPage(1);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const columns = [
    { key: "title", label: "Title", sortable: true },
    {
      key: "department",
      label: "Department",
      sortable: true,
      render: (department) => department?.name || "N/A",
    },
    {
      key: "location",
      label: "Location",
      sortable: false,
      render: (location) => location?.address || "N/A",
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (status) => <StatusBadge status={status} variant="small" />,
    },
    {
      key: "severity",
      label: "Priority",
      sortable: true,
      render: (severity) => (
        <PriorityBadge severity={severity} variant="small" />
      ),
    },
    {
      key: "dueDate",
      label: "Due Date",
      sortable: true,
      render: (dueDate) =>
        dueDate ? new Date(dueDate).toLocaleDateString("en-GB") : "N/A",
    },
    {
      key: "actions",
      label: "Actions",
      sortable: false,
      render: (_, task) => (
        <ActionsWrapper>
          <ActionButton
            onClick={() => navigate(`/officer/task/${task._id}`)}
            title="View Details"
          >
            <FontAwesomeIcon icon={faEye} />
          </ActionButton>
          {task.status !== "resolved" && task.status !== "closed" && (
            <>
              <ActionButton
                onClick={() => navigate(`/officer/update-status/${task._id}`)}
                title="Update Status"
              >
                <FontAwesomeIcon icon={faEdit} />
              </ActionButton>
              <CompleteButton
                onClick={() => navigate(`/officer/complete-task/${task._id}`)}
                title="Mark Complete"
              >
                <FontAwesomeIcon icon={faCheckCircle} />
              </CompleteButton>
            </>
          )}
        </ActionsWrapper>
      ),
    },
  ];

  const filters = [
    {
      label: "Status",
      value: filter,
      options: filterOptions,
      onChange: handleFilterChange,
    },
  ];

  return (
    <TablePageLayout
      title="Assigned Tasks"
      columns={columns}
      data={tasks}
      filters={filters}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      loading={loading}
      error={error}
      emptyMessage="No assigned tasks found."
    />
  );
};

export default AssignedTasks;
