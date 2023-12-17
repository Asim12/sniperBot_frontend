import { createSlice } from '@reduxjs/toolkit';
import { getWalletDetails } from './action';

const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    wallet: '',
    private_key: '',
    loading: false,
  },
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    resetWalletState:(state)=>{
      state.wallet='';
      state.private_key='';
      state.loading=false
    }
  },
  // Use 'builder' instead of 'reducers' in createSlice for extraReducers
  extraReducers: (builder) => {
    builder
      .addCase(getWalletDetails.pending, (state) => {
        // Handle pending state if needed
        state.loading=true
      })
      .addCase(getWalletDetails.fulfilled, (state, action) => {
        // Automatically handle fulfilled state
        // 'action.payload' contains the result of the asynchronous operation
        state.loading=false;
        console.log('action.payload is ',action.payload)
        state.wallet=action.payload.wallet;
        state.private_key=action.payload.privake_key

         
      })
      .addCase(getWalletDetails.rejected, (state, action) => {
        // Automatically handle rejected state
        // 'action.error' contains the error message
        state.loading=false
      });
  },
});

export const { setWallet, startLoading, stopLoading,resetWalletState } = walletSlice.actions;

export default walletSlice.reducer;
