import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../context/authContext";
import { fetchAdminDashboard } from "../../../store/slices/dashboardSlice";
import DashboardLayout from "../../../components/Layouts/DashboardLayout/dashboardLayout";
import { getStatsConfig, getEmptyStateConfig } from "./dashboardConfig";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const {
    admin: dashboardData,
    loading,
    error,
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchAdminDashboard());
  }, [dispatch]);

  const stats = dashboardData?.stats || {
    pending: 0,
    reassigned: 0,
    inProgress: 0,
    resolved: 0,
    delayed: 0,
  };
  const recentComplaints = dashboardData?.recentComplaints || [];

  return (
    <DashboardLayout
      userName={user?.name || "Admin"}
      stats={getStatsConfig(stats)}
      recentItems={recentComplaints}
      loading={loading}
      error={error}
      onItemClick={(id) => navigate(`/admin/complaint/${id}`)}
      viewAllPath="/admin/complaints"
      viewAllLabel="View All Complaints"
      emptyStateConfig={getEmptyStateConfig()}
    />
  );
};

export default Dashboard;
