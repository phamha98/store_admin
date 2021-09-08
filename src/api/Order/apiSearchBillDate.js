  
import {localhost} from './localhost'

export const apiSearchBillDate = (token,date_left,date_right) => 
    (fetch(localhost+'api/orderadmin/search_by_date', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          token: token
        },
        body: JSON.stringify({
            date_left: date_left,
            date_right: date_right,
        }),
      })
        .then(response => response.json())
      .catch(err => console.log(err))
)
 