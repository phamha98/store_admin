import React from 'react'
import {HeaderC, Layout, BoxMenu, ViewCore} from '@component'
import {navigate} from '@navigation'
export default function index () {
  return (
    <Layout>
      <HeaderC title='Thống kê' />
      <ViewCore alignItems marginVertical={30}>
        {temp_data.map((item, index) => (
          <BoxMenu
            key={index}
            item={item}
            onPress={() => navigate(item.screen)}
          />
        ))}
      </ViewCore>
    </Layout>
  )
}
const temp_data = [
  {
    name: 'THỐNG KÊ THEO HÓA ĐƠN',
    icon: 'reader-outline',
    screen: 'StatisticBills',
  },
  {
    name: 'THỐNG KÊ THEO KHÁCH HÀNG',
    icon: 'people-outline',
    screen: 'StatisticCustomer',
  },
  {
    name: 'THỐNG KÊ MẶT HÀNG',
    icon: 'bar-chart-outline',
    screen: 'StatisticProduct',
  },
]
