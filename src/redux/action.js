import axios from 'axios';
import { showToast } from 'src/components/snackbar/toastHelper';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { setWallet, startLoading, stopLoading, resetWalletState } from './walletSlice';
import { customOrdersLoading, setSoldOrders } from './orderSlice';

// auth actions
export const login = createAsyncThunk(
  'user/login',
  async ({ email, password, router }, { dispatch }) => {
    try {
      // Make the API call to login
      console.log('zain');
      console.log('Backend URL:', 'localhost:3000');

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

      return data;
    } catch (error) {
      showToast(error.response?.data.message || 'Something went wrong', { type: 'error' });
      return { error: error.message };
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ firstName, lastName, email, password, router }, { dispatch }) => {
    try {
      const response = await axios.post('http://localhost:3000/api/register', {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });

      const { data } = response;
      showToast(data.message || 'User Registered', { type: 'success' });
      router.push('/login');

      return data;
    } catch (error) {
      console.error(error.response?.data.message || 'Something went wrong');
      showToast(error.response?.data.message || 'Something went wrong', { type: 'error' });

      throw error; // Re-throw the error to mark the thunk as rejected
    }
  }
);

export const logoutUser = async (dispatch, router) => {
  try {
    // Make the API call to login

    // Store the token in local storage
    localStorage.removeItem('token');
    router.push('/login');
    return;
  } catch (error) {
    // toast.error('Something went wrong');
    console.log('erro from logout', error);
    return { error: error.message };
  }
};

// wallet actions

export const getWalletDetails = createAsyncThunk(
  'wallet/getWalletDetails',
  async (password, { dispatch }) => {
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

      if (response) {
        const { data } = response;

        console.log('response wallet', data);

        // Dispatch the successful action
        showToast('Authenticated!', { type: 'success' });

        return data;
      }
    } catch (error) {
      // Dispatch the failure action
      showToast(error.response?.data.message || 'Something went wrong', { type: 'error' });
      return { error: error.message };
    } finally {
      dispatch(stopLoading());
    }
  }
);

export const resetWalletDetails = async (dispatch) => {
  try {
    // Make the API call to login

    dispatch(resetWalletState());
  } catch (error) {
    console.log(error);
    showToast('Something went wrong in wallet details information reset', { type: 'error' });
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

      if(data?.sold_order?.length===0){
        showToast('No orders added yet!', { type: 'error' });

      }else{

        showToast('Orders retrieved!', { type: 'success' });
      }

      return data;
    } catch (error) {
      showToast(error.response?.data.message || 'Something went wrong', { type: 'error' });
      return rejectWithValue(error.response?.data.message || 'Something went wrong');
    } finally {
      dispatch(stopLoading());
    }
  }
);




//new orders

export const getNewOrders = createAsyncThunk(
  'newOrders/fetchNewOrders',
  async ({ limit, pageNumber }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading());

      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3000/api/getNewOrders',
        { limit, page_number: pageNumber },
        {
          headers: {
            'x-access-token': `${token}`,
          },
        }
      );

      const { data } = response;
      console.log("🚀 ~ file new orders: action.js:197 ~ data:", data)

      if(data?.new_order?.length===0){
        showToast('No orders added yet!', { type: 'error' });

      }else{

        showToast('Orders retrieved!', { type: 'success' });
      }

      return data;
    } catch (error) {

      showToast(error.response?.data.message || 'Something went wrong', { type: 'error' });
      return rejectWithValue(error.response?.data.message || 'Something went wrong');
    } finally {
      dispatch(stopLoading());
    }
  }
);



export const sellOrders = createAsyncThunk(
  'sellOrder/postSellOrders',
  async ({ order_id }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading());

      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3000/api/soldManual',
        { order_id },
        {
          headers: {
            'x-access-token': `${token}`,
          },
        }
      );

      const { data } = response;

      if(data?.sold_order?.length===0){
        showToast('No orders added yet!', { type: 'error' });

      }else{

        showToast('Orders retrieved!', { type: 'success' });
      }

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

      if(data?.buy_order?.length===0){
        showToast('No orders added yet!', { type: 'error' });

      }else{

        showToast('Orders retrieved!', { type: 'success' });
      }

      return data;
    } catch (error) {
      showToast(error.response?.data.message || 'Something went wrong', { type: 'error' });
      return rejectWithValue(error.response?.data.message || 'Something went wrong');
    } finally {
      dispatch(stopLoading());
    }
  }
);

