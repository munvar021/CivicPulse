import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../context/authContext";
import { fetchOfficerDashboard } from "../../../store/slices/dashboardSlice";
import DashboardLayout from "../../../components/Layouts/DashboardLayout/dashboardLayout";
import { getStatsConfig, getEmptyStateConfig } from "./dashboardConfig";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { officer: dashboardData, loading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchOfficerDashboard());
  }, [dispatch]);

  const stats = dashboardData?.stats || { total: 0, inProgress: 0, completed: 0, blocked: 0 };
  const activeTasks = dashboardData?.activeTasks || [];

  return (
    <DashboardLayout
      userName={user?.name || "Officer"}
      stats={getStatsConfig(stats)}
      recentItems={activeTasks}
      loading={loading}
      error={error}
      onItemClick={(id) => navigate(`/officer/task/${id}`)}
      viewAllPath="/officer/assigned-tasks"
      viewAllLabel="View All Tasks"
      emptyStateConfig={getEmptyStateConfig()}
    />
  );
};

export default Dashboard;
