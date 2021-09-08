import {localhost} from './localhost';

export const apiDeleteGoods = (token, id) =>
  fetch(localhost + 'api/goods_admin/delete_product', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: token,
    },
    body: JSON.stringify({
      id: id,
    }),
  })
    .then(response => response.json())
    .catch(err => console.log(err));
