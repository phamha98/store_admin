import React, {useState, useContext, useRef, useEffect} from 'react'
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
const {width, height} = Dimensions.get('window')
import {
  HeaderC,
  Layout,
  InputBasic,
  Light,
  ViewCore,
  AvatartCore,
} from '@component'
import {AppContext} from '@component/AppContext'
import {apiPersonUpdate} from '@api'
import {navigate, goBack} from '@navigation'
import BottomSheetCamera from './BottomSheetCamera'

export default function index ({route}) {
  const {token, idUser,lEP,setLEP} = useContext(AppContext)
  const {data} = route.params
  console.log('1.1', data)
  const refName = useRef()
  const refPhone = useRef()
  const refAddress = useRef()
  const sheetCam = useRef()
  const [img, setImg] = useState(null)
  const handleUpdate = () => {
    let name = refName.current.getValue()
    let phone = refPhone.current.getValue()
    let address = refAddress.current.getValue()
    let image = 'data:' + img.mime + ';base64,' + img.data
    apiPersonUpdate(token, idUser, name, phone, address, image)
    .then(r=>console.log(r))
    .catch(e =>
      console.log(e),
    )
    goBack()
    setLEP(!lEP)
  }
  useEffect(() => {
    setImg({path: data.img, data: '', mime: ''})
  }, [])
  console.log('1.5');
  const gotoCamera = async () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      includeBase64: true,
    })
      .then(data => {
        console.log(data)
        setImg(data)
        sheetCam.current.close()
      })
      .catch(err => {
        console.log('openCamera catch' + err.toString())
      })
  }
  const gotoLibary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      includeBase64: true,
    })
      .then(data => {
        console.log(data)
        setImg(data)
        sheetCam.current.close()
      })
      .catch(err => {
        console.log('openCamera catch' + err.toString())
      })
  }
  console.log('1.2', img)
  console.log('1.3', data.name)
  return (
    <Layout>
      <HeaderC
        onClickLeft={() => goBack()}
        title='Chỉnh sửa '
        rightNameIcon='checkmark-circle-outline'
        onClickRight={handleUpdate}
      />
      <ScrollView style={{paddingHorizontal: 10}}>
        <ViewCore alignItems marginTop={20}>
          <AvatartCore
            src={
              img
                ? img.path
                  ? {uri: img.path}
                  : require('@image/noimage.jpg')
                : require('@image/noimage.jpg')
            }
            size='xlarge'
            onPress={() => sheetCam.current.open()}
            activeOpacity={1}
            rounded
          />
        </ViewCore>

        <InputBasic
          ref={refName}
          backgroundColor={Light.blue_faint}
          color='#fff'
          placeholderTextColor='#fff'
          placeholder='Họ tên123'
          marginTop={10}
          valueInit={data.name ? data.name : ''}
        />
        <InputBasic
          valueInit={data.phone ? data.phone : ''}
          ref={refPhone}
          backgroundColor={Light.blue_faint}
          color='#fff'
          placeholderTextColor='#fff'
          placeholder='Số điện thoại'
          marginTop={10}
        />
        <InputBasic
          valueInit={data.address ? data.address : ''}
          ref={refAddress}
          backgroundColor={Light.blue_faint}
          color='#fff'
          placeholderTextColor='#fff'
          placeholder='Địa chỉ'
          marginTop={10}
        />
      </ScrollView>
      <BottomSheetCamera
        ref={sheetCam}
        height={220}
        openCamera={gotoCamera}
        openLibary={gotoLibary}
        onClose={() => sheetCam.current.close()}
        onPress={() => {}}
      />
    </Layout>
  )
}
