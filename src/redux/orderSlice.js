import { createSlice } from "@reduxjs/toolkit";
import { getSoldOrders,getBuyOrders } from "./action";
const orderSlice = createSlice({
    name: 'orders',
    initialState: {
      soldOrdersLoading: false,
      buyOrdersLoading:false,
      soldOrders: [],
      buyOrders:[]
    },
    reducers: {
    

     
      startLoading: (state) => {
        state.loading = true;
      },
      stopLoading: (state) => {
        state.loading = false;
      },
    },
    extraReducers: (builder) => {
      builder.addCase(getSoldOrders.pending, (state) => {
        state.soldOrdersLoading = true;
      });
      builder.addCase(getSoldOrders.fulfilled, (state, action) => {
        state.soldOrdersLoading = false;
        state.soldOrders = action.payload;
      });
      builder.addCase(getSoldOrders.rejected, (state) => {
        state.soldOrdersLoading = false;
      });


      builder.addCase(getBuyOrders.pending, (state) => {
        state.buyOrdersLoading = true;
      });
      builder.addCase(getBuyOrders.fulfilled, (state, action) => {
        state.buyOrdersLoading = false;
        state.buyOrders = action.payload;
      });
      builder.addCase(getBuyOrders.rejected, (state) => {
        state.buyOrdersLoading = false;
      });
    },
  });
  
  export const { setSoldOrders, startLoading, stopLoading } = orderSlice.actions;
  
  export default orderSlice.reducer;