// custom order actions

export const getCustomOrders = createAsyncThunk(
  'customOrders/fetchCustomOrders',
  async ({ limit, pageNumber }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading());

      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3000/api/getCustomOrder',
        { limit, page_number: pageNumber },
        {
          headers: {
            'x-access-token': `${token}`,
          },
        }
      );

      const { data } = response;

      if(data?.custom_orders?.length===0){
        showToast('No Orders added yet!', { type: 'error' });

      }else{

        showToast('Orders retrieved!', { type: 'success' });
      }

      return data;
    } catch (error) {
      showToast(error.response?.data.message || 'Something went wrong', { type: 'error' });
      return rejectWithValue(error.response?.data.message || 'Something went wrong');
    } finally {
      dispatch(stopLoading());
    }
  }
);

export const addCustomOrders = createAsyncThunk(
  'addCustomOrders/newCustomOrders',
  async ({ contract_address }, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3000/api/addCustomContracts',
        { contract_address },
        {
          headers: {
            'x-access-token': `${token}`,
          },
        }
      );

      const { data } = response;
      showToast(data.Message || 'Order Added!', { type: 'success' });

      return data;
    } catch (error) {
      console.log('add order err', error);
      showToast(error.response?.data?.Message || 'Something went wrong', { type: 'error' });
      return rejectWithValue(error?.response?.data?.Message || 'Something went wrong');
    }
  }
);



export const soldManual = createAsyncThunk(
  'addsoldManual/newSoldManual',
  async ({ order_id }, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3000/api/soldManual',
        { order_id },
        {
          headers: {
            'x-access-token': `${token}`,
          },
        }
      );

      const { data } = response;
      showToast(data.Message || 'Order Sold !', { type: 'success' });

      return data;
    } catch (error) {
      console.log('add order err', error);
      showToast(error.response?.data?.Message || 'Something went wrong', { type: 'error' });
      return rejectWithValue(error?.response?.data?.Message || 'Something went wrong');
    }
  }
);

// notification actions

export const getNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token'); // Assuming your user slice has a 'token' field
      const response = await axios.get('http://localhost:3000/api/getNotifications', {
        headers: {
          'x-access-token': token,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error in getNotifications action:', error);
      return rejectWithValue(error.response?.data.message || 'Something went wrong');
    }
  }
);

