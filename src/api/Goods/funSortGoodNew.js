  
import  localhost  from './localhost';

const apiSortGoodNew = (token,new1) => 
    (fetch(localhost+'api/goods_admin/sort_goods_new', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: token,
      },
      body:JSON.stringify({
          new:new1
      })
    })
      .then(response => response.json())
      .catch(err => console.log(err))
)
export default apiSortGoodNew;