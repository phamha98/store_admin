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
import {apiInsertTypeMain, apiUpdateTypeMain, apiLibaryInsert} from '@api'
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
const str_1 = 'Vui lòng chọn ảnh mô tả!'
const str_2 = 'Thêm thành công mặt hàng.'
const str_3 = 'Cập nhật thành công mặt hàng.'
const str_4 = 'Đã xảy ra lỗi vui lòng thử lại sau!'
const str_5 = 'Không có sự thay đổi !'
const Notify = y => {
  switch (y) {
    case 1:
      ToastAndroidLong(str_1)
      break
    case 2:
      ToastAndroidLong(str_2)
      break
    case 3:
      ToastAndroidLong(str_3)
      break
    case 4:
      ToastAndroidLong(str_4)
      break
    case 5:
      ToastAndroidLong(str_5)
      break
    default:
      break
  }
}
export default function index ({route}) {
  const {type, item} = route.params
  console.log(item)
  const {token} = useContext(AppContext)
  const refName = useRef()
  const refCamSheet = useRef()
  const [image, setImage] = useState({path: item ? item.img : ''})
  //handle
  const handleSubmit = () => {
    const name = refName.current.getValue()
    if (isEmpty(image.path)) return Notify(1)
    switch (type) {
      case 'insert':
        const formData = new FormData()
        formData.append('file', {
          uri: image.path,
          name: image.path,
          type: image.mime,
        })
        apiLibaryInsert(token, formData)
          .then(e => {
            console.log('e.image ', e.image)
            if (e.code === 200) {
              apiInsertTypeMain(token, name, e.image, '0').then(result => {
                if (result.code === 200) Notify(2)
                goBack()
              })
            }
          })
          .catch(err => console.log(err))
        break
      case 'update':
        console.log(image)
        let temp = image.path.slice(0, 4)
        if (temp === 'http') {
          if (item.name === name) return Notify(5)
          apiUpdateTypeMain(token, item.id, name, image.path)
            .then(result => {
              console.log(result)
              if (result.code == 200) {
                Notify(3)
                goBack()
              } else Notify(4)
            })
            .catch(e => console.log(e))
        } else {
          const formData = new FormData()
          formData.append('file', {
            uri: image.path,
            name: image.path,
            type: image.mime,
          })
          apiLibaryInsert(token, formData)
            .then(e => {
              console.log('e.image ', e.image)
              if (e.code === 200) {
                apiUpdateTypeMain(token, item.id, name, e.image).then(
                  result => {
                    if (result.code === 200) {
                      Notify(3)
                      goBack()
                    } else Notify(4)
                  },
                )
              }
            })
            .catch(err => console.log(err))
        }
        break
      default:
        break
    }
  }

  const handleChoseImage = () => {
    let _image = refCamSheet.current.getImage()
    setImage(_image)
    refCamSheet.current.close()
  }

  return (
    <Layout backgroundColor={Light.border}>
      <HeaderC
        title={
          item ? 'Cập nhật LH ' + (item.name ? item.name : '') : 'Thêm mới LH '
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
          source={uriImg(image.path)}
          width={screen_width * 0.8}
          height={screen_width * 0.8}
        />
      </ViewCore>
      <RNSheetImage ref={refCamSheet} onPress={handleChoseImage} height={600} />
    </Layout>
  )
}
