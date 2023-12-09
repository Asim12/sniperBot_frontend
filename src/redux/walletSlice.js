import { createSlice } from '@reduxjs/toolkit';

const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    wallet: '',
    private_key: '',
   loading:false
  },
  reducers: {
    setWallet: (state, action) => {
      console.log('action payload is ', action.payload);
      state.wallet = action.payload.wallet;
      state.private_key = action.payload.privake_key;  
      state.loginLoading=false

      console.log('action payload for wallet',action)
    },
    
   

    startLoading: (state) => {
      state.loading = true; // Set login loading to true when starting login operation
    },
    stopLoading: (state) => {
      state.loading = false; // Set login loading to false when stopping login operation
    },
   
  },
});

export const { setWallet, startLoading,stopLoading } = walletSlice.actions;

export default walletSlice.reducer;
