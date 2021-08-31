  
import  localhost  from './localhost';

const apiBillState = token =>
  fetch(localhost + 'api/orderadmin/show_bill_state', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: token,
    },
  })
    .then(response => response.json())
    .catch(err => console.log(err));
export default apiBillState;