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
import {apiConfirm, apiTransport, apiCancel} from '@api'
import {isEmpty} from 'underscore'
import TableDetailState from './TableDetailState'
import {formatGender} from '@utils'
import {Alert} from 'react-native'
const ModalAction = ({type, onClose}, ref) => {
  const [isModal, setIsModal] = useState(false)
  const [item, setItem] = useState(null)
  const [send, setSend] = useState(false)
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
    getSend () {
      return send
    },
  }))
  if (isEmpty(item)) return null
  const handleConfirm = idBill => {
    Alert.alert('Thông báo', 'Bạn xác nhận đơn đơn hàng!', [
      {
        text: 'Quay lại',
      },
      {
        text: 'Đồng ý',
        onPress: () => handleSubmitConfirm(idBill),
      },
    ])
  }
  const handleSubmitConfirm = idBill => {
    if (type === '1') {
      return apiConfirm(idBill, idUser, token)
        .then(data => {
          if (data.code === 200) {
            ToastAndroidLong('Xác nhận thành công')
            setSend(true)
          }
        })
        .catch(e => {})
    }
    if (type === '2') {
      return apiTransport(idBill, idUser, token)
        .then(data => {
          if (data.code === 200) {
            ToastAndroidLong('Xác nhận thành công')
            setSend(true)
          }
        })
        .catch(e => {})
    }
  }
  const handleDelete = idBill => {
    Alert.alert('Cảnh báo', 'Bạn muốn hủy đơn hàng!', [
      {
        text: 'Quay lại',
      },
      {
        text: 'Đồng ý',
        onPress: () => handleSubmitDelete(idBill),
      },
    ])
  }
  const handleSubmitDelete = idBill => {
    apiCancel(idBill, idUser, token).then(r => {
      if (r.code === 200) {
        ToastAndroidLong('Hủy thành công')
        setSend(true)
      }
    })
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
          <RowInfo
            data={formatGender(item.user_order.gender)}
            title={'Giới tính'}
          />

          <ViewCore height={10} />
          <TableDetailState id={item.id_bill} />
          <ViewCore
            style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
            <ViewCore row centerHorizontal padding={10}>
              <ButtonBasic
                title='Quay Lại'
                onPress={onClose}
                backgroundColor={Light.border}
              />
              {(type === '1' || type === '2') && (
                <>
                  <ButtonBasic
                    title='Xác nhận'
                    onPress={() => handleConfirm(item.id_bill)}
                  />
                  <ButtonBasic
                    title='Hủy'
                    onPress={() => handleDelete(item.id_bill)}
                    backgroundColor={Light.danger}
                  />
                </>
              )}
            </ViewCore>
          </ViewCore>
        </ViewCore>
      </ViewCore>
    </Modal>
  )
}

export default forwardRef(ModalAction)
