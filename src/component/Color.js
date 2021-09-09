export const Light = {
  background: '#eceff2',
  primary: '#11ca71',
  primary2: '#47AA12',
  warning: '#FF2E00',
  danger: '#FF2E00',
  success: '#00EFEF',
  toggle: '#94D213',
  link: '#0055FF',
  default: '#787878',
  text: '#383838',
  card: '#dbdfe2',
  border: '#9c9c9c',
  title: '#005920',
  info: '#103173',
  note: '#002570',
  backgroundInput: '#ffffff',
  sub: '#0B193F',
  blue_faint: '#3887ff',
  blue_faint2: '#008CFF',
}
import {Dimensions} from 'react-native'
import {isEmpty} from 'underscore'
const {width, height} = Dimensions.get('window')
export const screen_width = width
export const screen_height = height
export function formatVND (price, sign = 'VND') {
  if (price===null) return 0
  const pieces = parseFloat(price)
    .toFixed(0)
    .split('')
  let ii = pieces.length - 3
  while (ii > 0) {
    pieces.splice(ii, 0, '.')
    ii -= 3
  }
  return pieces.join('') + ' ' + sign
}
