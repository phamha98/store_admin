import {isEmpty} from 'underscore'
export function formatStateBill (state) {
  if (isEmpty(state)) return ''
  if (state === '1') return 'Chờ xác nhận'
  else if (state === '2') return 'Đang giao hàng'
  else if (state === '3') return 'Thành công'
  else if (state == '4') return 'Đã hủy'
  else return ''
}
export const uriImg = uri => {
  if (isEmpty(uri)) return require('@image/noimage.jpg')
  else return {uri: uri}
}
export function formatGender (name) {
  if (isEmpty(name)) return ''
  if (name === 'nam') return 'Nam'
  if (name === 'nu') return 'Nữ'
  if (name === 'tat') return 'Tất cả'
  else return ''
}
