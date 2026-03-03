import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import toast from "../../../utils/toast";
import ComplaintDetailsLayout from "../../../components/Layouts/ComplaintDetailsLayout/complaintDetailsLayout";
import RoleHeader from "../../../components/Headers/roleHeader";
import Loader from "../../../components/Loaders/loader";
import { useAuth } from "../../../context/authContext";
import citizenService from "../../../services/citizenService";
import {
  PageContainer,
  ErrorText,
  EmptyText,
} from "../../../components/Layouts/ComplaintDetailsLayout/complaintDetailsLayoutStyles";

const NearbyComplaintDetails = () => {
  const { id } = useParams();
  const { user: authUser } = useAuth();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComplaint = async () => {
      if (!authUser) return;

      try {
        setLoading(true);
        const { data } = await citizenService.getNearbyComplaintById(id);
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
  }, [id, authUser]);

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

  return (
    <ComplaintDetailsLayout
      role="nearby"
      complaint={complaint}
      backPath="/nearby-issues"
      backLabel="Back to Nearby Issues"
    />
  );
};

export default NearbyComplaintDetails;
