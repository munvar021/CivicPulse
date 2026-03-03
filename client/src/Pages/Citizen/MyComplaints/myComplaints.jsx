import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEdit,
  faTrash,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import toast from "../../../utils/toast";
import StatusBadge from "../../../components/StatusBadge/statusBadge";
import PriorityBadge from "../../../components/PriorityBadge/priorityBadge";
import TablePageLayout from "../../../components/Layouts/TablePageLayout/tablePageLayout";
import ConfirmationModal from "../../../components/ConfirmationModal/confirmationModal";
import citizenService from "../../../services/citizenService";
import { fetchComplaints } from "../../../store/slices/complaintsSlice";
import {
  ActionButton,
  ActionsWrapper,
  DeleteButton,
  FeedbackButton,
} from "./myComplaintsStyles";

const MyComplaints = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list: complaints, loading, totalPages } = useSelector((state) => state.complaints);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [complaintToDelete, setComplaintToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filterOptions = [
    { value: "all", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "in_progress", label: "In Progress" },
    { value: "resolved", label: "Resolved" },
  ];

  useEffect(() => {
    dispatch(fetchComplaints({ status: filter === "all" ? undefined : filter, page: currentPage }));
  }, [dispatch, filter, currentPage]);

  const handleFilterChange = (option) => {
    setFilter(option.value);
    setCurrentPage(1);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleDeleteClick = (complaint) => {
    setComplaintToDelete(complaint);
    setIsConfirmModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await citizenService.deleteComplaint(complaintToDelete._id);
      toast.success("Complaint deleted successfully");
      dispatch(fetchComplaints({ status: filter === "all" ? undefined : filter, page: currentPage }));
      setIsConfirmModalOpen(false);
      setComplaintToDelete(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete complaint");
    } finally {
      setIsDeleting(false);
    }
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
        <ActionsWrapper>
          <ActionButton
            onClick={() => navigate(`/complaint/${complaint._id}`)}
            title="View Details"
          >
            <FontAwesomeIcon icon={faEye} />
          </ActionButton>
          {complaint.status === "pending" && (
            <>
              <ActionButton
                onClick={() => navigate(`/edit-complaint/${complaint._id}`)}
                title="Edit Complaint"
              >
                <FontAwesomeIcon icon={faEdit} />
              </ActionButton>
              <DeleteButton
                onClick={() => handleDeleteClick(complaint)}
                title="Delete Complaint"
              >
                <FontAwesomeIcon icon={faTrash} />
              </DeleteButton>
            </>
          )}
          {complaint.status === "resolved" && (
            <FeedbackButton
              onClick={() => navigate(`/feedback/${complaint._id}`)}
              title="Provide Feedback"
            >
              <FontAwesomeIcon icon={faCommentDots} />
            </FeedbackButton>
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
    <>
      <TablePageLayout
        title="My Complaints"
        columns={columns}
        data={complaints}
        filters={filters}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        loading={loading}
        error={error}
        emptyMessage="No complaints found."
      />

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => {
          setIsConfirmModalOpen(false);
          setComplaintToDelete(null);
        }}
        onConfirm={handleDelete}
        title="Delete Complaint"
        message={`Are you sure you want to delete "${complaintToDelete?.title}"? This action cannot be undone.`}
        type="delete"
        isLoading={isDeleting}
      />
    </>
  );
};

export default MyComplaints;
