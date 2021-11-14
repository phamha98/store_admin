import {
  apiGoodsDetails,
  apiSearchGoodName,
  apiSortGoodGender,
  apiSortGoodNew,
  apiSortGoodPrice,
  apiSortGoodSale,
  apiSortGoodTotalNumber,
  apiInsertGoods,
  apiUpdateGoods,
} from '@api'
import {isEmpty, isNumber} from 'underscore'
import {ToastAndroidLong} from '@component'
export const selectApiSearchGoods = (token, type, value_bolean, text_input) => {
  let value = null
  switch (type) {
    case 'searchCode':
      return apiGoodsDetails(token, text_input)
    case 'searchName':
      return apiSearchGoodName(token, text_input)
    case 'filterNew':
      if (value_bolean) value = '1'
      else value = '0'
      return apiSortGoodNew(token, value)
    case 'filterSale':
      if (value_bolean) value = '<>'
      else value = '='
      return apiSortGoodSale(token, value, '0')
    case 'filterGender':
      if (value_bolean) value = 'nam'
      else value = 'nu'
      return apiSortGoodGender(token, value)
    case 'filterPrice':
      if (value_bolean) value = 'asc'
      else value = 'desc'
      return apiSortGoodPrice(token, value)
    case 'filterNumber':
      if (value_bolean) value = 'asc'
      else value = 'desc'
      return apiSortGoodTotalNumber(token, value)

    default:
      break
  }
}
export const formatTableSize = dataSize => {
  if (isEmpty(dataSize)) return {name_size: [], number_size: []}
  let name_size = []
  let number_size = []
  name_size.push('Size')
  number_size.push('SL')
  dataSize.forEach(item => {
    name_size.push(item.size)
    number_size.push(item.number)
  })
  return {
    name_size: name_size,
    number_size: number_size,
  }
}
export function checkValidateInsertProduct (
  goodType,
  name,
  decription,
  price,
  sale,
  newProduct,
  mainImage,
  gender,
  arrayImage,
  arraySize,
) {
  if (isEmpty(name)) {
    ToastAndroidLong('Tên sản phẩm không được để trống!')
    return false
  }
  if (isEmpty(price)) {
    ToastAndroidLong('Giá sản phẩm không được để trống!')
    return false
  }
  if (isEmpty(sale)) {
    ToastAndroidLong('Phần trăm không được để trống!')
    return false
  }
  if (isEmpty(decription)) {
    ToastAndroidLong('Mô tả không được để trống!')
    return false
  }
  if (isEmpty(arraySize)) {
    ToastAndroidLong('Các size không được để trống!')
    return false
  }
  if (isEmpty(mainImage)) {
    ToastAndroidLong('Ảnh chính không được để trống!')
    return false
  }
  return true
}
export const fetchInsertProduct = (
  type,
  idTypeDetails,
  token,
  name,
  decription,
  price,
  sale,
  goodType,
  gender,
  newProduct,
  arraySize,
  mainImage,
  arrayImage,
) => {
  console.log('toekm',token);
  console.log({
    id_type_main: goodType,
    name: name,
    details: decription,
    price: price,
    sale: sale,
    new: newProduct,
    img: mainImage,
    gender: gender,
    image_albums: arrayImage,
    products: arraySize,
  })
  
  let check = checkValidateInsertProduct(
    goodType,
    name,
    decription,
    price,
    sale,
    newProduct,
    mainImage,
    gender,
    arrayImage,
    arraySize,
  )

  if (!check) return null
  if (type === 'insert')
    apiInsertGoods(
      token,
      goodType,
      name,
      decription,
      price,
      sale,
      newProduct,
      mainImage,
      gender,
      arrayImage,
      arraySize,
    )
      .then(result => {
        console.log(result)
        if (result.code == 200) {
          
          ToastAndroidLong('Chèn thành công')
        } else ToastAndroidLong('Thất bại')
      })
      .catch(err => console.log(err))
  if (type === 'update')
    apiUpdateGoods(
      token,
      idTypeDetails,
      goodType,
      name,
      decription,
      price,
      sale,
      newProduct,
      mainImage,
      gender,
      arrayImage,
      arraySize,
    )
      .then(result => {
        // console.log(result)
        if (result.code == 200) {
          ToastAndroidLong('Cập nhật thành công')
        } else ToastAndroidLong('Thất bại')
      })
      .catch(err => console.log(err))
}

export function checkTypeSize (data) {
  if (isEmpty(data)) return null
  //data=[ { id: 1, number: 9, size: 'M' },....]
  let type = false //false=>day dep
  data.forEach(item => {
    if (
      item.size === 'M' ||
      item.size === 'L' ||
      item.size === 'S' ||
      item.size === 'XL' ||
      item.size === 'XXL'
    )
      return (type = true)
  })
  return type
}
