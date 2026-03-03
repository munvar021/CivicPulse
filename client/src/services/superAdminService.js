import { api } from "./api";

const getSuperAdminProfile = () => {
  return api.get("/users/me");
};

const updateSuperAdminProfile = (profileData) => {
  return api.put("/users/me", profileData);
};

const getUsers = (role, department, page = 1, search = "") => {
  const params = new URLSearchParams();
  if (role) params.append("role", role);
  if (department && department !== "all")
    params.append("department", department);
  params.append("page", page);
  params.append("limit", 20);
  if (search) params.append("search", search);
  return api.get(`/users?${params.toString()}`);
};

const createUser = (userData) => {
  return api.post("/users", userData);
};

const updateUser = (id, userData) => {
  return api.put(`/users/${id}`, userData);
};

const deleteUser = (id) => {
  return api.delete(`/users/${id}`);
};

const getDepartments = (params = {}) => {
  const queryParams = new URLSearchParams();
  queryParams.append("page", params.page || 1);
  queryParams.append("limit", 20);
  if (params.search) queryParams.append("search", params.search);
  return api.get(`/departments?${queryParams.toString()}`);
};

const createDepartment = (departmentData) => {
  return api.post("/departments", departmentData);
};

const updateDepartment = (id, departmentData) => {
  return api.put(`/departments/${id}`, departmentData);
};

const deleteDepartment = (id) => {
  return api.delete(`/departments/${id}`);
};

const getZones = (params = {}) => {
  const queryParams = new URLSearchParams();
  queryParams.append("page", params.page || 1);
  queryParams.append("limit", 20);
  if (params.search) queryParams.append("search", params.search);
  return api.get(`/superadmin/zones?${queryParams.toString()}`);
};

const createZone = (zoneData) => {
  return api.post("/superadmin/zones", zoneData);
};

const updateZone = (id, zoneData) => {
  return api.put(`/superadmin/zones/${id}`, zoneData);
};

const deleteZone = (id) => {
  return api.delete(`/superadmin/zones/${id}`);
};

const getSuperAdminReports = (period) => {
  return api.get(`/superadmin/reports?period=${period}`);
};

const exportSuperAdminReports = (period) => {
  return api.get(`/superadmin/reports/export?period=${period}`, {
    responseType: "blob", // Important for downloading files
  });
};

const getSystemMonitoringData = () => {
  return api.get("/superadmin/monitoring");
};

const getSettings = () => {
  return api.get("/settings");
};

const updateSettings = (key, value) => {
  return api.put("/settings", { key, value });
};

const getCategories = () => {
  return api.get("/categories");
};

const createCategory = (name) => {
  return api.post("/categories", { name });
};

const updateCategory = (id, name) => {
  return api.put(`/categories/${id}`, { name });
};

const deleteCategory = (id) => {
  return api.delete(`/categories/${id}`);
};

const getSuperAdminDashboardData = () => {
  return api.get("/superadmin/dashboard");
};

const getAllComplaints = (filters) => {
  const params = new URLSearchParams();
  if (filters?.status && filters.status !== "all") {
    params.append("status", filters.status);
  }
  if (filters?.priority && filters.priority !== "all") {
    params.append("priority", filters.priority);
  }
  if (filters?.department && filters.department !== "all") {
    params.append("department", filters.department);
  }
  if (filters?.page) {
    params.append("page", filters.page);
  }
  return api.get(`/complaints?${params.toString()}`);
};

const getComplaintById = (id) => {
  return api.get(`/complaints/${id}`);
};

const assignComplaint = (complaintId, assignmentData) => {
  return api.put(`/complaints/${complaintId}/assign`, assignmentData);
};

const updateAssignment = (complaintId, assignmentData) => {
  return api.put(`/complaints/${complaintId}/assignment`, assignmentData);
};

const reassignComplaint = (complaintId, reassignmentData) => {
  return api.put(`/complaints/${complaintId}/reassign`, reassignmentData);
};

const verifyComplaint = (complaintId) => {
  return api.put(`/superadmin/complaints/${complaintId}/verify`);
};

const superAdminService = {
  getSuperAdminProfile,
  updateSuperAdminProfile,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getZones, // Add new functions
  createZone,
  updateZone,
  deleteZone,
  getSuperAdminReports,
  exportSuperAdminReports,
  getSystemMonitoringData,
  getSettings,
  updateSettings,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getSuperAdminDashboardData,
  getAllComplaints,
  getComplaintById,
  assignComplaint,
  updateAssignment,
  reassignComplaint,
  verifyComplaint,
};

export default superAdminService;
