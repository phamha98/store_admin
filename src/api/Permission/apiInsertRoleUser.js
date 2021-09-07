import localhost from './localhost'

const apiInsertRoleUser = (token, idRole, idUser) =>
  fetch(localhost + 'api/permission_admin/insert_role_user', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: token,
    },
    body: JSON.stringify({
      id_role: idRole,
      id_user: idUser,
    }),
  }).then(response => response.json())

export default apiInsertRoleUser
