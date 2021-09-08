import {localhost} from './localhost';

export const apiFilterAcountBirthday = token =>
  fetch(localhost + 'api/acount_admin/filter_user_birthday', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: token,
    },
  })
    .then(response => response.json())
    .catch(err => console.log(err));
 