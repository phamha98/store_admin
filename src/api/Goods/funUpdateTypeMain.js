import {localhost} from './localhost'

export const apiUpdateTypeMain = (token, id, name, url) =>
  fetch(localhost + 'api/goods_admin/update_type_main', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: token,
    },
    body: JSON.stringify({
      id: id,
      name: name,
      url: url,
    }),
  })
    .then(response => response.json())
    .catch(err => console.log(err))
