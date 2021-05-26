import {
  AUTHENTICATED,
  AUTH_TOKEN,
  HIDE_AUTH_MESSAGES,
  SHOW_AUTH_LOADING,
  SHOW_AUTH_MESSAGES,
  SIGNOUT_SUCCESS,
  SIGNUP_SUCCESS
} from '../constants/Auth';

const isBrowser = typeof window !== `undefined`;

const initState = {
  loading: false,
  errorMessages: [],
  showMessage: false,
  redirect: '',
  token: isBrowser ? localStorage.getItem(AUTH_TOKEN) : null
};

const Auth = (state = initState, action) => {
  switch (action.type) {
    case AUTHENTICATED:
      return {
        ...state,
        loading: false,
        redirect: '/',
        token: action.token
      };
    case SHOW_AUTH_MESSAGES:
      return {
        ...state,
        errorMessages: action.messages,
        showMessage: true,
        loading: false
      };
    case HIDE_AUTH_MESSAGES:
      return {
        ...state,
        errorMessages: [],
        showMessage: false
      };
    case SHOW_AUTH_LOADING: {
      return {
        ...state,
        loading: true
      };
    }
    case SIGNOUT_SUCCESS: {
      return {
        ...state,
        token: null,
        redirect: '/',
        loading: false
      };
    }
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        loading: false,
        token: action.token
      };
    }
    default:
      return state;
  }
};

export default Auth;
