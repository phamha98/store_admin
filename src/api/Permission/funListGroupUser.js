import localhost from './localhost';

const apiListGroupUser = token =>
  fetch(localhost + 'api/permission_admin/list_group_user', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: token,
    },
  })
    .then(response => response.json())
    .catch(err => console.log(err));
export default apiListGroupUser;
