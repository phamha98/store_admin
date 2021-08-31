  
import  localhost  from './localhost';

  const apiPersonShow = (token, idUser) =>
    fetch(localhost + 'api/acount_admin/show_acount', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_user: idUser,
        token: token,
      }),
    })
      .then(response => response.json())
      .catch(err => console.log(err));
const   apiPersonUpdate = (token,idUser,name,address,img) => 
    ( fetch(localhost + 'api/usercontroller/update', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          id_user: idUser,
          name: name,
          phone: phone,
          address: address,
          img: img,
        }),
      })
      .catch(err => console.log(err))
)
export default apiPersonShow;
