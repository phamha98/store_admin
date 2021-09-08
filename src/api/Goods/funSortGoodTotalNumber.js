  
import {localhost} from './localhost'

export const apiSortGoodTotalNumber = (token,type) => 
    (fetch(localhost+'api/goods_admin/sort_goods_totalnumber', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: token,
      },
      body:JSON.stringify({
         type:type,
      })
    })
      .then(response => response.json())
      .catch(err => console.log(err))
)
  