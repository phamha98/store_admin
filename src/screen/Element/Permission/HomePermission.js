import React from 'react'
import {navigate} from '@navigation'
import {HeaderC, Layout, BoxMenu, ViewCore} from '@component'
export default function index () {
  return (
    <Layout>
      <HeaderC title='Quản lý Phân quyền' />
      <ViewCore alignItems marginTop={50}>
        <BoxMenu
          name='DANH SÁCH NHÓM NGƯỜI DÙNG'
          icon='reader-outline'
          onPress={() => navigate('ListPermission')}
        />
        <BoxMenu
          name='THÊM NHÓM NGƯỜI DÙNG'
          icon='add'
          onPress={() => navigate('AddGroup')}
        />
      </ViewCore>
    </Layout>
  )
}
