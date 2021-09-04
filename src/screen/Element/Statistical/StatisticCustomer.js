import React from 'react'
import {AppContext, HeaderC, Layout,screen_width,TabCustom,ViewCore} from '@component'
import {navigate} from '@navigation'
export default function StatisticCustomer () {
  return (
    <Layout>
      <HeaderC title='Thống kê khách hàng' />
      <ViewCore height={2}/>
      <TabCustom mapView={mv} mapTitle={mt} styleButton={{width: screen_width /3}} />
    </Layout>
  )
}
const mv = [<ViewCore />, <ViewCore />,<ViewCore />]
const mt = ['Hôm nay', 'Tùy chọn',"Khác"]