  
import  {localhost}  from './localhost';

export const apiGoodsDetails = (token,id_type_details) => 
    (fetch(localhost+'api/goods_admin/goods_details', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: token,
      },
      body: JSON.stringify({
        id_type_details:id_type_details
      }),
      
    })
      .then(response => response.json())
      .catch(err => console.log(err))
)
