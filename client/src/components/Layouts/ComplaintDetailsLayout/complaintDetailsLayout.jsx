import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faMapMarkerAlt,
  faCalendar,
  faUser,
  faUserPlus,
  faEdit,
  faSync,
  faTrash,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import toast from "../../../utils/toast";
import RoleHeader from "../../Headers/roleHeader";
import Loader from "../../Loaders/loader";
import ProgressTimeline from "../../ProgressTimeline/progressTimeline";
import AssignmentModal from "../../ReassignModal/reassignModal";
import ConfirmationModal from "../../ConfirmationModal/confirmationModal";
import Button from "../../Button/button";
import StatusBadge from "../../StatusBadge/statusBadge";
import PriorityBadge from "../../PriorityBadge/priorityBadge";
import { useAuth } from "../../../context/authContext";
import { formatDate } from "../../../utils/dateFormatter";
import citizenService from "../../../services/citizenService";
import adminService from "../../../services/adminService";
import superAdminService from "../../../services/superAdminService";
import officerService from "../../../services/officerService";
import {
  PageContainer,
  BackButton,
  DetailsCard,
  Title,
  InfoGrid,
  InfoItem,
  Label,
  Value,
  Description,
  Section,
  SectionTitle,
  ImageGrid,
  Image,
  ActionButton,
  ButtonGroup,
  ErrorText,
  EmptyText,
  AssignButtonWrapper,
  TitleWithMargin,
  AssignmentHeader,
  AssignmentActions,
  ReassignButton,
  EditButton,
  ActionsSection,
  CompleteButton,
} from "./complaintDetailsLayoutStyles";

