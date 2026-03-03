import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faStar,
  faComments,
  faUserCheck,
  faExchangeAlt,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import Loader from "../../../components/Loaders/loader";
import RoleHeader from "../../../components/Headers/roleHeader";
import StatCard from "../../../components/StatCard/statCard";
import Table from "../../../components/Table/table";
import Pagination from "../../../components/Pagination/pagination";
import Filter from "../../../components/Filter/filter";
import officerService from "../../../services/officerService";
import {
  PageContainer,
  PageTitle,
  StatsGrid,
  StatusBadge,
  ReassignmentInfo,
  ViewButton,
  TableSection,
  CompactReassignmentInfo,
  ErrorText,
  StarIcon,
} from "./workHistoryStyles";

const WorkHistory = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    completed: 0,
    avgRating: 0,
    totalFeedback: 0,
  });
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [officerProfile, setOfficerProfile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchOfficerWorkHistory = async () => {
      try {
        setLoading(true);
        const profileData = await officerService.getOfficerProfile();
        setOfficerProfile(profileData);
        const {
          stats: fetchedStats,
          history: fetchedHistory,
          totalPages: pages,
        } = await officerService.getOfficerWorkHistory(
          currentPage,
          statusFilter,
        );
        setStats(fetchedStats);
        setHistory(fetchedHistory);
        setTotalPages(pages || 1);
      } catch (err) {
        setError("Failed to load work history data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOfficerWorkHistory();
  }, [currentPage, statusFilter]);

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

  return (
    <>
      <RoleHeader />
      <PageContainer>
        <PageTitle>Work History</PageTitle>

        <StatsGrid>
          <StatCard
            label="Completed Tasks"
            value={stats.completed}
            icon={<FontAwesomeIcon icon={faCheckCircle} />}
            color="#10b981"
          />
          <StatCard
            label="Average Rating"
            value={stats.avgRating}
            icon={<FontAwesomeIcon icon={faStar} />}
            color="#f59e0b"
          />
          <StatCard
            label="Feedback Received"
            value={stats.totalFeedback}
            icon={<FontAwesomeIcon icon={faComments} />}
            color="#667eea"
          />
        </StatsGrid>

        <TableSection>
          <Filter
            filters={[
              {
                label: "Status",
                value: statusFilter,
                onChange: (option) => {
                  setStatusFilter(option.value);
                  setCurrentPage(1);
                },
                options: [
                  { value: "all", label: "All Status" },
                  { value: "current", label: "Current" },
                  { value: "completed", label: "Completed" },
                  { value: "reassigned", label: "Reassigned" },
                ],
                isSearchable: false,
              },
            ]}
          />
          <Table
            columns={[
              {
                key: "title",
                label: "Complaint Title",
                width: "25%",
                render: (value) => <strong>{value}</strong>,
              },
              {
                key: "category",
                label: "Category",
                width: "15%",
              },
              {
                key: "status",
                label: "Status",
                width: "15%",
                render: (value, row) => {
                  const isCurrentlyAssigned =
                    officerProfile &&
                    row.assignedTo &&
                    row.assignedTo._id === officerProfile._id;
                  const isReassigned =
                    value === "reassigned" && !isCurrentlyAssigned;
                  const isCompleted =
                    value === "resolved" || value === "closed";

                  return (
                    <StatusBadge
                      status={
                        isReassigned
                          ? "reassigned"
                          : isCompleted
                            ? "completed"
                            : "current"
                      }
                    >
                      <FontAwesomeIcon
                        icon={
                          isReassigned
                            ? faExchangeAlt
                            : isCompleted
                              ? faCheckCircle
                              : faUserCheck
                        }
                      />
                      {isReassigned
                        ? "Reassigned"
                        : isCompleted
                          ? "Completed"
                          : "Current"}
                    </StatusBadge>
                  );
                },
              },
              {
                key: "assignedTo",
                label: "Assigned To",
                width: "15%",
                render: (value, row) => {
                  if (!value) return "Unassigned";

                  const isCurrentlyAssigned =
                    officerProfile && value._id === officerProfile._id;
                  const isReassigned =
                    row.status === "reassigned" && !isCurrentlyAssigned;

                  if (isReassigned) {
                    return (
                      <CompactReassignmentInfo>
                        <FontAwesomeIcon icon={faExchangeAlt} />
                        {value.name}
                      </CompactReassignmentInfo>
                    );
                  }
                  return isCurrentlyAssigned ? "You" : value.name;
                },
              },
              {
                key: "rating",
                label: "Rating",
                width: "10%",
                render: (value) =>
                  value ? (
                    <span>
                      {value}/5 <StarIcon icon={faStar} />
                    </span>
                  ) : (
                    "N/A"
                  ),
              },
              {
                key: "completedDate",
                label: "Date",
                width: "12%",
                render: (value) => new Date(value).toLocaleDateString("en-GB"),
              },
              {
                key: "actions",
                label: "Actions",
                width: "8%",
                render: (_, row) => (
                  <ViewButton
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/officer/task/${row._id}`);
                    }}
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </ViewButton>
                ),
              },
            ]}
            data={history}
            emptyMessage="No work history found."
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </TableSection>
      </PageContainer>
    </>
  );
};

export default WorkHistory;
