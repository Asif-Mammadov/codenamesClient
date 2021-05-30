import {
  GET_SCOREBOARD,
  GET_SCOREBOARD_SUCCESS,
  HIDE_APP_MESSAGE,
  SHOW_APP_LOADING,
  SHOW_APP_MESSAGE
} from '../constants/App';

export const getScoreboard = (id) => {
  return {
    type: GET_SCOREBOARD,
    id
  };
};

export const getScoreboardSuccess = (data) => {
  return {
    type: GET_SCOREBOARD_SUCCESS,
    scoreboard: data
  };
};

export const showAppMessage = (message) => {
  return {
    type: SHOW_APP_MESSAGE,
    message
  };
};

export const hideAuthMessage = () => {
  return {
    type: HIDE_APP_MESSAGE
  };
};

export const showAuthLoading = () => {
  return {
    type: SHOW_APP_LOADING
  };
};
