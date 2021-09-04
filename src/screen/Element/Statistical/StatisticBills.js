import React from 'react'
import {
  AppContext,
  HeaderC,
  Layout,
  screen_width,
  TabCustom,
  ViewCore,
} from '@component'
import {navigate} from '@navigation'
import {Tab1, Tab2, Tab3} from './component'
import StaticTabBillDay from './component/StaticTabBillDay'
import StaticTabBillOption from './component/StaticTabBillOption'
import {ScrollView} from 'react-native'
export default function StatisticBills () {
  return (
    <Layout>
      <HeaderC title='Thống kê Hóa đơn' />
      <ScrollView>
        <ViewCore height={2} />
        <TabCustom
          mapView={mv}
          mapTitle={mt}
          styleButton={{width: screen_width / 3}}
        />
        <ViewCore height={50} />
      </ScrollView>
    </Layout>
  )
}
const mv = [<StaticTabBillDay />, <StaticTabBillOption />, <StaticTabBillOption />]
const mt = ['Thống kê', 'Tùy chọn', 'Khác']
