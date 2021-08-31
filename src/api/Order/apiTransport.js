import localhost from './localhost';

const apiTransport = (id_bill, id_user, token) =>
  fetch(localhost + 'api/orderadmin/update_transport', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id_user_transport: id_user,
      token: token,
      id_bill: id_bill,
    }),
  })
    .then(response => response.json())
    .catch(err => console.log(err));
export default apiTransport;
