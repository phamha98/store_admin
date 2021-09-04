import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {
  HeaderC,
  Layout,
  ButtonIcon,
  ViewCore,
  TextCore,
  Light,
  formatVND,
} from '@component'
import {isArray, isEmpty} from 'underscore'
export default function StaticDetail ({data, ...rest}) {
  if (isEmpty(data) || !isArray(data)) return null
  return (
    <ViewCore {...rest}>
      <RowInfo title='Tổng hóa đơn' value={data.length} />
      <RowInfo title='Hóa đơn chờ xác nhận' value={formatData(data)[0]} />
      <RowInfo title='Hóa đơn đang giao' value={formatData(data)[1]} />
      <RowInfo title='Hóa đơn thành công' value={formatData(data)[2]} />
      <RowInfo title='Hóa đơn hủy' value={formatData(data)[3]} />
      <RowInfo title='Sản phẩn đã bán' value={formatData(data)[5]} />
      <RowInfo title='Doanh số' value={formatVND(formatData(data)[4])} />
      <RowInfo
        title='Doanh thu'
        value={formatVND(formatData(data)[6])}
        type='1'
      />
    </ViewCore>
  )
}

const styles = StyleSheet.create({})
const RowInfo = ({title, value, type}) => {
  return (
    <ViewCore
      row
      height={40}
      backgroundColor={Light.background}
      centerHorizontal
      paddingHorizontal={20}
      style={{borderBottomWidth: 0.5, borderColor: 'gray', marginVertical: 1}}>
      <TextCore
        size={type === '1' ? 18 : 16}
        color={type === '1' ? Light.blue_faint : '#000'}>
        {title}
      </TextCore>
      <TextCore
        size={type === '1' ? 18 : 16}
        color={type === '1' ? Light.blue_faint : '#000'}
        bold={type === '1' ? true : false}>
        {value}
      </TextCore>
    </ViewCore>
  )
}
const formatData = data => {
  let state1 = 0
  let state2 = 0
  let state3 = 0
  let state4 = 0
  let money = 0
  let number = 0
  let dola = 0
  data.forEach(item => {
    // console.log('1.13', item)
    money = money + item[3]
    number = number + Number(item[4])
    if (item[5] === '3') dola = dola + item[3]
    if (item[5] === '1') state1 = state1 + 1
    if (item[5] === '2') state2 = state2 + 1
    if (item[5] === '3') state3 = state3 + 1
    if (item[5] === '4') state4 = state4 + 1
  })
  // console.log('1.12', state1)
  return [state1, state2, state3, state4, money, number, dola]
}
