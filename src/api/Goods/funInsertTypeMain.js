import {localhost} from './localhost'

export const apiInsertTypeMain = (token, name, url, type) =>
  fetch(localhost + 'api/goods_admin/insert_type_main', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: token,
    },
    body: JSON.stringify({
      name: name,
      url: url,
      type: type,
    }),
  })
    .then(response => response.json())
    .catch(err => console.log(err))
