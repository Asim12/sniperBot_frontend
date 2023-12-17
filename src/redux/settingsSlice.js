import { createSlice } from "@reduxjs/toolkit";
import { getSettings,createSettings,editSettings,deleteSettings,pauseSettings,startSettings } from "./action";

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    loading: false,
    getSettingsLoading:false,
    settings: [],

  },
  reducers: {
    // Add your regular reducers here if needed.
  },
  extraReducers: (builder) => {
    builder.addCase(getSettings.pending, (state) => {
      state.loading = true;
      state.getSettingsLoading=true
    });
    builder.addCase(getSettings.fulfilled, (state, action) => {
      state.settings = action.payload;
      state.loading = false;
      state.getSettingsLoading=false

    });
    builder.addCase(getSettings.rejected, (state) => {
      state.loading = false;
    });


    builder.addCase(createSettings.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(createSettings.fulfilled, (state, action) => {
        state.loading = false;
      });
      builder.addCase(createSettings.rejected, (state) => {
        state.loading = false;
      });



      builder.addCase(editSettings.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(editSettings.fulfilled, (state, action) => {
        state.loading = false;
      });
      builder.addCase(editSettings.rejected, (state) => {
        state.loading = false;
      });




      builder.addCase(deleteSettings.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(deleteSettings.fulfilled, (state, action) => {
        state.loading = false;
      });
      builder.addCase(deleteSettings.rejected, (state) => {
        state.loading = false;
      });




      builder.addCase(pauseSettings.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(pauseSettings.fulfilled, (state, action) => {
        state.loading = false;
      });
      builder.addCase(pauseSettings.rejected, (state) => {
        state.loading = false;
      });




      builder.addCase(startSettings.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(startSettings.fulfilled, (state, action) => {
        state.loading = false;
      });
      builder.addCase(startSettings.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { loading } = settingsSlice.actions;
export default settingsSlice.reducer;
