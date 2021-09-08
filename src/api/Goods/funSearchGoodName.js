  
import {localhost} from './localhost'

export const apiSearchGoodName = (token,searchName) => 
    (fetch(localhost+'api/goods_admin/search_goods_name', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: token,
      },
      body:JSON.stringify({
          search_name:searchName
      })
    })
      .then(response => response.json())
      .catch(err => console.log(err))
)
 