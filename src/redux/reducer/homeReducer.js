import {
  CHANGE_USER_STATE,
  SET_TOKEN_ID,
  REMOVE_TOKEN_ID,
  LOAD_TOKEN_ID,
  GET_TOKEN_ID,
  LOAD_PERSON,
  SET_PERSON,
} from '../action';

const initState = {
  user_state: false,
  _token: '',
  id_user: '',
  user_data: {
    img: null,
  },
};
export default function changeState(state = initState, action) {
  switch (action.type) {
    case CHANGE_USER_STATE:
      return {
        ...state,
        user_state: !state.user_state,
      };
    case SET_TOKEN_ID:
      return {
        ...state,
        _token: action.payload._token,
        id_user: action.payload.id_user,
      };
    case REMOVE_TOKEN_ID:
      return {
        ...state,
        _token: '',
        id_user: '',
        user_data: {img: null},
      };
    case LOAD_TOKEN_ID:
      return {
        ...state,
      };
    case GET_TOKEN_ID:
      return {
        ...state,
      };
    case LOAD_PERSON:
      return {
        ...state,
      };
    case SET_PERSON:
      return {
        ...state,
        user_data: action.payload.data,
      };
    default:
      return state;
  }
}
