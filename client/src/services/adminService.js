import { api } from "./api";

const API_URL = "/admin";

const getAdminDashboardStats = async () => {
  const response = await api.get(`${API_URL}/dashboard/stats`);
  return response.data;
};

const getRecentComplaints = async () => {
  const response = await api.get(`${API_URL}/dashboard/recent-complaints`);
  return response.data;
};

const getComplaints = async (filters, page = 1) => {
  const params = new URLSearchParams();
  if (filters.status && filters.status !== "all") {
    params.append("status", filters.status);
  }
  if (filters.priority && filters.priority !== "all") {
    params.append("priority", filters.priority);
  }
  params.append("page", page);
  params.append("limit", 20);
  const response = await api.get(`${API_URL}/complaints?${params.toString()}`);
  return response.data;
};

const getComplaintById = async (id) => {
  const response = await api.get(`${API_URL}/complaints/${id}`);
  return response.data;
};

const getOfficers = async (params = {}) => {
  const queryParams = new URLSearchParams();
  queryParams.append("page", params.page || 1);
  queryParams.append("limit", 20);
  if (params.search) queryParams.append("search", params.search);
  const response = await api.get(
    `${API_URL}/officers?${queryParams.toString()}`,
  );
  return response.data;
};

const createOfficer = async (officerData) => {
  const response = await api.post(`${API_URL}/officers`, officerData);
  return response.data;
};

const updateOfficer = async (id, officerData) => {
  const response = await api.put(`${API_URL}/officers/${id}`, officerData);
  return response.data;
};

const deleteOfficer = async (id) => {
  const response = await api.delete(`${API_URL}/officers/${id}`);
  return response.data;
};

const getDepartments = async () => {
  const response = await api.get(`${API_URL}/departments`);
  return response.data;
};

const getEscalatedComplaints = async (page = 1) => {
  const response = await api.get(
    `${API_URL}/escalations?page=${page}&limit=20`,
  );
  return response.data;
};

const getReports = async (period) => {
  const response = await api.get(`${API_URL}/reports?period=${period}`);
  return response.data;
};

const getAdminProfile = async () => {
  const response = await api.get(`${API_URL}/me`);
  return response.data;
};

const updateAdminProfile = async (profileData) => {
  const response = await api.put(`${API_URL}/me`, profileData);
  return response.data;
};

const getAdminProfileStats = async () => {
  const response = await api.get(`${API_URL}/profile/stats`);
  return response.data;
};

const assignComplaint = async (id, assignmentData) => {
  const response = await api.put(
    `${API_URL}/complaints/${id}/assign`,
    assignmentData,
  );
  return response.data;
};

const updateDueDate = async (id, dueDate) => {
  const response = await api.put(`${API_URL}/complaints/${id}/due-date`, {
    dueDate,
  });
  return response.data;
};

const updateAssignment = async (id, assignmentData) => {
  const response = await api.put(
    `${API_URL}/complaints/${id}/assignment`,
    assignmentData,
  );
  return response.data;
};

const reassignComplaint = async (id, reassignmentData) => {
  const response = await api.put(
    `${API_URL}/complaints/${id}/reassign`,
    reassignmentData,
  );
  return response.data;
};

const verifyComplaint = async (id) => {
  const response = await api.put(`${API_URL}/complaints/${id}/verify`);
  return response.data;
};

const getDashboardData = async () => {
  const [stats, recentComplaints] = await Promise.all([
    getAdminDashboardStats(),
    getRecentComplaints(),
  ]);
  return { stats, recentComplaints };
};

const adminService = {
  getDashboardData,
  getAdminDashboardStats,
  getRecentComplaints,
  getComplaints,
  getComplaintById,
  getOfficers,
  createOfficer,
  updateOfficer,
  deleteOfficer,
  getDepartments,
  getEscalatedComplaints,
  getReports,
  getAdminProfile,
  updateAdminProfile,
  getAdminProfileStats,
  assignComplaint,
  updateDueDate,
  updateAssignment,
  reassignComplaint,
  verifyComplaint,
};

export default adminService;
