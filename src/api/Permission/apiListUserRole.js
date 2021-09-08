import {localhost} from './localhost';

export const apiListUserRole = (token, idRole) =>
  fetch(localhost + 'api/permission_admin/listuser_group_role', {
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
 