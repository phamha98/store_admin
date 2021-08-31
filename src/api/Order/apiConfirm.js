import localhost from './localhost';

const apiConfirm = (id_bill, id_user, token) =>
  fetch(localhost + 'api/orderadmin/update_confirm', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: token,
    },
    body: JSON.stringify({
      id_user_confirm: id_user,

      id_bill: id_bill,
      state: '2',
    }),
  })
    .then(response => response.json())
    .catch(err => console.log(err));
export default apiConfirm;
