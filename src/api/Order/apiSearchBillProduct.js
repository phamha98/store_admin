import {localhost} from './localhost';

export const apiSearchBillProduct = (id_product_details, token) =>
    fetch(localhost + 'api/orderadmin/search_by_product', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            token: token
        },
        body: JSON.stringify({
            id_product_details: id_product_details,
        }),
    })
        .then(response => response.json())
        .catch(err => console.log(err));
 