import localhost from './localhost';

const apiInsertRolePermission = (token, idRole, idPermission) =>
  fetch(localhost + 'api/permission_admin/insert_role_permission', {
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
export default apiInsertRolePermission;
