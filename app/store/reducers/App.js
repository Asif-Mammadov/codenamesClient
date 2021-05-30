import {
  GET_SCOREBOARD_SUCCESS,
  HIDE_APP_MESSAGE,
  SHOW_APP_LOADING,
  SHOW_APP_MESSAGE
} from '../constants';

const initState = {
  loading: false,
  errorMessage: null,
  showMessage: false,
  scoreboard: null
};

const App = (state = initState, action) => {
  switch (action.type) {
    case GET_SCOREBOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        scoreboard: action.scoreboard
      };
    case SHOW_APP_MESSAGE:
      return {
        ...state,
        errorMessage: action.message,
        showMessage: true,
        loading: false
      };
    case HIDE_APP_MESSAGE:
      return {
        ...state,
        errorMessage: null,
        showMessage: false
      };
    case SHOW_APP_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export default App;
