import axios from 'axios';
import { showToast } from 'src/components/snackbar/toastHelper';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  setSignupUser,
  setUser,
  startLoginLoading,
  stopLoginLoading,
  startSignupLoading,
  stopSignupLoading,
} from './userSlice';
import { setWallet, startLoading, stopLoading } from './walletSlice';
import { setSoldOrders } from './orderSlice';

// auth actions
export const login = createAsyncThunk('user/login', async ({ email, password,router }, { dispatch }) => {
  try {
    // Make the API call to login
    console.log('zain');
    console.log('Backend URL:', 'localhost:3000');
    dispatch(startLoginLoading());

    const response = await axios.post('http://localhost:3000/api/login', {
      // Your login payload
      email,
      password,
    });

    const { data, token } = response.data;

    console.log('🚀 ~ file: action.js:18 ~ login ~ data:', data);

    // Store the token in local storage
    localStorage.setItem('token', token);
    showToast(response?.data.message || 'Welcome!', { type: 'success' });

    // Assuming you have access to router or you can pass it as a parameter
    router.push('/');

    return  data ;
  } catch (error) {
    showToast(error.response?.data.message || 'Something went wrong', { type: 'error' });
    return { error: error.message };
  } finally {
    dispatch(stopLoginLoading());
  }
});

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ firstName, lastName, email, password,router }, { dispatch }) => {
    try {
      dispatch(startSignupLoading());

      const response = await axios.post('http://localhost:3000/api/register', {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });

      const { data } = response;
      showToast(data.message || 'User Registered', { type: 'success' });
      router.push('/login')

      return  data ;
    } catch (error) {
      console.error(error.response?.data.message || 'Something went wrong');
      showToast(error.response?.data.message || 'Something went wrong', { type: 'error' });

      throw error; // Re-throw the error to mark the thunk as rejected
    } finally {
      dispatch(stopSignupLoading());
    }
  }
);

export const logoutUser = async (dispatch, router) => {
  try {
    // Make the API call to login
    const data = {
      verify: {
        first_name: '',
        last_name: '',
        email: '',
        role: '',
      },
    };

    // Store the token in local storage
    localStorage.removeItem('token');
    dispatch(setUser(data));
    router.push('/login');

    return { data };
  } catch (error) {
    // toast.error('Something went wrong');
    console.log('erro from logout', error);
    return { error: error.message };
  }
};

// wallet actions

export const getWalletDetails = createAsyncThunk('wallet/getWalletDetails', async (password, { dispatch }) => {
  try {
    dispatch(startLoading());

    // Retrieve token from local storage
    const token = localStorage.getItem('token');

    // Make the API call to get wallet details
    const response = await axios.post(
      'http://localhost:3000/api/getWalletDetails',
      { password },
      {
        headers: {
          'x-access-token': `${token}`,
        },
      }
    );

    if(response){

      const { data } = response;
      
      
          console.log('response wallet',data)
      
          // Dispatch the successful action
          showToast('Authenticated!', { type: 'success' });
      
          return data ;
    }
  } catch (error) {
    // Dispatch the failure action
    showToast(error.response?.data.message || 'Something went wrong', { type: 'error' });
    return { error: error.message };
  } finally {
    dispatch(stopLoading());
  }
});


// sold order action


export const getSoldOrders = createAsyncThunk(
  'soldOrders/fetchSoldOrders',
  async ({ limit, pageNumber }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading());

      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3000/api/getSoldOrder',
        { limit, page_number: pageNumber },
        {
          headers: {
            'x-access-token': `${token}`,
          },
        }
      );

      const { data } = response;
      showToast('Orders retrieved!', { type: 'success' });

      return data.sold_order;
    } catch (error) {
      showToast(error.response?.data.message || 'Something went wrong', { type: 'error' });
      return rejectWithValue(error.response?.data.message || 'Something went wrong');
    } finally {
      dispatch(stopLoading());
    }
  }
);


// buy order actions


export const getBuyOrders = createAsyncThunk(
  'buyOrders/fetchBuyOrders',
  async ({ limit, pageNumber }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading());

      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3000/api/getBuyOrder',
        { limit, page_number: pageNumber },
        {
          headers: {
            'x-access-token': `${token}`,
          },
        }
      );

      const { data } = response;
      showToast('Orders retrieved!', { type: 'success' });

      return data.buy_order;
    } catch (error) {
      showToast(error.response?.data.message || 'Something went wrong', { type: 'error' });
      return rejectWithValue(error.response?.data.message || 'Something went wrong');
    } finally {
      dispatch(stopLoading());
    }
  }
);