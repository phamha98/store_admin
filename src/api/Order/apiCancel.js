import localhost from './localhost';

const apiCancel = (id_bill, id_user, token) =>
  fetch(localhost + 'api/billstate/admin/update_confirm', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: token,
    },
    body: JSON.stringify({
      id_user_confirm: id_user,

      id_bill: id_bill,
      state: '4',
    }),
  })
    .then(response => response.json())
    .catch(err => console.log(err));
export default apiCancel;