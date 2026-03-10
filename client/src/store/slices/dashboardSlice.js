import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import citizenService from "../../services/citizenService";
import officerService from "../../services/officerService";
import adminService from "../../services/adminService";
import superAdminService from "../../services/superAdminService";

export const fetchCitizenDashboard = createAsyncThunk(
  "dashboard/fetchCitizenDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await citizenService.getDashboardData();
      return { role: "citizen", data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const fetchOfficerDashboard = createAsyncThunk(
  "dashboard/fetchOfficerDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const data = await officerService.getDashboardData();
      return { role: "officer", data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const fetchAdminDashboard = createAsyncThunk(
  "dashboard/fetchAdminDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const data = await adminService.getDashboardData();
      return { role: "admin", data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const fetchSuperAdminDashboard = createAsyncThunk(
  "dashboard/fetchSuperAdminDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await superAdminService.getSuperAdminDashboardData();
      return { role: "superAdmin", data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    citizen: null,
    officer: null,
    admin: null,
    superAdmin: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearDashboard: (state, action) => {
      if (action.payload) {
        state[action.payload] = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCitizenDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCitizenDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.citizen = action.payload.data;
      })
      .addCase(fetchCitizenDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOfficerDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOfficerDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.officer = action.payload.data;
      })
      .addCase(fetchOfficerDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAdminDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload.data;
      })
      .addCase(fetchAdminDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSuperAdminDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuperAdminDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.superAdmin = action.payload.data;
      })
      .addCase(fetchSuperAdminDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;
