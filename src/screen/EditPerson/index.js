import React, {useState, useContext, useRef, useEffect} from 'react'
import {TouchableOpacity, ScrollView, Dimensions} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import {
  HeaderC,
  Layout,
  InputBasic,
  Light,
  ViewCore,
  AppContext,
  ImageCore,
  BottomSheetCamera,
} from '@component'
import {apiPersonUpdate, apiPersonShow} from '@api'
import {replace, goBack} from '@navigation'
import {isEmpty} from 'underscore'
export default function index () {
  const {token, idUser, lEP, setLEP} = useContext(AppContext)
  const refName = useRef()
  const refPhone = useRef()
  const refAddress = useRef()
  const sheetCam = useRef()
  const [img, setImg] = useState(null)
  const [data, setData] = useState(null)
  //
  const handleUpdate = () => {
    let name = refName.current.getValue()
    let phone = refPhone.current.getValue()
    let address = refAddress.current.getValue()
    let image = 'data:' + img.mime + ';base64,' + img.data
    apiPersonUpdate(token, idUser, name, phone, address, image)
      .then(r => console.log(r))
      .catch(e => console.log(e))
    goBack()
    setLEP(!lEP)
  }

  useEffect(() => {
    apiPersonShow(token, idUser)
      .then(r => {
        // console.log(r.data)
        setData(r.data)
        setImg({path: r.data.img, data: '', mime: ''})
      })
      .catch(e => console.log(e))
  }, [])
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
      .catch(err => {})
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
      .catch(err => {})
  }
  if (isEmpty(data)) return null
  return (
    <Layout>
      <HeaderC
        title='Chỉnh sửa '
        rightNameIcon='checkmark-circle-outline'
        onClickRight={handleUpdate}
      />
      <ScrollView style={{paddingHorizontal: 10}}>
        <ViewCore alignItems marginTop={20}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{borderRadius: 100, overflow: 'hidden'}}
            onPress={() => sheetCam.current.open()}>
            <ImageCore
              source={
                img
                  ? img.path
                    ? {uri: img.path}
                    : require('@image/noimage.jpg')
                  : require('@image/noimage.jpg')
              }
              width={200}
              height={200}
            />
          </TouchableOpacity>
        </ViewCore>

        <InputBasic
          ref={refName}
          backgroundColor={Light.blue_faint}
          color='#fff'
          placeholderTextColor='#fff'
          placeholder='Họ tên123'
          marginTop={10}
          valueInit={data.name}
        />
        <InputBasic
          valueInit={data.phone}
          ref={refPhone}
          backgroundColor={Light.blue_faint}
          color='#fff'
          placeholderTextColor='#fff'
          placeholder='Số điện thoại'
          marginTop={10}
        />
        <InputBasic
          valueInit={data.address}
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
