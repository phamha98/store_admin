import React, {
  useState,
  useContext,
  forwardRef,
  useImperativeHandle,
} from 'react'
import {Modal} from 'react-native'
import {
  AppContext,
  ViewCore,
  Light,
  RowInfo,
  ButtonBasic,
  ToastAndroidLong,
  formatVND,
} from '@component'
import {apiConfirm, apiTransport} from '@api'
import {isEmpty} from 'underscore'
import TableDetailState from './TableDetailState'
const ModalAction = ({type}, ref) => {
  const [isModal, setIsModal] = useState(false)
  const [item, setItem] = useState(null)
  const {token, idUser} = useContext(AppContext)
  useImperativeHandle(ref, () => ({
    open () {
      setIsModal(true)
    },
    close () {
      setIsModal(false)
    },
    setItem (data) {
      setItem(data)
    },
  }))
  if (isEmpty(item)) return null
  const handleConfirm = idBill => {
    if (type === '1') {
      return apiConfirm(idBill, idUser, token)
        .then(data => {
          if (data.code === 200) {
            ToastAndroidLong('Xác nhận thành công')
          }
        })
        .catch(e => {})
    }
    if (type === '2') {
      return apiTransport(idBill, idUser, token)
        .then(data => {
          if (data.code === 200) {
            ToastAndroidLong('Xác nhận thành công')
          }
        })
        .catch(e => {})
    }
  }
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isModal}
      onRequestClose={() => setIsModal(false)}>
      <ViewCore width={'100%'} height={'100%'} backgroundColor='#000'>
        <ViewCore
          backgroundColor='#fff'
          margin={5}
          padding={5}
          borderRadius={5}
          height={'90%'}>
          <RowInfo
            label='Thông tin đặt hàng'
            sizeL={20}
            backgroundColor='#fff'
          />
          <RowInfo data={item.user_order.name} title='Tên khách hàng' />
          <RowInfo data={item.user_order.phone} title={'Số điện thoại'} />
          <RowInfo data={item.user_order.address} title={'Địa chỉ'} />
          <RowInfo data={item.user_order.gender} title={'Giới tính'} />

          <ViewCore height={10} />
          <TableDetailState id={item.id_bill} />
          <ViewCore
            style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
            
            <ViewCore row centerHorizontal padding={10}>
              <ButtonBasic
                title='Quay Lại'
                onPress={() => setIsModal(false)}
                backgroundColor={Light.border}
              />
              {(type === '1' || type === '2') && (
                <ButtonBasic
                  title='Xác nhận'
                  onPress={() => handleConfirm(item.id_bill)}
                />
              )}
            </ViewCore>
          </ViewCore>
        </ViewCore>
      </ViewCore>
    </Modal>
  )
}

export default forwardRef(ModalAction)
