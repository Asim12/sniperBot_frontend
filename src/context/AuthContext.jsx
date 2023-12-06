import PropTypes from 'prop-types';
import { useMemo, useReducer, createContext } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('token', action.payload.token);
      return { user: action.payload, token: action.payload?.token };
    case 'IS_AUTH':
      return { user: action.payload.user, token: action.payload.token };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return { user: null, token: '' };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    token: '',
  });

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
  children: PropTypes.any,
};
