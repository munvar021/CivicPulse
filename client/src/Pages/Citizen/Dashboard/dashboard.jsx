import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../context/authContext";
import { fetchCitizenDashboard } from "../../../store/slices/dashboardSlice";
import DashboardLayout from "../../../components/Layouts/DashboardLayout/dashboardLayout";
import {
  getStatsConfig,
  getQuickActionsConfig,
  getEmptyStateConfig,
} from "./dashboardConfig";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { citizen: dashboardData, loading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchCitizenDashboard());
  }, [dispatch]);

  const stats = dashboardData?.stats || { total: 0, inProgress: 0, resolved: 0, escalated: 0 };
  const recentComplaints = dashboardData?.recentComplaints?.slice(0, 5) || [];

  return (
    <DashboardLayout
      userName={user?.name || "User"}
      subtitle="Track and manage your civic complaints"
      stats={getStatsConfig(stats)}
      recentItems={recentComplaints}
      quickActions={getQuickActionsConfig()}
      loading={loading}
      error={error}
      onItemClick={(id) => navigate(`/complaint/${id}`)}
      viewAllPath="/my-complaints"
      viewAllLabel="View All Complaints"
      emptyStateConfig={getEmptyStateConfig()}
    />
  );
};

export default Dashboard;
