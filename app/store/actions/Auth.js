import {
  AUTHENTICATED,
  HIDE_AUTH_MESSAGES,
  SHOW_AUTH_LOADING,
  SHOW_AUTH_MESSAGES,
  SIGNIN,
  SIGNOUT,
  SIGNOUT_SUCCESS,
  SIGNUP,
  SIGNUP_SUCCESS
} from '../constants/Auth';

export const signIn = (user) => {
  return {
    type: SIGNIN,
    payload: user
  };
};

export const authenticated = (token) => {
  return {
    type: AUTHENTICATED,
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

export const showAuthMessages = (messages) => {
  return {
    type: SHOW_AUTH_MESSAGES,
    messages
  };
};

export const hideAuthMessages = () => {
  return {
    type: HIDE_AUTH_MESSAGES
  };
};

export const showAuthLoading = () => {
  return {
    type: SHOW_AUTH_LOADING
  };
};
