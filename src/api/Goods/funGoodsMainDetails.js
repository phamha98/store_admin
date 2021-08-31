  
import  localhost  from './localhost';

const apiGoodsMainDetails = (token,id_type_main) => 
    (fetch(localhost+'api/goods_admin/main_goods_details', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: token,
      },
      body: JSON.stringify({
        id_type_main:id_type_main
      }),
      
    })
      .then(response => response.json())
      .catch(err => console.log(err))
)
export default apiGoodsMainDetails;