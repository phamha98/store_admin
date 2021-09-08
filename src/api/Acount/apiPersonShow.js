import {localhost} from './localhost'

export const apiPersonShow = (token, idUser) =>
  fetch(localhost + 'api/acount_admin/show_acount', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id_user: idUser,
      token: token,
    }),
  })
    .then(response => response.json())
    .catch(err => console.log(err))
