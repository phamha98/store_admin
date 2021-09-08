  
import {localhost} from './localhost'

export const apiSortBillPrice = (token,type) => 
    (fetch(localhost+'api/orderadmin/sort_by_price', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          token: token
        },
        body: JSON.stringify({
            type:type
        }),
      })
        .then(response => response.json())
      .catch(err => console.log(err))
)
 