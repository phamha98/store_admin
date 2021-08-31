import React, {useState, useEffect, useContext} from 'react'
import {FlatList, StatusBar, StyleSheet} from 'react-native'
import {
  HeaderC,
  data_home,
  Layout,
  Light,
  AppContext,
  ViewCore,
  TextCore,
  ItemUser,
  ImageCore,
  screen_width,
  ButtonBasic,
  screen_height,
} from '@component'
import {navigate, goBack} from '@navigation'
import {apiPersonShow} from '@api'

export default function index () {
  const {token, idUser, lEP, setLEP} = useContext(AppContext)
  const [data, setData] = useState(null)
  useEffect(() => {
    apiPersonShow(token, idUser)
      .then(data => {
        console.log(data.data)
        setData(data.data)
      })
      .catch(e => console.log(e))
  }, [])
  return (
    <Layout>
      <HeaderC
        title='Thông tin cá nhân'
        onClickLeft={() => goBack()}
        onClickRight={() => {}}
      />
      {data && (
        <ViewCore alignItems marginTop={10} style={styles.content}>
          <ViewCore alignItems>
            <ImageCore
              source={data.img ? data.img : require('@image/avatar.jpeg')}
            />
            <TextCore bold color='blue' size={23}>
              {data.name}
            </TextCore>
          </ViewCore>
          <ViewCore width={0.5 * screen_width}>
            <TextCore style={styles.text}>
              Email:{data.email ? data.email : '*****'}
            </TextCore>
            <TextCore style={styles.text}>
              Phone:{data.phone ? data.phone : 'Chưa có thông tin'}
            </TextCore>
            <TextCore style={styles.text}>
              Gender:{data.gender ? data.gender : 'Chưa có thông tin'}
            </TextCore>
            <TextCore style={styles.text}>
              Address:{data.address ? data.address : 'Chưa có thông tin'}
            </TextCore>
          </ViewCore>
          <ViewCore>
            <ButtonBasic
              backgroundColor='orange'
              title='Chỉnh sửa'
              width={0.5 * screen_width}
            />
            <ButtonBasic
              marginTop={10}
              title='Đăng xuất khỏi hệ thống'
              width={0.5 * screen_width}
              backgroundColor='gray'
            />
          </ViewCore>
        </ViewCore>
      )}
    </Layout>
  )
}
let o = {
  address: null,
  birthday: null,
  created_at: null,
  email: 'm',
  email_verified_at: null,
  gender: 'nam',
  id: 1,
  img: null,
  name: 'Pham tran quang ha',
  phone: null,
  updated_at: null,
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: Light.background,
    marginHorizontal: 30,
    paddingVertical: 30,
    borderRadius: 5,
    justifyContent: 'space-between',
    height: 0.8 * screen_height,
  },
  text: {
    color: '#05B9E6',
    fontSize: 16,
  },
})
