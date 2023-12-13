import { createSlice } from "@reduxjs/toolkit";
import { getOpenBalanceGraphData,getSellBalanceGraphData,getProfitBalanceGraphData } from "./action";
const GraphSlice = createSlice({
  name: 'graph',
  initialState: {
    loading: false,
    openBalanceGraphData: [],
    sellBalanceGraphData: [],
    profitBalanceGraphData: []
  },
  reducers: {
    // Add your regular reducers here if needed.
  },
  extraReducers: (builder) => {
    builder.addCase(getOpenBalanceGraphData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOpenBalanceGraphData.fulfilled, (state, action) => {
      state.loading = false;
      state.openBalanceGraphData = action.payload;
    });
    builder.addCase(getOpenBalanceGraphData.rejected, (state) => {
      state.loading = false;
    });


    builder.addCase(getSellBalanceGraphData.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(getSellBalanceGraphData.fulfilled, (state, action) => {
        state.loading = false;
        state.sellBalanceGraphData=action.payload
      });
      builder.addCase(getSellBalanceGraphData.rejected, (state) => {
        state.loading = false;
      });




      builder.addCase(getProfitBalanceGraphData.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(getProfitBalanceGraphData.fulfilled, (state, action) => {
        state.loading = false;
        state.profitBalanceGraphData=action.payload
      });
      builder.addCase(getProfitBalanceGraphData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { loading } = GraphSlice.actions;
export default GraphSlice.reducer;
