import React from 'react'
import {
  AppContext,
  HeaderC,
  Layout,
  screen_width,
  TabCustom,
  ViewCore,
  BoxMenu,
} from '@component'
import {navigate} from '@navigation'
export default function index () {
  return (
    <Layout>
      <HeaderC title='Quản lý đăng bài' />
      <ViewCore marginTop={30} alignItems>
        <BoxMenu
          name='DANH SÁCH BÀI VIẾT'
          onPress={() => navigate('ListPost')}
          icon='reader-outline'
        />
        <BoxMenu
          name='THÊM BÀI VIÊT'
          onPress={() =>
            navigate('InsertPost', {
              idT: '',
              titleT: '',
              contentT: '',
              imgT:
                'https://thailamlandscape.vn/wp-content/uploads/2017/10/no-image.png',
            })
          }
          icon='add'
        />
      </ViewCore>
    </Layout>
  )
}
