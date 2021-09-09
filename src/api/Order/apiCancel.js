import {localhost} from './localhost';

export const apiCancel = (id_bill, id_user, token) =>
  fetch(localhost + 'api/orderadmin/update_cancel', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: token,
    },
    body: JSON.stringify({
      id_user_confirm: id_user,
      id_bill: id_bill,
    
    }),
  })
    .then(response => response.json())
    .catch(err => console.log(err));
 