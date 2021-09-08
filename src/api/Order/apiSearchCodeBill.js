import {localhost} from './localhost';

export const apiSearchCodeBill = (id_bill, token) =>
    fetch(localhost + 'api/orderadmin/search_bills', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            token: token
        },
        body: JSON.stringify({
            id_bill: id_bill,
        }),
    })
        .then(response => response.json())
        .catch(err => console.log(err));
