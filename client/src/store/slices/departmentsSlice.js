import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import superAdminService from '../../services/superAdminService';

export const fetchDepartments = createAsyncThunk(
  'departments/fetchDepartments',
  async (params = {}, { rejectWithValue }) => {
    try {
      const { data } = await superAdminService.getDepartments(params);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const departmentsSlice = createSlice({
  name: 'departments',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearDepartments: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.departments || action.payload;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDepartments } = departmentsSlice.actions;
export default departmentsSlice.reducer;
