import {localhost} from './localhost'

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
    .catch(err => console.log(err))
export const change_state_product = (token, id, state) =>
  fetch(localhost + 'api/goods_admin/state_product', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: token,
    },
    body: JSON.stringify({
      id: id,
      state: state,
    }),
  })
    .then(response => response.json())
    .catch(err => console.log(err))
