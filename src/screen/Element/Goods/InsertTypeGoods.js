import React, {useState, useEffect, useContext, useRef} from 'react'
import {
  Button,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  ToastAndroid,
  Alert,
} from 'react-native'

import ImagePicker from 'react-native-image-crop-picker'
import {apiInsertTypeMain, apiUpdateTypeMain} from '@api'
import {
  AppContext,
  HeaderC,
  Layout,
  ToastAndroidLong,
  ButtonBasic,
  ViewCore,
  TextCore,
  Light,
  InputBasic,
  ButtonIcon,
  ImageCore,
  screen_width,
  BottomSheetCamera,
  RNSheetImage,
} from '@component'
import {goBack, navigate} from '@navigation'
import {uriImg} from '@utils'
import {isEmpty} from 'underscore'
export default function index ({route}) {
  const {type, item} = route.params
  console.log(item)
  const {token} = useContext(AppContext)
  const refName = useRef()
  const refCamSheet = useRef()
  const [image, setImage] = useState({path: item ? item.img : '', data: false})

  const handleSubmit = () => {
    let name = refName.current.getValue()
    let image_send = ''
    if (isEmpty(image.path)) return ToastAndroidLong('Vui lòng chọn ảnh mô tả!')
    if (image.data) {
      image_send = 'data:' + image.mime + ';base64,' + image.data
    }
    if (item && type === 'update') {
      console.log('x.1')
      apiUpdateTypeMain(token, item.id, name, image_send)
        .then(result => {
          console.log(result)
          if (result.code == 200) {
            console.log(result)
            ToastAndroidLong('Cập nhật thành công mặt hàng.')
            goBack()
          } else {
            ToastAndroidLong('Đã xảy ra lỗi vui lòng thử lại sau!')
          }
        })
        .catch(e => console.log(e))
    } else {
      apiInsertTypeMain(token, name, image_send)
        .then(result => {
          console.log(result)
          if (result.code == 200) {
            console.log(result)
            ToastAndroidLong('Thêm thành công mặt hàng.')
            goBack()
          } else {
            ToastAndroidLong('Đã xảy ra lỗi vui lòng thử lại sau!')
          }
        })
        .catch(e => console.log(e))
    }
  }
  const handleSetLink = () => {
    let url = refCamSheet.current.getInput()
    console.log(url)
    setImage({path: url, data: false})
    refCamSheet.current.close()
  }
  const handleChoseImage = () => {
    let _image = refCamSheet.current.getImage()
    setImage(_image)
    refCamSheet.current.close()
  }
  return (
    <Layout backgroundColor={Light.border}>
      <HeaderC
        title={item ? 'Cập nhật ' + (item.name ? item.name : '') : 'Thêm mới'}
      />

      <ViewCore margin={10} marginTop={30} alignItems flex1>
        <InputBasic
          valueInit={item ? item.name : ''}
          ref={refName}
          placeholder='Nhập vào tên loại hàng'
          style={{width: 0.8 * screen_width}}
        />
        <ButtonIcon
          marginVertical={20}
          style={{width: 0.8 * screen_width}}
          icon='image-outline'
          backgroundColor={Light.primary}
          title={item ? 'Chỉnh sửa ảnh' : 'Chọn ảnh mô tả'}
          onPress={() => refCamSheet.current.open()}
        />
        <ButtonBasic
          marginBottom={20}
          style={{width: 0.8 * screen_width}}
          height={50}
          title={item ? 'Cập nhật Loại Hàng' : 'Thêm Loại hàng mới'}
          onPress={handleSubmit}
        />
        <ImageCore
          source={uriImg(image.path)}
          width={screen_width * 0.8}
          height={screen_width * 0.8}
        />
      </ViewCore>
      <RNSheetImage
        ref={refCamSheet}
        onPressInput={handleSetLink}
        onPress={handleChoseImage}
        input
        placeholder='Nhập vào đường dẫn'
        height={600}
      />
    </Layout>
  )
}
