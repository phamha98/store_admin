import {localhost} from './localhost';

export const apiBillUserState = (token, idUser) =>
  fetch(localhost + 'api/orderadmin/bill_user_state', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: token,
    },
    body: JSON.stringify({
      id_user: idUser,
    }),
  })
    .then(response => response.json())
    .catch(err => console.log(err));
 