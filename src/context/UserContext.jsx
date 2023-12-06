import PropTypes from 'prop-types';
import { useMemo, useReducer, createContext } from 'react';

export const UserContext = createContext();

export const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, userList: action.payload, userListLoading: false };
    case 'SET_USER':
      return { ...state, userData: action.payload, userDataLoading: false };
    case 'REMOVE_USER':
      return {
        ...state,
        userList: state.userList.filter((user) => user._id !== action.payload.id),
      };
    default:
      return state;
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {
    userListLoading: true,
    userDataLoading: true,
    userList: [],
    userData: {},
  });

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

UserContextProvider.propTypes = {
  children: PropTypes.any,
};
