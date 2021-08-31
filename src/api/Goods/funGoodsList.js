  
import  localhost  from './localhost';

const apiGoodsList = (token) => 
    (fetch(localhost+'api/goods_admin/list_goods', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: token,
      },
      
    })
      .then(response => response.json())
      .catch(err => console.log(err))
)
export default apiGoodsList;