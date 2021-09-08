import {localhost} from './localhost';

export const apiSearchBillUser = (id_user_order, token) =>
    fetch(localhost + 'api/orderadmin/search_by_nameuser', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            token: token
        },
        body: JSON.stringify({
            id_user_order: id_user_order,
        }),
    })
        .then(response => response.json())
        .catch(err => console.log(err));
