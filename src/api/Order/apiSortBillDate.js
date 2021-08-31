  
import  localhost  from './localhost';

const apiSortBillDate = (token,type) => 
    (fetch(localhost+'api/orderadmin/sort_by_date', {
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
export default apiSortBillDate;