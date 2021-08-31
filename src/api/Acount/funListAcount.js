import localhost from './localhost';

const apiListAcount = token =>
  fetch(localhost + 'api/acount_admin/list_user', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: token,
    }
  })
    .then(response => response.json())
    .catch(err => console.log(err));
export default apiListAcount;