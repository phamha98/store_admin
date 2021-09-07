import React, {useState, useEffect, useContext} from 'react'
import {FlatList} from 'react-native'
import {
  HeaderC,
  Layout,
  Light,
  AppContext,
  ViewCore,
  ButtonBasic,
  RowInfo,
} from '@component'
import { navigate } from '@navigation'
import {apiListGroupUser} from '@api'
export default function index () {
  const {token} = useContext(AppContext)
  const [data, setData] = useState([])

  useEffect(() => {
    apiListGroupUser(token).then(result => {
      setData(result.data)
    })
  }, [])
  return (
    <Layout backgroundColor={Light.border}>
      <HeaderC title='Danh sách nhóm người dùng' />
      <ViewCore flex1 marginHorizontal={5}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <ItemGroup
              item={item}
              onSeenPermission={() =>
                navigate('ShowPermission', {
                  idRole: item.id,
                  displayName: item.display_name,
                })
              }
              onSeenAccount={() =>
                navigate('ListUserRole', {
                  idRole: item.id,
                  displayName: item.display_name,
                })
              }
            />
          )}
        />
      </ViewCore>
    </Layout>
  )
}

const ItemGroup = ({item, onSeenAccount, onSeenPermission}) => {
  return (
    <ViewCore
      row
      centerHorizontal
      padding={10}
      backgroundColor='#fff'
      borderRadius={5}
      marginVertical={5}>
      <ViewCore flex1 marginRight={5}>
        <RowInfo title='Key' data={item.name} />
        <RowInfo title='Name' data={item.display_name} marginTop={5} />
      </ViewCore>
      <ViewCore>
        <ButtonBasic title='Xem thành viên' onPress={onSeenAccount} />
        <ButtonBasic
          title='Xem các quyền'
          onPress={onSeenPermission}
          marginTop={5}
          backgroundColor={Light.primary}
        />
      </ViewCore>
    </ViewCore>
  )
}
