import React from 'react'
import {ViewCore, TextCore, ButtonBasic, Light} from '@component'
import {isEmpty} from 'underscore'
import {formatStateBill} from '@utils'
export default function ContainBill ({item, onPress}) {
  if (isEmpty(item)) return null
  return (
    <ViewCore
      marginBottom={10}
      style={{
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#fff',
        padding: 10,
      }}>
      <RowInfo data={'HD' + item.id} title='Mã Hóa đơn' type='id' />
      <RowInfo
        data={formatStateBill(item.state)}
        title='Trạng thái đơn hàng'
        type='state'
      />
      <RowInfo data={item.user_order.name} title='Tên khách hàng' />
      <RowInfo data={item.bill_details.date} title='Ngày đặt hàng' />
      <RowInfo data={item.bill_details.total_price} title='Tổng tiền' />
      {item.user_confirm && (
        <>
          <RowInfo data={item.user_confirm.name} title='Nhân viên xác nhận' />
          <RowInfo data={'NV' + item.user_confirm.id} title='Mã nhân viên' />
        </>
      )}
      {item.user_transport && (
        <>
          <RowInfo
            data={item.user_transport.name}
            title='Nhân viên giao hàng'
          />
          <RowInfo data={'NV' + item.user_confirm.id} title='Mã nhân viên' />
        </>
      )}

      <ViewCore alignItems marginTop={10}>
        <ButtonBasic
          title='Chi tiết'
          width={100}
          height={30}
          backgroundColor={Light.blue_faint}
          onPress={onPress}
        />
      </ViewCore>
    </ViewCore>
  )
}
const RowInfo = ({data = '', title = '', type = ''}) => {
  if (isEmpty(data) || isEmpty(title)) return null
  return (
    <ViewCore
      row
      height={40}
      backgroundColor='#fff'
      centerHorizontal
      style={{
        borderBottomWidth: type === 'id' ? 1 : 0.3,
        borderBottomColor: 'gray',
      }}>
      <TextCore size={type === 'id' ? 20 : 14}>{title ? title : ''}</TextCore>
      <TextCore
        color={type === 'state' ? Light.blue_faint : '#000'}
        size={type === 'id' ? 20 : 14}>
        {data ? data : ''}
      </TextCore>
    </ViewCore>
  )
}
