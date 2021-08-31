import localhost from './localhost';

const apiDeleteRoleUser = (token, idRole, idUser) =>
  fetch(localhost + 'api/permission_admin/delete_user_role', {
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
  })
    .then(response => response.json())
    .catch(err => console.log(err));
export default apiDeleteRoleUser;
