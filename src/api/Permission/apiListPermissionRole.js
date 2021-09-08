import {localhost} from './localhost';

export const apiListPermissionRole = (token, idRole) =>
  fetch(localhost + 'api/permission_admin/list_permission_role', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: token,
    },
    body: JSON.stringify({
      id_role: idRole,
    }),
  })
    .then(response => response.json())
    .catch(err => console.log(err));
 