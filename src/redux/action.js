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
export const login = async (dispatch, email, password, router) => {
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
    console.log('login action data', response);
    console.log('login token', token);
    console.log('🚀 ~ file: action.js:18 ~ login ~ data:', data);

    // Store the token in local storage
    localStorage.setItem('token', token);
    dispatch(setUser(data));
    showToast(response?.data.message || 'Welcome!', { type: 'success' });

    router.push('/');

    return { data };
  } catch (error) {
    // toast.error('Something went wrong');
    showToast(error.response?.data.message || 'Something went wrong', { type: 'error' });

    return { error: error.message };
  } finally {
    dispatch(stopLoginLoading());
  }
};

export const registerUser = async (dispatch, firstName, lastName, email, password, router) => {
  try {
    // Make the API call to login
    console.log('zain');
    console.log('Backend URL:', 'localhost:3000');

    dispatch(startSignupLoading());

    const response = await axios.post('http://localhost:3000/api/register', {
      // Your login payload
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    });

    const { data } = response;
    console.log('signup action data', data);

    // Store the token in local storage
    dispatch(setSignupUser());
    showToast(data.message || 'User Registered', { type: 'success' });

    router.push('/login');

    return { data };
  } catch (error) {
    // toast.error('Something went wrong');
    console.log(error.response.data.message);
    showToast(error.response?.data.message || 'Something went wrong', { type: 'error' });

    return { error: error.message };
  } finally {
    dispatch(stopSignupLoading());
  }
};

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

export const getWalletDetails = async (dispatch, password) => {
  try {
    dispatch(startLoading());

    // Retrieve token from local storage
    const token = localStorage.getItem('token'); // Replace 'yourTokenKey' with the actual key you use to store the token

    // Make the API call to get wallet details
    const response = await axios.post(
      'http://localhost:3000/api/getWalletDetails',
      {
        password,
      },
      {
        headers: {
          'x-access-token': `${token}`, // Include the token in the Authorization header
        },
      }
    );

    const { data } = response;

    // Store the received wallet details in the state
    dispatch(setWallet(data));
    showToast('Authenticated!',{type:'success'})

    return { data };
  } catch (error) {
    showToast(error.response?.data.message || 'Something went wrong', { type: 'error' });
    return { error: error.message };
  } finally {
    dispatch(stopLoading());
  }
};



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