import React, {useState, useEffect, useContext} from 'react'
import {StyleSheet} from 'react-native'
import {
  HeaderC,
  Layout,
  Light,
  AppContext,
  ViewCore,
  TextCore,
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
  const [render,setRender]=useState(false)
  useEffect(() => {
    apiPersonShow(token, idUser)
      .then(data => {
        console.log(data.data)
        setData(data.data)
      })
      .catch(e => console.log(e))
  }, [lEP])
  console.log('1.4',"person");
  return (
    <Layout>
      <HeaderC
        title='Thông tin cá nhân'
        onClickLeft={() => goBack()}
        onClickRight={() => setRender(!render)}
      />
      {data && (
        <ViewCore alignItems marginTop={10} style={styles.content}>
          <ViewCore alignItems>
            <ImageCore
              source={data.img ? data.img : require('@image/noimage.jpg')}
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
              onPress={()=>navigate("EditPerson",{data:data})}
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
    marginVertical:2
  },
})
