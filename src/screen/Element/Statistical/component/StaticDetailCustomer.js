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
import {compareA} from '../utils'
import {isArray, isEmpty} from 'underscore'
export default function StaticDetail ({data, ...rest}) {
  if (isEmpty(data) || !isArray(data)) return null
  return (
    <ViewCore {...rest}>
      <RowInfo title='Tổng số khách hàng' value={data.length} />
      <RowInfo title='Tổng khách hàng đã mua' value={formatData(data)[0]} />
      <RowInfo title='Tổng khách hàng không mua' value={formatData(data)[1]} />
      <RowInfo title='Khách hàng đặt nhiều SP' value={formatData(data)[2]} />
      <RowInfo title='Khách hàng đặt nhiều ĐH' value={formatData(data)[3]} />
      <RowInfo title='Khách hàng đặt nhiều Tiền' value={formatData(data)[4]} />
      <RowInfo
        title='Khách hàng đặt hủy nhiều ĐH'
        value={formatData(data)[5]?formatData(data)[5]:"Không có"}
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
  //console.log(data);
  // [ 7, 'KH10', 'pham ha dang kis4', 'dk4@gmail.com', '0 VND', 0, 0, 0 ] ]
  let order = 0
  let no_order = 0
  let max_product = 0
  let product = {
    max_product: 0,
    id_user: null,
  }

  let bill = {
    max_bill: 0,
    id_user: null,
  }
  let money = {
    max_money: 0,
    id_user: null,
  }
  let _delete = {
    max_delete: 0,
    id_user: null,
  }
  data.forEach(item => {
    if (item[4] !== 0) {
      order = order + 1
    } else {
      no_order = no_order + 1
    }
    if (Number(item[6]) > product.max_product)
      product = {
        max_product: Number(item[6]),
        id_user: item[1],
      }
    if (Number(item[5]) > bill.max_bill)
      bill = {
        max_bill: Number(item[5]),
        id_user: item[1],
      }
    if (Number(item[4]) > money.max_money)
      money = {
        max_money: Number(item[4]),
        id_user: item[1],
      }
    if (Number(item[7]) > _delete.max_delete)
      _delete = {
        max_delete: Number(item[7]),
        id_user: item[1],
      }
  })
  //console.log(product);
  return [
    order,
    no_order,
    product.id_user,
    bill.id_user,
    money.id_user,
    _delete.id_user,
  ]
}
