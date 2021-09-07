import React from 'react'
import {HeaderC, Layout, ViewCore, BoxMenu} from '@component'
import {navigate} from '@navigation'
export default function index () {
  return (
    <Layout>
      <HeaderC title='Quản lý mặt hàng' />
      <ViewCore alignItems marginTop={30}>
        <BoxMenu
          name='DANH SÁCH HÀNG HÓA'
          icon='reader-outline'
          onPress={() => navigate('ShowGoods')}
        />
        <BoxMenu
          name='TÌM KIẾM '
          icon='search'
          onPress={() => navigate('SearchGoods')}
        />
        <BoxMenu
          name='THÊM MẶT HÀNG'
          icon='medkit-outline'
          onPress={() => navigate('InsertGoods')}
        />
        <BoxMenu
          name='THÊM LOẠI HÀNG'
          icon='grid-outline'
          onPress={() =>
            navigate('InsertTypeGoods', {type: 'insert', item: false})
          }
        />
      </ViewCore>
    </Layout>
  )
}
