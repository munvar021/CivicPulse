import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import superAdminService from '../../services/superAdminService';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ role, department, page, search }, { rejectWithValue }) => {
    try {
      const { data } = await superAdminService.getUsers(role, department, page, search);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    totalPages: 1,
    loading: false,
    error: null,
  },
  reducers: {
    clearUsers: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.users || action.payload;
        state.totalPages = action.payload.totalPages || 1;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUsers } = usersSlice.actions;
export default usersSlice.reducer;
