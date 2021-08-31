  
import  localhost  from './localhost';

const apiSortGoodGender = (token,gender) => 
    (fetch(localhost+'api/goods_admin/sort_goods_gender', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: token,
      },
      body:JSON.stringify({
          gender:gender
      })
    })
      .then(response => response.json())
      .catch(err => console.log(err))
)
export default apiSortGoodGender;