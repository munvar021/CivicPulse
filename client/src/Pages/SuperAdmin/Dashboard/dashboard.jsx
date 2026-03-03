import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../context/authContext";
import { fetchSuperAdminDashboard } from "../../../store/slices/dashboardSlice";
import DashboardLayout from "../../../components/Layouts/DashboardLayout/dashboardLayout";
import { getStatsConfig, getEmptyStateConfig } from "./dashboardConfig";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { superAdmin: dashboardData, loading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchSuperAdminDashboard());
  }, [dispatch]);

  const stats = dashboardData?.stats || {};
  const recentComplaints = dashboardData?.recentComplaints || [];

  return (
    <DashboardLayout
      userName={user?.name || "Super Admin"}
      stats={getStatsConfig(stats)}
      recentItems={recentComplaints}
      loading={loading}
      error={error}
      onItemClick={(id) => navigate(`/superadmin/complaint/${id}`)}
      viewAllPath="/superadmin/complaints"
      viewAllLabel="View All Complaints"
      emptyStateConfig={getEmptyStateConfig()}
    />
  );
};

export default Dashboard;
