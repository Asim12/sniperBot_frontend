import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

import { callApi } from 'src/API/api';

import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await callApi('/login', 'POST', { email, password });

      if (response.status === 200) {
        dispatch({ type: 'LOGIN', payload: response.data });
        window.location.href = '/';
      }
    } catch (err) {
      setIsLoading(false);
      setError(err.response?.data?.message ? err.response?.data?.message : err.message);
    }
  };

  return { login, isLoading, error };
};
