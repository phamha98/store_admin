  
import {localhost} from './localhost'

export const apiSortBillNumber = (token,type) => 
    (fetch(localhost+'api/orderadmin/sort_by_number', {
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
 