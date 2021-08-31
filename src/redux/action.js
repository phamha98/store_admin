export const GET_COUNT_ID = 'GET_COUNT_ID';
export const CHANGE_USER_STATE = 'CHANGE_USER_STATE';
export const SET_TOKEN_ID = 'SET_TOKEN_ID';
export const REMOVE_TOKEN_ID = 'REMOVE_TOKEN_ID';
export const LOAD_TOKEN_ID = 'LOAD_TOKEN_ID';
export const GET_TOKEN_ID = 'GET_TOKEN_ID';
export const LOAD_PERSON = 'LOAD_PERSON';
export const SET_PERSON = 'SET_PERSON';

export function change_user_state() {
  console.log('change_user_state');
  return {
    type: 'CHANGE_USER_STATE',
  };
}
export function set_token_id(payload) {
  console.log('set_token_id' + payload);
  return {
    type: 'SET_TOKEN_ID',
    payload,
  };
}
export function remove_token_id() {
  console.log('remove_token_id');
  return {
    type: 'REMOVE_TOKEN_ID',
  };
}
export function load_token_id() {
  console.log('load_token_id');
  return {
    type: 'LOAD_TOKEN_ID',
  };
}
export function get_token_id() {
  console.log('get_token_id');
  return {
    type: 'GET_TOKEN_ID',
  };
}
export function load_person() {
  console.log('load_person');
  return {
    type: 'LOAD_PERSON',
  };
}
export function set_person(payload) {
  console.log('set_person' + payload);
  return {
    type: 'SET_PERSON',
    payload,
  };
}
