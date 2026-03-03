import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import superAdminService from '../../services/superAdminService';

export const fetchZones = createAsyncThunk(
  'zones/fetchZones',
  async (params = {}, { rejectWithValue }) => {
    try {
      const { data } = await superAdminService.getZones(params);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const zonesSlice = createSlice({
  name: 'zones',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearZones: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchZones.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchZones.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.zones || action.payload;
      })
      .addCase(fetchZones.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearZones } = zonesSlice.actions;
export default zonesSlice.reducer;
