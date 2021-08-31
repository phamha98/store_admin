import localhost from './localhost';

const apiInsertRole = (token, name, displayName) =>
  fetch(localhost + 'api/permission_admin/insert_role', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: token,
    },
    body: JSON.stringify({
      name: name,
      display_name: displayName,
    }),
  })
    .then(response => response.json())
    .catch(err => console.log(err));
export default apiInsertRole;
