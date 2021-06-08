import {
  AUTHENTICATED,
  AUTH_TOKEN,
  GET_DETAILS_SUCCESS,
  GET_SCOREBOARD_SUCCESS,
  HIDE_AUTH_MESSAGE,
  RESET_PASSWORD_SUCCESS,
  SHOW_AUTH_LOADING,
  SHOW_AUTH_MESSAGE,
  SIGNOUT_SUCCESS,
  SIGNUP_SUCCESS,
  UPDATE_DETAILS_SUCCESS,
  USER_ID
} from '../constants/Auth';

const isBrowser = typeof window !== `undefined`;

const initState = {
  loading: false,
  errorMessage: null,
  successMessage: null,
  showMessage: false,
  redirect: '',
  token: isBrowser ? localStorage.getItem(AUTH_TOKEN) : null,
  userId: isBrowser ? localStorage.getItem(USER_ID) : null,
  details: null,
  scoreboard: null
};

const Auth = (state = initState, action) => {
  switch (action.type) {
    case AUTHENTICATED:
      return {
        ...state,
        loading: false,
        redirect: '/account',
        token: action.token,
        userId: action.userId
      };
    case SIGNOUT_SUCCESS:
      return {
        ...state,
        token: null,
        redirect: '/login',
        loading: false
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.token
      };
    case GET_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        details: action.details
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        showMessage: true,
        successMessage: action.message
      };
    case UPDATE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        showMessage: true,
        successMessage: action.message
      };
    case GET_SCOREBOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        scoreboard: action.scoreboard
      };
    case SHOW_AUTH_MESSAGE:
      return {
        ...state,
        errorMessage: action.message,
        showMessage: true,
        loading: false
      };
    case HIDE_AUTH_MESSAGE:
      return {
        ...state,
        errorMessage: null,
        successMessage: null,
        showMessage: false
      };
    case SHOW_AUTH_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export default Auth;
