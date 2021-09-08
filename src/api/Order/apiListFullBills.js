import {localhost} from './localhost';

export const apiListFullBills = token =>
  fetch(localhost + 'api/orderadmin/list_full_order', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: token,
    },
  })
    .then(response => response.json())
    .catch(err => console.log(err));
 