export const markAllasReadNotifications = createAsyncThunk(
  'markAllRead/fetchMarkedNotifications',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token'); // Assuming your user slice has a 'token' field
      const response = await axios.get('http://localhost:3000/api/markAllAsRead', {
        headers: {
          'x-access-token': token,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error in getNotifications action:', error);
      return rejectWithValue(error.response?.data.message || 'Something went wrong');
    }
  }
);

// graph actions

export const getOpenBalanceGraphData = createAsyncThunk(
  'openbalancegraph/fetchopenbalancegraph',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token'); // Assuming your user slice has a 'token' field
      const response = await axios.get('http://localhost:3000/api/openBalanceGraphYearly', {
        headers: {
          'x-access-token': token,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || 'Something went wrong');
    }
  }
);

export const getSellBalanceGraphData = createAsyncThunk(
  'setllbalancegraph/fetchsellbalancegraph',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token'); // Assuming your user slice has a 'token' field
      const response = await axios.get('http://localhost:3000/api/sellBalanceGraphYearly', {
        headers: {
          'x-access-token': token,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || 'Something went wrong');
    }
  }
);

export const getProfitBalanceGraphData = createAsyncThunk(
  'profitbalancegraph/fetchprofitbalancegraph',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token'); // Assuming your user slice has a 'token' field
      const response = await axios.get('http://localhost:3000/api/profitGraphYearly', {
        headers: {
          'x-access-token': token,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || 'Something went wrong');
    }
  }
);

// settings

export const getSettings = createAsyncThunk(
  'getSettings/fetchgetsettings',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token'); // Assuming your user slice has a 'token' field
      const response = await axios.get('http://localhost:3000/api/getSetting', {
        headers: {
          'x-access-token': token,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || 'Something went wrong');
    }
  }
);

export const createSettings = createAsyncThunk(
  'settings/createSettings',
  async ({buy_amount_dollar, profit_percentage}, { dispatch }) => {
    try {
      // Retrieve token from local storage
      const token = localStorage.getItem('token');

      // Make the API call to get wallet details
      const response = await axios.post(
        'http://localhost:3000/api/createSetting',
        { buy_amount_dollar, profit_percentage },
        {
          headers: {
            'x-access-token': `${token}`,
          },
        }
      );

      if (response) {
        const { data } = response;

        // Dispatch the successful action
        showToast('Trade Settings Created!', { type: 'success' });

        return data;
      }
    } catch (error) {
      // Dispatch the failure action
      showToast(error.response?.data.message || 'Something went wrong', { type: 'error' });
      return { error: error.message };
    }
  }
);

export const editSettings = createAsyncThunk(
  'editSettings/postEditSettings',
  async ({ trade_setting_id, buy_amount_dollar, profit_percentage }, { dispatch }) => {
    try {
      // Retrieve token from local storage
      const token = localStorage.getItem('token');

      // Make the API call to get wallet details
      const response = await axios.post(
        'http://localhost:3000/api/editSetting',
        { trade_setting_id, buy_amount_dollar, profit_percentage },
        {
          headers: {
            'x-access-token': `${token}`,
          },
        }
      );

      if (response) {
        const { data } = response;

        // Dispatch the successful action
        showToast('Trade Settings Edited!', { type: 'success' });
        dispatch(getSettings());

        return data;
      }
    } catch (error) {
      // Dispatch the failure action
      console.log(error);
      showToast(error.response?.data.message || 'Something went wrong', { type: 'error' });
      return { error: error.message };
    }
  }
);

export const deleteSettings = createAsyncThunk(
  'deleteSettings/postRemoveSettings',
  async ({trade_setting_id, user_id}, { dispatch }) => {
    try {
      // Retrieve token from local storage
      const token = localStorage.getItem('token');

      console.log('deleting')
      // Make the API call to get wallet details
      const response = await axios.post(
        'http://localhost:3000/api/deleteSetting',
        { trade_setting_id, user_id },
        {
          headers: {
            'x-access-token': `${token}`,
          },
        }
      );

      if (response) {
        const { data } = response;

        // Dispatch the successful action
        showToast('Trade Settings Deleted!', { type: 'success' });

        return data;
      }
      console.log('deleting')

    } catch (error) {
      // Dispatch the failure action
      console.log(error)
      showToast(error.response?.data.message || 'Something went wrong', { type: 'error' });
      return { error: error.message };
    }
  }
);

export const pauseSettings = createAsyncThunk(
  'pauseSettings/postPauseSettings',
  async (trade_setting_id, { dispatch }) => {
    try {
      // Retrieve token from local storage
      const token = localStorage.getItem('token');

      // Make the API call to get wallet details
      const response = await axios.post(
        'http://localhost:3000/api/pauseTrading',
        { trade_setting_id },
        {
          headers: {
            'x-access-token': `${token}`,
          },
        }
      );

      if (response) {
        const { data } = response;

        // Dispatch the successful action
        showToast('Trade Settings Paused!', { type: 'success' });
        dispatch(getSettings());

        return data;
      }
    } catch (error) {
      // Dispatch the failure action
      showToast(error.response?.data.message || 'Something went wrong', { type: 'error' });
      return { error: error.message };
    }
  }
);

export const startSettings = createAsyncThunk(
  'resumeSettings/postResumeSettings',
  async (trade_setting_id, { dispatch }) => {
    try {
      // Retrieve token from local storage
      const token = localStorage.getItem('token');

      // Make the API call to get wallet details
      const response = await axios.post(
        'http://localhost:3000/api/startTrading',
        { trade_setting_id },
        {
          headers: {
            'x-access-token': `${token}`,
          },
        }
      );

      if (response) {
        const { data } = response;

        // Dispatch the successful action
        showToast('Trade Settings Started!', { type: 'success' });
        dispatch(getSettings());

        return data;
      }
    } catch (error) {
      // Dispatch the failure action
      showToast(error.response?.data.message || 'Something went wrong', { type: 'error' });
      return { error: error.message };
    }
  }
);
