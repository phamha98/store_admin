import React, {useState, useContext, useEffect, useRef} from 'react'
import {FlatList, Alert} from 'react-native'
import {apiBillState, apiConfirm, apiTransport} from '@api'
import {
  AppContext,
  HeaderC,
  Layout,
  ViewCore,
  TextCore,
  TabCustom,
  screen_width,
  Light,
  ContainBill,
  screen_height,
} from '@component'
import {navigate} from '@navigation'
import {isObject} from 'underscore'
import ModalAction from './component/ModalAction'

export default function index () {
  return (
    <Layout>
      <HeaderC title='Trạng thái đơn hàng' />
      <ViewCore style={{flex: 1}}>
        <TabCustom
          mapView={[
            <TabStateBill type='1' />,
            <TabStateBill type='2' />,
            <TabStateBill type='3' />,
            <TabStateBill type='4' />,
          ]}
          mapTitle={mt}
          styleButton={{width: screen_width / 4 - 5}}
        />
      </ViewCore>
    </Layout>
  )
}

const mt = ['Chờ xác nhận', 'Đang giao', 'Thành công', 'Hủy']

//cac tab mo ta
const TabStateBill = ({type}) => {
  const {token, permission} = useContext(AppContext)
  const [data, setData] = useState([])
  const [refreshing, setRefreshing] = useState(true)
  const refModal = useRef()
  useEffect(() => {
    apiBillState(token)
      .then(r => {
        if (r.code === 200) {
          if (type === '1') setData(r.billconfirm)
          if (type === '2') setData(r.billtransport)
          if (type === '3') setData(r.billsuccess)
          if (type === '4') setData(r.billcancel)
        } // else alert(r.code)
      })
      .catch(e => {})
      .finally(() => setRefreshing(false))
  }, [refreshing])
  const handleCheckBills = item => {
    let findPermission = false
    if (type === '1') {
      findPermission = permission.find(
        key => key.name == 'NaviOrderStateConfirm',
      )
    }
    if (type === '2') {
      findPermission = permission.find(
        key => key.name == 'NaviOrderStateTransport',
      )
    }
    if (!isObject(findPermission))
      return Alert.alert('Thông báo', 'Bạn chưa được cấp quyền', [
        {
          text: 'Hủy',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'Đồng ý', onPress: () => {}},
      ])
    else {
      refModal.current.open()
      refModal.current.setItem(item)
    }
  }
  return (
    <>
      <FlatList
        refreshing={refreshing}
        onRefresh={() => setRefreshing(true)}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <ContainBill
            item={item}
            onPress={() => navigate('BillDetails', {data: item})}
            onPressTwo={() => handleCheckBills(item)}
            titleTwo={type === '1' || type === '2' ? 'Kiểm tra' : null}
          />
        )}
        ListEmptyComponent={() => (
          <ViewCore>
            <TextCore color={Light.blue_faint}>Không có dữ liệu</TextCore>
          </ViewCore>
        )}
        contentContainerStyle={{
          backgroundColor: Light.border,
          minHeight: screen_height,
          paddingHorizontal: 10,
          paddingTop: 10,
        }}
      />
      <ModalAction
        ref={refModal}
        type={type}
        onClose={() => {
          refModal.current.close()
          let send = refModal.current.getSend()
          if (send) setRefreshing(true)
        }}
      />
    </>
  )
}
