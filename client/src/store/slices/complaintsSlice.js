import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const fetchComplaints = createAsyncThunk(
  "complaints/fetchComplaints",
  async (filters = {}, { rejectWithValue, getState }) => {
    try {
      const params = new URLSearchParams();
      if (filters.status && filters.status !== "all")
        params.append("status", filters.status);
      if (filters.priority && filters.priority !== "all")
        params.append("priority", filters.priority);
      if (filters.department && filters.department !== "all")
        params.append("department", filters.department);
      if (filters.page) params.append("page", filters.page);

      // Determine endpoint based on user role
      const userRole = filters.role || getState().auth?.user?.role;
      let endpoint = "/complaints/my"; // Default for citizens

      if (userRole === "admin") {
        endpoint = "/admin/complaints";
      } else if (userRole === "superAdmin") {
        endpoint = "/complaints";
      }

      const { data } = await api.get(`${endpoint}?${params.toString()}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const fetchComplaintById = createAsyncThunk(
  "complaints/fetchComplaintById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/complaints/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

const complaintsSlice = createSlice({
  name: "complaints",
  initialState: {
    list: [],
    currentComplaint: null,
    totalPages: 1,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentComplaint: (state) => {
      state.currentComplaint = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComplaints.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComplaints.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.complaints || action.payload;
        state.totalPages = action.payload.totalPages || 1;
      })
      .addCase(fetchComplaints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchComplaintById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchComplaintById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentComplaint = action.payload;
      })
      .addCase(fetchComplaintById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentComplaint } = complaintsSlice.actions;
export default complaintsSlice.reducer;
