  
import  localhost  from './localhost';

const apiSortGoodSale = (token,type,sale) => 
    (fetch(localhost+'api/goods_admin/sort_goods_sale', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: token,
      },
      body:JSON.stringify({
         type:type,
         sale:sale
      })
    })
      .then(response => response.json())
      .catch(err => console.log(err))
)
export default apiSortGoodSale;