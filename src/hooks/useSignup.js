import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

import { callApi } from 'src/API/api';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const signup = async (first_name, last_name, email, password) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await callApi('/register', 'POST', {
        first_name,
        last_name,
        email,
        password,
      });

      if (response.status === 200) {
        window.location.href = '/';
      }
    } catch (err) {
      setIsLoading(false);
      setError(err.response?.data?.message ? err.response?.data?.message : err.message);
    }
  };

  return { signup, isLoading, error };
};
