import {localhost} from './localhost';

export const apiSearchAcountId = (token, idUser) =>
  fetch(localhost + 'api/acount_admin/search_user_id', {
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
 