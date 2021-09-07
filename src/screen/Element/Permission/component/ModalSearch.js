import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {
  apiListUserRole,
  apiSearchAcountName,
  apiInsertRoleUser,
  apiDeleteRoleUser,
} from '@api'
import {
  AppContext,
  HeaderC,
  Layout,
  ItemUserPermission,
  ButtonBasic,
  ToastAndroidLong,
  ViewCore,
  TextCore,
  uriImg,
  InputBasic,
  ImageCore,
  Light,
  screen_width,
  IconCore,
  ItemUserGroup,
} from '@component'
import {isEmpty, isObject} from 'underscore'
function ModalSearch ({listCurrent, idRole, onClose}, ref) {
  const {token} = useContext(AppContext)
  const [isShow, setIshow] = useState(false)
  const [data, setData] = useState([])
  const refName = useRef()
  useImperativeHandle(ref, () => ({
    open () {
      setIshow(true)
    },
    close () {
      setIshow(false)
    },
  }))
  const check = id => {
    let temp = listCurrent.find(item => item.id == id)
    return isObject(temp)
  }
  const handleSearch = () => {
    let name = refName.current.getValue()
    if (isEmpty(name)) return ToastAndroidLong('Nhập vào tên tài khoản')
    apiSearchAcountName(token, name).then(r => {
      if (r.code === 200) {
        let temp = r.data
        let lat = []
        temp.forEach(item => {
          let test = check(item.id)
          if (!test) lat.push(item)
        })
        setData(lat)
      }
    })
  }
  const handlerAddAccount = item => {
    apiInsertRoleUser(token, idRole, item.id)
      .then(r => {
        console.log(r)
        if (r.code === 200) {
          if (r.data === true) {
            ToastAndroidLong('Thành công')
            listCurrent.push(item)
            handleSearch()
          } else ToastAndroidLong(r.data)
        } else ToastAndroidLong('Thất bại')
      })
      .catch(e => console.log(e))
  }

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isShow}
      onRequestClose={() => setIshow(false)}>
      <ViewCore flex1 backgroundColor='#0000001F'>
        <ViewCore
          margin={5}
          backgroundColor={Light.border}
          borderRadius={5}
          padding={10}
          height={'100%'}>
          <ViewCore row centerHorizontal padding={10}>
            <TextCore size={20} bold color={'#fff'}>
              Thêm người dùng vào nhóm
            </TextCore>
            <IconCore
              name='close-outline'
              color='#fff'
              size={30}
              onPress={onClose}
            />
          </ViewCore>

          <ViewCore
            row
            backgroundColor='#fff'
            centerHorizontal
            paddingRight={10}
            borderRadius={5}>
            <InputBasic
              ref={refName}
              placeholder='Nhập tên tài khoản'
              style={{maxWidth: 320, minWidth: 300}}
            />
            <IconCore
              name='search'
              color={Light.border}
              size={30}
              onPress={handleSearch}
            />
          </ViewCore>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <ItemUserGroup
                item={item}
                onPress={() => handlerAddAccount(item)}
              />
            )}
          />
        </ViewCore>
      </ViewCore>
    </Modal>
  )
}
export default forwardRef(ModalSearch)
const styles = StyleSheet.create({})
