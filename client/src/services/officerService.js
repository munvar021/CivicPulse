import { api } from "./api";

const API_URL = "/officer";

const getOfficerDashboardStats = async () => {
  const response = await api.get(`${API_URL}/dashboard/stats`);
  return response.data;
};

const getOfficerActiveTasks = async () => {
  const response = await api.get(`${API_URL}/dashboard/tasks`);
  return response.data;
};

const getOfficerProfile = async () => {
  const response = await api.get(`${API_URL}/profile`);
  return response.data;
};

const updateOfficerProfile = async (profileData) => {
  const response = await api.put(`${API_URL}/profile`, profileData);
  return response.data;
};

const getOfficerWorkHistory = async (page = 1, status = "all") => {
  const params = { page, limit: 20 };
  if (status !== "all") params.status = status;
  const response = await api.get(`${API_URL}/work-history`, { params });
  return response.data;
};

const getOfficerAssignedTasks = async (
  status = "all",
  page = 1,
  search = "",
) => {
  const params = { page, limit: 20 };
  if (status !== "all") params.status = status;
  if (search) params.search = search;
  const response = await api.get(`${API_URL}/assigned-tasks`, { params });
  return response.data;
};

const getTaskById = async (id) => {
  const response = await api.get(`${API_URL}/task/${id}`);
  return response.data;
};

const updateTaskProgress = async (id, data) => {
  const response = await api.post(`${API_URL}/task/${id}/progress`, data);
  return response.data;
};

const officerService = {
  getOfficerDashboardStats,
  getOfficerActiveTasks,
  getOfficerProfile,
  updateOfficerProfile,
  getOfficerWorkHistory,
  getOfficerAssignedTasks,
  getTaskById,
  updateTaskProgress,
};

export default officerService;
