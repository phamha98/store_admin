import {localhost} from './localhost';

export const apiDeleteRolePermission = (token, idRole, idPermission) =>
  fetch(localhost + 'api/permission_admin/delete_role_permission', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: token,
    },
    body: JSON.stringify({
      id_role: idRole,
      id_permission: idPermission,
    }),
  })
    .then(response => response.json())
    .catch(err => console.log(err));
 
