import {isEmpty, isNumber} from 'underscore'
import {formatVND} from '@component'
export function compareA (a, b) {
  if (isEmpty(a) || isEmpty(b) || !isNumber(a) || !isNumber(b)) return null
  if (a > b) return true
  else return false
}
export const formatDataProduct = data => {
  if (isEmpty(data)) return []
  let ldata = []
  data.map((item, index) => {
    let temdata = [
      index + 1,
      'MH' + item.id,
      item.detail.name,
      item.size,
      formatVND(item.detail.price),
      item.number,
      item.quantity_number,
    ]

    ldata.push(temdata)
  })
  return ldata
}
export const formatDataProduct2 = data => {
  if (isEmpty(data)) return []
  let ldata = []
  data.map((item, index) => {
    let temdata = [
      index + 1,
      'MH' + item.id,
      item.detail.name,
      item.size,
      item.detail.price,
      item.number,
      item.quantity_number,
    ]

    ldata.push(temdata)
  })
  return ldata
}
export const formatStaticDetailProduct = data => {
  let money = {
    max: 0,
    id: null,
    name: null,
  }
  let rest = {
    max: 0,
    id: null,
    name: null,
  }
  let sale = {
    max: 0,
    id: null,
    name: null,
  }
  let total_sell = 0
  let total_rest = 0
  //********************** */
  data.forEach(item => {
    if (Number(item[4]) > money.max) {
      money = {
        max: item[4],
        id: item[1],
        name: item[2],
      }
    }
    if (Number(item[5]) > rest.max) {
      rest = {
        max: item[5],
        id: item[1],
        name: item[2],
      }
    }
    total_rest = total_rest + Number(item[5])

    if (Number(item[6]) > sale.max) {
      sale = {
        max: item[6],
        id: item[1],
        name: item[2],
      }
    }
    total_sell = total_sell + Number(item[6])
  })
  return {
    money: money,
    rest: rest,
    sale: sale,
    total_sell,
    total_rest,
  }
}
