import {
    apiGoodDetails,
    apiSearchGoodName,
    apiSortGoodGender,
    apiSortGoodNew,
    apiSortGoodPrice,
    apiSortGoodSale,
    apiSortGoodTotalNumber,
  } from '@api'
export const selectApiSearchGoods = (token, type, value_bolean, text_input) => {
  let value = null
  switch (type) {
    case 'searchCode':
      return apiGoodDetails(token, text_input)
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
