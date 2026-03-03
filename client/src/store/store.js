import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import complaintsReducer from './slices/complaintsSlice';
import usersReducer from './slices/usersSlice';
import departmentsReducer from './slices/departmentsSlice';
import zonesReducer from './slices/zonesSlice';
import dashboardReducer from './slices/dashboardSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    complaints: complaintsReducer,
    users: usersReducer,
    departments: departmentsReducer,
    zones: zonesReducer,
    dashboard: dashboardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
