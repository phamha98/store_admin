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
} from '@component'
import {navigate} from '@navigation'
import {uriImg} from '@utils'
export default function index ({route}) {
  const {type, item} = route.params
  const {token} = useContext(AppContext)
  const refName = useRef()
  const refCamSheet = useRef()
  const [imageTemp, setImageTemp] = useState(item ? item.img : '')
  const [base64, setBase64] = useState('')
  const [urlImage, setUrlImage] = useState('')
  const [post, setPost] = useState(false)
  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      //cropping: true,
      includeBase64: true,
    })
      .then(image => {
        //console.log(image);
        setImageTemp(image.path)
        setBase64('data:' + image.mime + ';base64,' + image.data)
        setPost(true)
        setUrlImage('')
        refCamSheet.current.close()
      })
      .catch(err => {
        console.log('openCamera catch' + err.toString())
      })
  }

  const openLibary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      //cropping: true,
      includeBase64: true,
    })
      .then(image => {
        //console.log(image);
        setImageTemp(image.path)
        setBase64('data:' + image.mime + ';base64,' + image.data)
        setPost(true)
        setUrlImage('')
        refCamSheet.current.close()
      })
      .catch(err => {
        console.log('openCamera catch' + err.toString())
      })
  }

  const handleSubmit = () => {
    let name = refName.current.getValue()
    if (item && type === 'update') {
      console.log('x.1');
      apiUpdateTypeMain(token, item.id, name, base64, imageTemp, post)
        .then(result => {
          if (result.code == 200) {
            console.log(result)
            ToastAndroidLong(result.message)
          }
        })
        .catch(err => console.log(err))
    } else {
      apiInsertTypeMain(token, name, base64, imageTemp, post)
        .then(result => {
          console.log(result)
          if (result.code == 200) {
            console.log(result)
            ToastAndroidLong(result.message)
          }
        })
        .catch(err => console.log(err))
    }
  }
  const handleSetLink = () => {
    let url = refCamSheet.current.getInput()
    setUrlImage(url)
  }
  return (
    <Layout backgroundColor={Light.border}>
      <HeaderC
        title={
          item
            ? 'Cập nhật ' + (item.name ? item.name : '')
            : 'Thêm mới'
        }
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
          source={uriImg(imageTemp)}
          width={screen_width * 0.8}
          height={screen_width * 0.8}
        />
      </ViewCore>
      <BottomSheetCamera
        ref={refCamSheet}
        height={500}
        openCamera={openCamera}
        openLibary={openLibary}
        onClose={() => refCamSheet.current.close()}
        input
        placeholder='Nhập vào đường dẫn'
        onPressInput={handleSetLink}
      />
    </Layout>
  )
}