const ComplaintDetailsLayout = ({
  role: propRole,
  complaint: propComplaint,
  backPath: propBackPath,
  backLabel: propBackLabel,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: authUser } = useAuth();
  const location = useLocation();

  const role =
    propRole ||
    (location.pathname.startsWith("/officer/")
      ? "officer"
      : location.pathname.startsWith("/admin/")
        ? "admin"
        : location.pathname.startsWith("/superadmin/")
          ? "superAdmin"
          : location.pathname.includes("/nearby-complaint/")
            ? "nearby"
            : "citizen");

  const [complaint, setComplaint] = useState(propComplaint || null);
  const [loading, setLoading] = useState(!propComplaint);
  const [error, setError] = useState(null);
  const [modalMode, setModalMode] = useState(null);
  const [officers, setOfficers] = useState([]);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const getService = () => {
    switch (role) {
      case "citizen":
        return citizenService;
      case "admin":
        return adminService;
      case "superAdmin":
        return superAdminService;
      case "officer":
        return officerService;
      default:
        return citizenService;
    }
  };

  const getBackPath = () => {
    if (propBackPath) return propBackPath;
    switch (role) {
      case "citizen":
        return "/my-complaints";
      case "admin":
        return "/admin/complaints";
      case "superAdmin":
        return "/superadmin/complaints";
      case "officer":
        return "/officer/assigned-tasks";
      default:
        return "/";
    }
  };

  const getBackLabel = () => {
    if (propBackLabel) return propBackLabel;
    return role === "officer" ? "Back to Tasks" : "Back to Complaints";
  };

  useEffect(() => {
    if (propComplaint) {
      setComplaint(propComplaint);
      setLoading(false);
      return;
    }

    const fetchComplaint = async () => {
      if (!authUser) return;

      try {
        setLoading(true);
        const service = getService();
        let data;

        if (role === "citizen") {
          const response = await service.getComplaintById(id);
          data = response.data;
        } else if (role === "superAdmin") {
          const response = await service.getComplaintById(id);
          data = response.data;
        } else if (role === "officer") {
          data = await service.getTaskById(id);
        } else {
          data = await service.getComplaintById(id);
        }

        setComplaint(data);
        setError(null);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch complaint details",
        );
        toast.error(
          err.response?.data?.message || "Failed to fetch complaint details",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchComplaint();
  }, [id, authUser, role, propComplaint]);

  const fetchOfficers = async () => {
    try {
      if (role === "admin") {
        const data = await adminService.getOfficers();
        setOfficers(Array.isArray(data) ? data : []);
      } else if (role === "superAdmin") {
        const departmentId =
          complaint?.department?._id || complaint?.department;
        if (departmentId) {
          const { data } = await superAdminService.getUsers(
            "officer",
            departmentId,
          );
          setOfficers(Array.isArray(data) ? data : data.officers || []);
        }
      }
    } catch (err) {
      toast.error("Failed to fetch officers");
    }
  };

  const handleAssignClick = async () => {
    await fetchOfficers();
    setModalMode("assign");
  };

  const handleReassignClick = async () => {
    await fetchOfficers();
    setModalMode("reassign");
  };

  const handleEditAssignment = async () => {
    await fetchOfficers();
    setModalMode("edit");
  };

  const handleModalSubmit = async (data) => {
    try {
      setIsModalLoading(true);

      if (role === "admin") {
        if (modalMode === "assign") {
          const updated = await adminService.assignComplaint(id, {
            officer: data.officer.value,
            priority: complaint.severity,
            dueDate: data.dueDate,
            instructions: "",
          });
          setComplaint(updated);
          toast.success("Officer assigned successfully");
        } else if (modalMode === "reassign") {
          const updated = await adminService.reassignComplaint(id, {
            officer: data.officer.value,
            reason: data.reason,
            dueDate: data.dueDate,
          });
          setComplaint(updated);
          toast.success("Complaint reassigned successfully");
        } else if (modalMode === "edit") {
          const updated = await adminService.updateAssignment(id, {
            officer: data.officer.value,
            dueDate: data.dueDate,
          });
          setComplaint(updated);
          toast.success("Assignment updated successfully");
        }
      } else if (role === "superAdmin") {
        if (modalMode === "assign") {
          await superAdminService.assignComplaint(id, {
            officerId: data.officer.value,
            dueDate: data.dueDate,
          });
          toast.success("Officer assigned successfully");
        } else if (modalMode === "reassign") {
          await superAdminService.reassignComplaint(id, {
            officerId: data.officer.value,
            reason: data.reason,
            dueDate: data.dueDate,
          });
          toast.success("Complaint reassigned successfully");
        } else if (modalMode === "edit") {
          await superAdminService.updateAssignment(id, {
            officer: data.officer.value,
            dueDate: data.dueDate,
          });
          toast.success("Assignment updated successfully");
        }

        const { data: updatedData } =
          await superAdminService.getComplaintById(id);
        setComplaint(updatedData);
      }

      setModalMode(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed");
    } finally {
      setIsModalLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await citizenService.deleteComplaint(id);
      toast.success("Complaint deleted successfully");
      navigate(getBackPath());
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete complaint");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleVerify = async () => {
    try {
      setIsVerifying(true);
      const service = role === "admin" ? adminService : superAdminService;
      await service.verifyComplaint(id);

      const updatedData =
        role === "admin"
          ? await adminService.getComplaintById(id)
          : await superAdminService.getComplaintById(id);
      setComplaint(updatedData.data || updatedData);
      toast.success("Complaint verified successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to verify complaint");
    } finally {
      setIsVerifying(false);
    }
  };

  if (loading) {
    return (
      <>
        <RoleHeader />
        <PageContainer>
          <Loader size="large" />
        </PageContainer>
      </>
    );
  }

  if (error) {
    return (
      <>
        <RoleHeader />
        <PageContainer>
          <ErrorText>{error}</ErrorText>
        </PageContainer>
      </>
    );
  }

  if (!complaint) {
    return (
      <>
        <RoleHeader />
        <PageContainer>
          <EmptyText>Complaint not found.</EmptyText>
        </PageContainer>
      </>
    );
  }

  const canAssign =
    (role === "admin" || role === "superAdmin") &&
    !complaint.assignedTo &&
    complaint.status === "pending";
  const canReassign =
    (role === "admin" || role === "superAdmin") && complaint.assignedTo;
  const isOwner =
    role === "nearby" ? complaint.citizen?._id === authUser?._id : true;
  const canEdit =
    (role === "citizen" || (role === "nearby" && isOwner)) &&
    complaint.status === "pending";
  const canDelete =
    (role === "citizen" || (role === "nearby" && isOwner)) &&
    complaint.status === "pending";
  const canProvideFeedback =
    (role === "citizen" || (role === "nearby" && isOwner)) &&
    complaint.status === "resolved";
  const canUpdateStatus =
    role === "officer" &&
    complaint.status !== "resolved" &&
    complaint.status !== "closed";
  const canVerify =
    (role === "admin" || role === "superAdmin") &&
    complaint.status === "resolved" &&
    !complaint.timeline?.some((t) => t.eventType === "verified");

  return (
    <>
      <RoleHeader />
      <PageContainer>
        <BackButton
          onClick={() => navigate(getBackPath())}
          title={getBackLabel()}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </BackButton>

        <DetailsCard>
          <TitleWithMargin>{complaint.title}</TitleWithMargin>
          {canAssign && (
            <AssignButtonWrapper>
              <ActionButton onClick={handleAssignClick}>
                <FontAwesomeIcon icon={faUserPlus} /> Assign Officer
              </ActionButton>
            </AssignButtonWrapper>
          )}

          <InfoGrid>
            <InfoItem>
              <Label>
                <FontAwesomeIcon icon={faUser} /> Citizen
              </Label>
              <Value>{complaint.citizen?.name || "N/A"}</Value>
            </InfoItem>
            <InfoItem>
              <Label>
                <FontAwesomeIcon icon={faMapMarkerAlt} /> Location
              </Label>
              <Value>{complaint.location?.address || "N/A"}</Value>
            </InfoItem>
            <InfoItem>
              <Label>
                <FontAwesomeIcon icon={faCalendar} /> Date
              </Label>
              <Value>{formatDate(complaint.createdAt)}</Value>
            </InfoItem>
            <InfoItem>
              <Label>Status</Label>
              <StatusBadge status={complaint.status} />
            </InfoItem>
            <InfoItem>
              <Label>Priority</Label>
              <PriorityBadge severity={complaint.severity} showIcon />
            </InfoItem>
            {complaint.department && (
              <InfoItem>
                <Label>Department</Label>
                <Value>{complaint.department.name}</Value>
              </InfoItem>
            )}
            {role === "officer" && complaint.dueDate && (
              <InfoItem>
                <Label>
                  <FontAwesomeIcon icon={faCalendar} /> Due Date
                </Label>
                <Value>{formatDate(complaint.dueDate)}</Value>
              </InfoItem>
            )}
          </InfoGrid>

          <Section>
            <SectionTitle>Description</SectionTitle>
            <Description>{complaint.description}</Description>
          </Section>

          {complaint.images && complaint.images.length > 0 && (
            <Section>
              <SectionTitle>Images</SectionTitle>
              <ImageGrid>
                {complaint.images.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`Complaint ${index + 1}`}
                  />
                ))}
              </ImageGrid>
            </Section>
          )}

          {canReassign && (
            <Section>
              <AssignmentHeader>
                <SectionTitle>Assignment Details</SectionTitle>
                <AssignmentActions>
                  <ReassignButton onClick={handleReassignClick}>
                    <FontAwesomeIcon icon={faSync} /> Reassign
                  </ReassignButton>
                  <EditButton onClick={handleEditAssignment}>
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </EditButton>
                </AssignmentActions>
              </AssignmentHeader>
              <InfoGrid>
                <InfoItem>
                  <Label>Officer Name</Label>
                  <Value>{complaint.assignedTo?.name || "N/A"}</Value>
                </InfoItem>
                <InfoItem>
                  <Label>Email</Label>
                  <Value>{complaint.assignedTo?.email || "N/A"}</Value>
                </InfoItem>
                <InfoItem>
                  <Label>Phone</Label>
                  <Value>{complaint.assignedTo?.phone || "N/A"}</Value>
                </InfoItem>
                {complaint.dueDate && (
                  <InfoItem>
                    <Label>Due Date</Label>
                    <Value>{formatDate(complaint.dueDate)}</Value>
                  </InfoItem>
                )}
              </InfoGrid>
            </Section>
          )}

          {complaint.resolutionDetails && (
            <Section>
              <SectionTitle>Resolution Details</SectionTitle>
              <Description>{complaint.resolutionDetails}</Description>
            </Section>
          )}

          {complaint.resolutionDate && (
            <Section>
              <SectionTitle>Resolution Date</SectionTitle>
              <Value>
                {new Date(complaint.resolutionDate).toLocaleString()}
              </Value>
            </Section>
          )}

          <ProgressTimeline
            timeline={complaint.timeline}
            progressUpdates={complaint.progressUpdates}
          />

          {canProvideFeedback && (
            <Button
              onClick={() => navigate(`/feedback/${complaint._id}`)}
              style={{ marginTop: "2rem", width: "100%" }}
            >
              Provide Feedback
            </Button>
          )}

          {canUpdateStatus && (
            <ButtonGroup style={{ marginTop: "2rem" }}>
              <ActionButton
                onClick={() =>
                  navigate(`/officer/update-status/${complaint._id}`)
                }
              >
                Update Status
              </ActionButton>
              <CompleteButton
                onClick={() =>
                  navigate(`/officer/complete-task/${complaint._id}`)
                }
              >
                Mark Complete
              </CompleteButton>
            </ButtonGroup>
          )}

          {canVerify && (
            <ActionButton
              onClick={handleVerify}
              disabled={isVerifying}
              style={{
                marginTop: "2rem",
                width: "auto",
                marginLeft: "auto",
                display: "block",
              }}
            >
              <FontAwesomeIcon
                icon={faCheckCircle}
                style={{ marginRight: "0.5rem" }}
              />
              {isVerifying ? "Verifying..." : "Verify Complaint"}
            </ActionButton>
          )}

          {(canEdit || canDelete) && (
            <ActionsSection>
              <ButtonGroup>
                {canEdit && (
                  <Button onClick={() => navigate(`/edit-complaint/${id}`)}>
                    <FontAwesomeIcon
                      icon={faEdit}
                      style={{ marginRight: "0.5rem" }}
                    />
                    Edit Complaint
                  </Button>
                )}
                {canDelete && (
                  <Button
                    variant="danger"
                    onClick={() => setIsConfirmModalOpen(true)}
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ marginRight: "0.5rem" }}
                    />
                    Delete Complaint
                  </Button>
                )}
              </ButtonGroup>
            </ActionsSection>
          )}
        </DetailsCard>

        {modalMode && (
          <AssignmentModal
            mode={modalMode}
            officers={officers}
            currentOfficer={
              modalMode === "edit"
                ? {
                    value: complaint.assignedTo._id,
                    label: complaint.assignedTo.name,
                  }
                : null
            }
            currentDueDate={
              modalMode === "edit"
                ? complaint.dueDate
                  ? complaint.dueDate.split("T")[0]
                  : new Date().toISOString().split("T")[0]
                : null
            }
            onClose={() => setModalMode(null)}
            onSubmit={handleModalSubmit}
            isLoading={isModalLoading}
          />
        )}

        <ConfirmationModal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={handleDelete}
          title="Delete Complaint"
          message="Are you sure you want to delete this complaint? This action cannot be undone."
          type="delete"
          isLoading={isDeleting}
        />
      </PageContainer>
    </>
  );
};

export default ComplaintDetailsLayout;
