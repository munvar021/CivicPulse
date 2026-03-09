import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RoleHeader from "../../../components/Headers/roleHeader";
import Map from "../../../components/Map/map";
import Loader from "../../../components/Loaders/loader";
import StatusBadge from "../../../components/StatusBadge/statusBadge";
import PriorityBadge from "../../../components/PriorityBadge/priorityBadge";
import { useAuth } from "../../../context/authContext";
import citizenService from "../../../services/citizenService";
import {
  PageContainer,
  PageTitle,
  MapSection,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  ActionButton,
  NoData,
  ErrorText,
} from "./nearbyIssuesStyles";

const NearbyIssues = () => {
  const navigate = useNavigate();
  const [nearbyIssues, setNearbyIssues] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState("");
  const [loadingIssues, setLoadingIssues] = useState(true);
  const { user: authUser } = useAuth();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          setError(
            "Geolocation permission denied. Unable to fetch nearby issues.",
          );
          setLoadingIssues(false);
        },
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoadingIssues(false);
    }
  }, []);

  useEffect(() => {
    const getAndSetNearbyComplaints = async () => {
      if (!authUser || !userLocation) return;
      setLoadingIssues(true);
      try {
        const { data } = await citizenService.getNearbyComplaints(
          userLocation.lat,
          userLocation.lng,
          10,
        );
        setNearbyIssues(data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch nearby issues.",
        );
      } finally {
        setLoadingIssues(false);
      }
    };

    getAndSetNearbyComplaints();
  }, [authUser, userLocation]);

  if (error) {
    return (
      <>
        <RoleHeader />
        <PageContainer>
          <PageTitle>Nearby Issues</PageTitle>
          <ErrorText>{error}</ErrorText>
        </PageContainer>
      </>
    );
  }

  if (!userLocation) {
    return (
      <>
        <RoleHeader />
        <PageContainer>
          <Loader size="large" />
        </PageContainer>
      </>
    );
  }

  return (
    <>
      <RoleHeader />
      <PageContainer>
        <PageTitle>Nearby Issues</PageTitle>

        <MapSection>
          <Map
            height="400px"
            center={userLocation}
            markers={nearbyIssues.map((issue) => ({
              lat: issue.location.coordinates[1],
              lng: issue.location.coordinates[0],
              popup: `<strong>${issue.title}</strong><br/>Severity: ${issue.severity}<br/>Status: ${issue.status}`,
              onClick: () => navigate(`/nearby-complaint/${issue._id}`),
            }))}
          />
        </MapSection>

        {loadingIssues ? (
          <Loader size="large" />
        ) : nearbyIssues.length === 0 ? (
          <NoData>No nearby issues found in your area.</NoData>
        ) : (
          <Table>
            <thead>
              <TableRow>
                <TableHeader>Title</TableHeader>
                <TableHeader>Department</TableHeader>
                <TableHeader>Location</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Priority</TableHeader>
                <TableHeader>Date</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {nearbyIssues.map((issue) => (
                <TableRow key={issue._id}>
                  <TableCell>{issue.title}</TableCell>
                  <TableCell>{issue.department?.name || "N/A"}</TableCell>
                  <TableCell>{issue.location?.address || "N/A"}</TableCell>
                  <TableCell>
                    <StatusBadge status={issue.status} variant="small" />
                  </TableCell>
                  <TableCell>
                    <PriorityBadge severity={issue.severity} variant="small" />
                  </TableCell>
                  <TableCell>
                    {new Date(issue.createdAt).toLocaleDateString("en-GB")}
                  </TableCell>
                  <TableCell>
                    <ActionButton
                      onClick={() => navigate(`/nearby-complaint/${issue._id}`)}
                    >
                      View
                    </ActionButton>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        )}
      </PageContainer>
    </>
  );
};

export default NearbyIssues;
