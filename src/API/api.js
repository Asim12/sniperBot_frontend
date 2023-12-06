import axios from 'axios';

const baseURL = import.meta.env.DEV
  ? import.meta.env.VITE_REACT_APP_CONSTANT_API_URL
  : import.meta.env.VITE_REACT_APP_CONSTANT_API_URL;

export const API = axios.create({
  baseURL,
  // withCredentials: true,
});

export const callApi = async (url, method = 'post', payload = {limit : 10, page_number:1}, params = {}) => {
  try {
    const resp = await API({
      url,
      method,
      data: payload,
      params,
      headers: {
        // 'Content-Type': 'application/json; charset=utf-8',
        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTc5OWI1ZjQ4NGQxNmQyODVjOWJlZiIsImVtYWlsIjoiYXNpbTkyNTc4QGdtYWlsLmNvbSIsImlhdCI6MTcwMTcyMDkxOCwiZXhwIjoxNzg4MTIwOTE4fQ.UAmaNle_sb7KlUl_2ufaViAx8W7Q0pIBMG2LR98GpdM' //localStorage.getItem('token'),
      },
    });
    return resp;
  } catch (error) {
    // Handle error here or throw an exception
    console.error('API call error:', error);
    throw error;
  }
};
