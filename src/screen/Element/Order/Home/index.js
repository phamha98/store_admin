import React, {useContext} from 'react'
import {
  AppContext,
  HeaderC,
  Layout,
  ViewCore,
  BoxMenu,
  ToastAndroidLong,
} from '@component'
import {navigate,} from '@navigation'
export default function index () {
  const {permission} = useContext(AppContext)
  const handleNavigation = (screen, security) => {
    const isObject = v => {
      return !!v && v.constructor === Object
    }
    let find = permission.find(key => key.name === security)
    if (isObject(find)) navigate(screen)
    else ToastAndroidLong('Bạn không có quyền truy cập')
  }
  return (
    <Layout>
      <HeaderC title='Quản lý đơn hàng' />
      <ViewCore alignItems marginTop={30}>
        {temp_data.map((item, index) => (
          <BoxMenu
            key={index}
            item={item}
            onPress={() => handleNavigation(item.screen, item.security)}
          />
        ))}
      </ViewCore>
    </Layout>
  )
}
const temp_data = [
  {
    name: 'DANH SÁCH ĐƠN HÀNG',
    icon: 'reader-outline',
    screen: 'ListOrder',
    security: 'NaviOrderList',
  },
  {
    name: 'TÌM KIẾM VÀ SẮP XẾP',
    icon: 'search',
    screen: 'SearchOrder',
    security: 'NaviOrderSearch',
  },
  {
    name: 'TRẠNG THÁI ĐƠN HÀNG',
    icon: 'paper-plane-outline',
    screen: 'StateOrder',
    security: 'NaviOrderState',
  },
]
