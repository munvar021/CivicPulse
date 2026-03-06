import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api";

const hasStoredToken = () => {
  try {
    return Boolean(localStorage.getItem("token"));
  } catch {
    return false;
  }
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password, role }, { rejectWithValue }) => {
    try {
      const loginPaths = {
        citizen: "/citizens/login",
        officer: "/officer/login",
        admin: "/admin/login",
        superAdmin: "/superadmin/login",
      };
      const { data } = await api.post(loginPaths[role], { email, password });

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  },
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ userData, role }, { rejectWithValue }) => {
    try {
      const registerPaths = {
        citizen: "/citizens/register",
        superAdmin: "/superadmin/register",
      };
      const { data } = await api.post(registerPaths[role], userData);

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed",
      );
    }
  },
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/users/me");
      return data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message,
        status: error.response?.status,
      });
    }
  },
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("/users/logout");
      localStorage.removeItem("token");
      return null;
    } catch (error) {
      localStorage.removeItem("token");
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    checkingAuth: hasStoredToken(),
    currentAuthRequestId: null,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.checkingAuth = false;
        state.currentAuthRequestId = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.checkingAuth = false;
        state.currentAuthRequestId = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCurrentUser.pending, (state, action) => {
        state.loading = true;
        state.checkingAuth = true;
        state.currentAuthRequestId = action.meta.requestId;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        if (state.currentAuthRequestId !== action.meta.requestId) return;
        state.loading = false;
        state.user = action.payload;
        state.checkingAuth = false;
        state.currentAuthRequestId = null;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        if (state.currentAuthRequestId !== action.meta.requestId) return;
        state.loading = false;
        state.user = null;
        state.checkingAuth = false;
        state.currentAuthRequestId = null;
        if (action.payload?.status === 401 || action.payload?.status === 403) {
          localStorage.removeItem("token");
        }
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.checkingAuth = false;
        state.currentAuthRequestId = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
