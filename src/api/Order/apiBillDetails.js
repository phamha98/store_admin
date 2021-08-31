  
import  localhost  from './localhost';

const apiBillDetails = (token, id) =>
  fetch(localhost + 'api/bills_customer/show_billdetail', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id_bill: id,
      token: token,
    }),
  })
    .then(response => response.json())
    .catch(err => console.log(err));
export default apiBillDetails; 