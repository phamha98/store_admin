import React, {useState, useEffect, useContext, useRef} from 'react'
import {FlatList, Alert} from 'react-native'
import {
  apiListPermissionRole,
  apiListPermission,
  apiDeleteRolePermission,
  apiInsertRolePermission,
} from '@api'
import {
  AppContext,
  HeaderC,
  Layout,
  ButtonBasic,
  ViewCore,
  TextCore,
  Light,
  ToastAndroidLong,
} from '@component'
import RBSheet from 'react-native-raw-bottom-sheet'
export default function index ({route}) {
  const refRBSheet = useRef()
  const {token} = useContext(AppContext)
  const [data, setData] = useState([])
  const [value, setValue] = useState([])
  const {idRole, displayName} = route.params
  const [load, setLoad] = useState(true)
  useEffect(() => {
    apiListPermissionRole(token, idRole).then(result => {
      if (result.code == 200) {
        setData(result.data)
      }
    })
    apiListPermission(token).then(result => {
      if (result.code == 200) {
        setValue(result.data)
      }
    })
  }, [load])
  const check = id => {
    const isObject = v => {
      return !!v && v.constructor === Object
    }
    let temp = data.find(item => item.id == id)
    return isObject(temp)
  }
  const deleteRolePermission = idPermission => {
    apiDeleteRolePermission(token, idRole, idPermission)
      .then(result => {
        if (result.data == 1) ToastAndroidLong('Xóa thành công')
        else ToastAndroidLong('Xóa thất bại')
      })
      .catch(e => console.log(e))
      .finally(() => setLoad(!load))
  }
  const insertRolePermission = idPermission => {
    apiInsertRolePermission(token, idRole, idPermission)
      .then(result => {
        if (result.code == 200) ToastAndroidLong('Thêm thành công')
        else ToastAndroidLong('Chèn thất bại')
      })
      .catch(e => console.log(e))
      .finally(() => setLoad(!load))
  }
  const handleRemove = idPermission => {
    Alert.alert('Cảnh báo', 'Bạn có chắc chắn xóa?', [
      {
        text: 'Hủy',
        onPress: () => {},
        style: 'cancel',
      },
      {text: 'Đồng ý', onPress: () => deleteRolePermission(idPermission)},
    ])
  }
  return (
    <Layout>
      <HeaderC title={'Quyền ' + displayName} />
      <ViewCore margin={10}>
        <ButtonBasic
          width={'100%'}
          title='Thêm quyền'
          onPress={() => refRBSheet.current.open()}
        />
      </ViewCore>

      <RBSheet
        ref={refRBSheet}
        height={500}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
            backgroundColor: '#8B7878CA',
          },
          draggableIcon: {
            backgroundColor: Light.blue_faint,
          },
        }}>
        <FlatList
          data={value}
          keyExtractor={item => item.id}
          renderItem={({item}) =>
            !check(item.id) && (
              <RowPermission
                item={item}
                labelR='Thêm'
                onPress={() => insertRolePermission(item.id)}
              />
            )
          }
          contentContainerStyle={{flex: 1, padding: 10}}
        />
      </RBSheet>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <RowPermission
            item={item}
            onPress={() => handleRemove(item.id)}
            labelR={'Xóa'}
          />
        )}
        contentContainerStyle={{marginHorizontal: 10}}
      />
    </Layout>
  )
}

const RowPermission = ({item, onPress, labelR}) => {
  return (
    <ViewCore
      row
      borderRadius={5}
      centerHorizontal
      padding={5}
      backgroundColor={Light.border}
      marginBottom={5}>
      <TextCore color='#fff' bold>
        {item.display_name}
      </TextCore>
      <ButtonBasic onPress={onPress} title={labelR} />
    </ViewCore>
  )
}
