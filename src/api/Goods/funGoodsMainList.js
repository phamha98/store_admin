import {localhost} from './localhost'

export const apiGoodsMainList = token =>
  fetch(localhost + 'api/goods_admin/list_type_goods', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: token,
    },
  })
    .then(response => response.json())
    .catch(err => console.log(err))
