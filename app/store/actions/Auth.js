import {
  AUTHENTICATED,
  GET_DETAILS,
  GET_DETAILS_SUCCESS,
  HIDE_AUTH_MESSAGE,
  RESET_PASSWORD_SUCCESS,
  SHOW_AUTH_LOADING,
  SHOW_AUTH_MESSAGE,
  SIGNIN,
  SIGNOUT,
  SIGNOUT_SUCCESS,
  SIGNUP,
  SIGNUP_SUCCESS,
  UPDATE_DETAILS,
  UPDATE_DETAILS_SUCCESS
} from '../constants/Auth';

export const signIn = (user) => {
  return {
    type: SIGNIN,
    payload: user
  };
};

export const authenticated = (userId, token) => {
  return {
    type: AUTHENTICATED,
    userId,
    token
  };
};

export const signOut = () => {
  return {
    type: SIGNOUT
  };
};

export const signOutSuccess = () => {
  return {
    type: SIGNOUT_SUCCESS
  };
};

export const signUp = (user) => {
  return {
    type: SIGNUP,
    payload: user
  };
};

export const signUpSuccess = (token) => {
  return {
    type: SIGNUP_SUCCESS,
    token
  };
};

export const getDetails = () => {
  return {
    type: GET_DETAILS
  };
};

export const getDetailsSuccess = (data) => {
  return {
    type: GET_DETAILS_SUCCESS,
    details: data
  };
};

export const updateDetails = (data) => {
  return {
    type: UPDATE_DETAILS,
    data
  };
};

export const updateDetailsSuccess = () => {
  return {
    type: UPDATE_DETAILS_SUCCESS
  };
};

export const resetPassword = (data) => {
  return {
    type: UPDATE_DETAILS,
    data
  };
};

export const resetPasswordSuccess = () => {
  return {
    type: RESET_PASSWORD_SUCCESS
  };
};

export const showAuthMessage = (message) => {
  return {
    type: SHOW_AUTH_MESSAGE,
    message
  };
};

export const hideAuthMessage = () => {
  return {
    type: HIDE_AUTH_MESSAGE
  };
};

export const showAuthLoading = () => {
  return {
    type: SHOW_AUTH_LOADING
  };
};
