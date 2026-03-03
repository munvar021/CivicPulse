import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faUserPlus,
  faEdit,
  faTrash,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import toast from "../../../utils/toast";
import StatusBadge from "../../StatusBadge/statusBadge";
import PriorityBadge from "../../PriorityBadge/priorityBadge";
import TablePageLayout from "../TablePageLayout/tablePageLayout";
import AssignmentModal from "../../ReassignModal/reassignModal";
import adminService from "../../../services/adminService";
import superAdminService from "../../../services/superAdminService";
import { fetchComplaints } from "../../../store/slices/complaintsSlice";
import { fetchDepartments } from "../../../store/slices/departmentsSlice";
import {
  ActionButton,
  ActionsContainer,
  AssignActionButton,
} from "./complaintManagementLayoutStyles";

const ComplaintManagementLayout = ({ role = "admin" }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list: complaints, loading, totalPages } = useSelector((state) => state.complaints);
  const { list: departments } = useSelector((state) => state.departments);
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    department: "all",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [assigningComplaint, setAssigningComplaint] = useState(null);
  const [officers, setOfficers] = useState([]);
  const [isModalLoading, setIsModalLoading] = useState(false);

  const service = role === "superAdmin" ? superAdminService : adminService;
  const basePath = role === "superAdmin" ? "/superadmin" : "/admin";

  useEffect(() => {
    if (role === "superAdmin") {
      dispatch(fetchDepartments());
    }
    dispatch(fetchComplaints({ ...filters, page: currentPage }));
  }, [dispatch, filters, currentPage, role]);

  const statusOptions = [
    { value: "all", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "assigned", label: "Assigned" },
    { value: "reassigned", label: "Reassigned" },
    { value: "in_progress", label: "In Progress" },
    { value: "resolved", label: "Resolved" },
    { value: "delayed", label: "Delayed" },
  ];

  const priorityOptions = [
    { value: "all", label: "All" },
    { value: "critical", label: "Critical" },
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ];

  const handleFilterChange = (name, option) => {
    setFilters((prev) => ({ ...prev, [name]: option.value }));
    setCurrentPage(1);
  };

  const handleAssignClick = async (complaint) => {
    try {
      if (role === "admin") {
        const data = await adminService.getOfficers();
        setOfficers(Array.isArray(data) ? data : []);
      } else if (role === "superAdmin") {
        const departmentId = complaint.department?._id || complaint.department;
        if (departmentId) {
          const { data } = await superAdminService.getUsers(
            "officer",
            departmentId,
          );
          setOfficers(
            Array.isArray(data) ? data : data.officers || data.users || [],
          );
        } else {
          toast.error("No department assigned to this complaint");
          return;
        }
      }
      setAssigningComplaint(complaint);
    } catch (err) {
      toast.error("Failed to fetch officers");
    }
  };

  const handleAssignSubmit = async (data) => {
    try {
      setIsModalLoading(true);
      if (role === "admin") {
        await adminService.assignComplaint(assigningComplaint._id, {
          officer: data.officer.value,
          priority: assigningComplaint.severity,
          dueDate: data.dueDate,
          instructions: "",
        });
      } else if (role === "superAdmin") {
        await superAdminService.assignComplaint(assigningComplaint._id, {
          officerId: data.officer.value,
          dueDate: data.dueDate,
        });
      }
      toast.success("Officer assigned successfully");
      setAssigningComplaint(null);
      dispatch(fetchComplaints({ ...filters, page: currentPage }));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to assign officer");
    } finally {
      setIsModalLoading(false);
    }
  };

  const columns = [
    { key: "title", label: "Title", sortable: true },
    {
      key: "citizen",
      label: "Citizen",
      sortable: true,
      render: (citizen) => citizen?.name || "N/A",
    },
    ...(role === "superAdmin"
      ? [
          {
            key: "department",
            label: "Department",
            sortable: true,
            render: (department) => department?.name || "N/A",
          },
        ]
      : []),
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
      key: "assignedTo",
      label: "Assigned To",
      sortable: true,
      render: (assignedTo) => assignedTo?.name || "Unassigned",
    },
    {
      key: "createdAt",
      label: "Date",
      sortable: true,
      render: (createdAt) => new Date(createdAt).toLocaleDateString("en-GB"),
    },
    {
      key: "actions",
      label: "Actions",
      sortable: false,
      render: (_, complaint) => (
        <ActionsContainer>
          <ActionButton
            onClick={() => navigate(`${basePath}/complaint/${complaint._id}`)}
            title="View Details"
          >
            <FontAwesomeIcon icon={faEye} />
          </ActionButton>
          {(role === "admin" || role === "superAdmin") &&
            !complaint.assignedTo &&
            complaint.status === "pending" && (
              <AssignActionButton
                onClick={() => handleAssignClick(complaint)}
                title="Assign Officer"
              >
                <FontAwesomeIcon icon={faUserPlus} />
              </AssignActionButton>
            )}
        </ActionsContainer>
      ),
    },
  ];

  const filterConfig = [
    {
      label: "Status",
      value: filters.status,
      options: statusOptions,
      onChange: (option) => handleFilterChange("status", option),
    },
    {
      label: "Priority",
      value: filters.priority,
      options: priorityOptions,
      onChange: (option) => handleFilterChange("priority", option),
    },
    ...(role === "superAdmin"
      ? [
          {
            label: "Department",
            value: filters.department,
            options: [
              { value: "all", label: "All Departments" },
              ...departments.map((dept) => ({
                value: dept._id,
                label: dept.name,
              })),
            ],
            onChange: (option) => handleFilterChange("department", option),
          },
        ]
      : []),
  ];

  return (
    <>
      <TablePageLayout
        title={
          role === "superAdmin" ? "All Complaints" : "Complaint Management"
        }
        columns={columns}
        data={complaints}
        filters={filterConfig}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        loading={loading}
        error={error}
        emptyMessage="No complaints found matching the criteria."
      />

      {assigningComplaint && (
        <AssignmentModal
          mode="assign"
          officers={officers}
          onClose={() => setAssigningComplaint(null)}
          onSubmit={handleAssignSubmit}
          isLoading={isModalLoading}
        />
      )}
    </>
  );
};

export default ComplaintManagementLayout;
