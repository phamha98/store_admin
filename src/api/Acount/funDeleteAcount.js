import localhost from './localhost';

const apiDeleteAcount = token =>
  fetch(localhost + 'api/acount_admin/delete_user_id', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: token,
    },
  })
    .then(response => response.json())
    .catch(err => console.log(err));
export default apiDeleteAcount;
