import React from 'react'
import {StyleSheet, Text, View, Image} from 'react-native'

import {
  Light,
  HeaderC,
  Layout,
  screen_width,
  screen_height,
  TextCore,
  ViewCore,
  ImageCore,
  ButtonBasic,
} from '@component'
export default function index ({route}) {
  const {data} = route.params
  return (
    <Layout>
      <HeaderC title='Hồ sơ' />
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
              Sdt:{data.phone ? data.phone : 'Chưa có thông tin'}
            </TextCore>
            <TextCore style={styles.text}>
              Giới tính:{data.gender ? data.gender : 'Chưa có thông tin'}
            </TextCore>
            <TextCore style={styles.text}>
              Địa chỉ:{data.address ? data.address : 'Chưa có thông tin'}
            </TextCore>
          </ViewCore>
          <ButtonBasic
            backgroundColor={Light.danger}
            title='Xóa'
            width={0.5 * screen_width}
            onPress={() => {}}
          />
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
    marginVertical: 2,
  },
})
