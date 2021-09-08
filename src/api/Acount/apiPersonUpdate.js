import {localhost} from './localhost'
export const apiPersonUpdate = (token, idUser, name, phone, address, img) =>
  fetch(localhost + 'api/acount_admin/update_acount', {
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
  }).catch(err => console.log(err))
