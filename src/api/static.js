import localhost from './localhost'
export const apiStaticGetCustomer = () =>
  fetch(localhost + '/api/stastic/customer', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      //   token: token,
    },
  }).then(response => response.json())
  export const apiStaticGetProduct = () =>
  fetch(localhost + '/api/stastic/product', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      //   token: token,
    },
  }).then(response => response.json())
