import {localhost} from './localhost';

export const apiUpdateTypeMain = (token, id, name, base64, url, post) =>
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
      base64: base64,
      post: post,
      url: url,
    }),
  })
    .then(response => response.json())
    .catch(err => console.log(err));

 