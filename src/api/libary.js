import {localhost} from './localhost'
export const apiLibaryInsert = (token, formData) =>
  fetch(localhost + '/api/libary/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      token: token,
    },
    body: formData,
  }).then(response => response.json())

export const apiLibaryDelete = () =>
  fetch(localhost + '/api/libary/delete', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      //   token: token,
    },
  }).then(response => response.json())
