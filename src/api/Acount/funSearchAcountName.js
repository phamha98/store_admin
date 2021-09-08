import {localhost} from './localhost';

export const apiSearchAcountName = (token, key) =>
  fetch(localhost + 'api/acount_admin/search_user_name', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: token,
    },
    body: JSON.stringify({
      search_name: key,
    }),
  })
    .then(response => response.json())
    .catch(err => console.log(err));
 