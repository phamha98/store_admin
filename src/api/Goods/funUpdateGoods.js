import localhost from './localhost';

const apiUpdateGoods = (
  token,
  id_type_details,
  id_type_main,
  name,
  details,
  price,
  sale,
  new1,
  imageMain,
  gender,
  imageArray,
  arraySize,
) =>
  fetch(localhost + 'api/goods_admin/update_goods', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: token,
    },
    body: JSON.stringify({
      id_type_details: id_type_details,
      id_type_main: id_type_main,
      name: name,
      details: details,
      price: price,
      sale: sale, 
      new: new1,
      img: imageMain,
      gender: gender,
      image_albums: imageArray,
      products: arraySize,
    }),
  })
    .then(response => response.json())
    .catch(err => console.log(err));
export default apiUpdateGoods;
