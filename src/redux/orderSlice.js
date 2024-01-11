import { createSlice } from "@reduxjs/toolkit";
import { getSoldOrders,getBuyOrders,getCustomOrders,addCustomOrders,soldManual,getNewOrders } from "./action";
const orderSlice = createSlice({
    name: 'orders',
    initialState: {
      soldOrdersLoading: false,
      buyOrdersLoading:false,
      customOrdersLoading:false,
      addOrderLoading:false,
      newOrdersLoading:false,
      soldOrders: [],
      buyOrders:[],
      customOrders:[],
      soldOrders:[],
      newOrders:[],
      soldManual:[],
      soldOrderCount:0,
      newOrderCount:0,
      buyOrderCount:0,
      customOrderCount:0,
      soldManualLoading:false
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
        state.soldOrders = action.payload.sold_order;
        state.soldOrderCount=action.payload.count
        console.log('action for sold order',action)
      });
      builder.addCase(getSoldOrders.rejected, (state) => {
        state.soldOrdersLoading = false;
      });


      builder.addCase(getBuyOrders.pending, (state) => {
        state.buyOrdersLoading = true;
      });
      builder.addCase(getBuyOrders.fulfilled, (state, action) => {
        state.buyOrdersLoading = false;
        state.buyOrders = action.payload.buy_order;
        state.buyOrderCount=action.payload.count
      });
      builder.addCase(getBuyOrders.rejected, (state) => {
        state.buyOrdersLoading = false;
      });





      builder.addCase(getNewOrders.pending, (state) => {
        state.newOrdersLoading = true;
      });
      builder.addCase(getNewOrders.fulfilled, (state, action) => {

        state.newOrdersLoading = false;
        state.newOrders = action.payload.new_order;
        state.newOrderCount=action.payload.count
      });
      builder.addCase(getNewOrders.rejected, (state) => {
        state.newOrdersLoading = false;
      });



      builder.addCase(getCustomOrders.pending, (state) => {
        state.customOrdersLoading = true;
      });
      builder.addCase(getCustomOrders.fulfilled, (state, action) => {
        state.customOrdersLoading = false;
        state.customOrders = action.payload.custom_orders;
        state.customOrderCount=action.payload.count
      });
      builder.addCase(getCustomOrders.rejected, (state) => {
        state.customOrdersLoading = false;
      });




      builder.addCase(addCustomOrders.pending, (state) => {
        state.customOrdersLoading = true;
      });
      builder.addCase(addCustomOrders.fulfilled, (state, action) => {
        state.customOrdersLoading = false;
      });
      builder.addCase(addCustomOrders.rejected, (state) => {
        state.customOrdersLoading = false;
      });




      
      builder.addCase(soldManual.pending, (state) => {
        state.soldManualLoading = true;
      });
      builder.addCase(soldManual.fulfilled, (state, action) => {
        state.soldManual=action.payload
        state.soldManualLoading = false;
      });
      builder.addCase(soldManual.rejected, (state) => {
        state.soldManualLoading = false;
      });
    },
  });
  
  export const { setSoldOrders, startLoading, stopLoading,customOrdersLoading,soldManualLoading } = orderSlice.actions;
  
  export default orderSlice.reducer;