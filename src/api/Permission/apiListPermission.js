import localhost from './localhost';

const apiListPermission = (token) =>
  fetch(localhost + 'api/permission_admin/list_permission', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: token,
    },
  })
    .then(response => response.json())
    .catch(err => console.log(err));
export default apiListPermission;
