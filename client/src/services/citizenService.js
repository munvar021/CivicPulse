import { api } from "./api";

const createComplaint = (complaintData) => {
  return api.post("/complaints", complaintData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getMyComplaints = (filters = {}, page = 1) => {
  const params = new URLSearchParams();
  params.append("page", page);
  params.append("limit", 20);
  for (const key in filters) {
    if (filters[key]) {
      params.append(key, filters[key]);
    }
  }
  return api.get(`/complaints/my?${params.toString()}`);
};

const getComplaintById = (id) => {
  return api.get(`/complaints/${id}`);
};

const getNearbyComplaints = (latitude, longitude, radius) => {
  const params = new URLSearchParams();
  if (latitude) params.append("latitude", latitude);
  if (longitude) params.append("longitude", longitude);
  if (radius) params.append("radius", radius);
  return api.get(`/complaints/nearby?${params.toString()}`);
};

const submitFeedback = (id, feedbackData) => {
  return api.post(`/complaints/${id}/feedback`, feedbackData);
};

const reopenComplaint = (id) => {
  return api.put(`/complaints/${id}/reopen`);
};

const updateComplaint = (id, complaintData) => {
  return api.put(`/complaints/${id}`, complaintData);
};

const deleteComplaint = (id) => {
  return api.delete(`/complaints/${id}`);
};

const getNearbyComplaintById = (id) => {
  return api.get(`/complaints/nearby/${id}`);
};

const getCitizenDashboardData = () => {
  return api.get("/citizens/dashboard");
};

const getCitizenProfile = () => {
  return api.get("/citizens/profile");
};

const updateCitizenProfile = (profileData) => {
  return api.put("/citizens/profile", profileData);
};

const citizenService = {
  createComplaint,
  getMyComplaints,
  getComplaintById,
  getNearbyComplaints,
  getNearbyComplaintById,
  submitFeedback,
  reopenComplaint,
  updateComplaint,
  deleteComplaint,
  getCitizenDashboardData,
  getCitizenProfile,
  updateCitizenProfile,
};

export default citizenService;
