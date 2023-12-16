import { createSlice } from '@reduxjs/toolkit';
import { login, registerUser } from './action';

const userSlice = createSlice({
  name: 'user',
  initialState: {
  
    loginLoading: false, // Separate loading state for login
    signupLoading: false, // Separate loading state for signup
    userData:[]

  },

  reducers:{

  },

  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loginLoading=true;
      console.log('user slice payload', action.payload);
      state.userData=action.payload.verify;
      state.loginLoading = false;
    });
    builder.addCase(login.rejected, (state) => {
      state.loginLoading = false;
    });

    builder.addCase(registerUser.pending, (state) => {
      state.signupLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.signupLoading = false;
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.signupLoading = false;
    });
  },
});

export const {
  signupLoading,loginLoading
} = userSlice.actions;

export default userSlice.reducer;
