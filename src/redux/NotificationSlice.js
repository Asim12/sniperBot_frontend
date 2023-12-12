import { createSlice } from "@reduxjs/toolkit";
import { getNotifications, markAllasReadNotifications } from "./action";

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    loading: false,
    notifications: []
  },
  reducers: {
    // Add your regular reducers here if needed.
  },
  extraReducers: (builder) => {
    builder.addCase(getNotifications.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getNotifications.fulfilled, (state, action) => {
      state.loading = false;
      state.notifications = action.payload;
    });
    builder.addCase(getNotifications.rejected, (state) => {
      state.loading = false;
    });


    builder.addCase(markAllasReadNotifications.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(markAllasReadNotifications.fulfilled, (state, action) => {
        state.loading = false;
      });
      builder.addCase(markAllasReadNotifications.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { loading } = notificationSlice.actions;
export default notificationSlice.reducer;
