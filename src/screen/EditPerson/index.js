import React, {useState, useContext, useRef, useEffect} from 'react'
import {TouchableOpacity, ScrollView, RefreshControl} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import {
  HeaderC,
  Layout,
  InputBasic,
  Light,
  ViewCore,
  AppContext,
  ImageCore,
  RNSheetImage,
  LabelPicker,
  ToastAndroidLong,
} from '@component'
import {apiPersonUpdate, apiPersonShow} from '@api'
import {replace, goBack} from '@navigation'
import {isEmpty} from 'underscore'
import {uriImg} from '@utils'
export default function index () {
  const {token, idUser} = useContext(AppContext)
  const refName = useRef()
  const refPhone = useRef()
  const refAddress = useRef()
  const refGender = useRef()
  const refImage = useRef()
  const [refreshing, setRefreshing] = useState(true)
  const [img, setImg] = useState(false)
  const [data, setData] = useState(null)
  //
  const handleUpdate = () => {
    let name = refName.current.getValue()
    let phone = refPhone.current.getValue()
    let address = refAddress.current.getValue()
    let gender = refGender.current.getValue()
    let image = img.path
    if (img.data) image = 'data:' + img.mime + ';base64,' + img.data
    // console.log(token, idUser, name, phone, address, gender, image)
    apiPersonUpdate(token, idUser, name, phone, address, gender, image)
      .then(r => {
        if (r.code === 200) ToastAndroidLong('Thành công')
        else ToastAndroidLong('Thất bại')
      })
      .catch(e => console.log(e))
  }

  useEffect(() => {
    apiPersonShow(token, idUser)
      .then(r => {
        if (r.code == 200) {
          setData(r.data)
          setImg({path: r.data.img})
        }
      })
      .catch(e => console.log(e))
      .finally(() => setRefreshing(false))
  }, [refreshing])
  const handleAlow = () => {
    let tem_img = refImage.current.getImage()
    setImg(tem_img)
    refImage.current.close()
  }
  return (
    <Layout>
      <HeaderC
        title='Chỉnh sửa '
        rightNameIcon='checkmark-circle-outline'
        onClickRight={handleUpdate}
      />
      {data && (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => setRefreshing(true)}
            />
          }
          style={{paddingHorizontal: 10}}>
          <ViewCore alignItems marginTop={20}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{borderRadius: 100, overflow: 'hidden'}}
              onPress={() => refImage.current.open()}>
              <ImageCore
                source={uriImg(img ? img.path : '')}
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
            marginVertical={10}
            valueInit={data ? data.name : ''}
          />
          <LabelPicker
            ref={refGender}
            label='Giới tính'
            valueInit={data ? data.gender : 'nam'}
            data={[
              {name: 'Nam', id: 'nam'},
              {name: 'Nữ', id: 'nu'},
            ]}
            backgroundColor={Light.blue_faint}
            marginBottom={10}
            styleLabel={{color: '#fff', paddingLeft: 10}}
            stylePicker={{color: '#fff'}}
          />
          <InputBasic
            valueInit={data ? data.phone : ''}
            ref={refPhone}
            backgroundColor={Light.blue_faint}
            color='#fff'
            placeholderTextColor='#fff'
            placeholder='Số điện thoại'
            marginBottom={10}
            keyboardType='numeric'
            
          />
          <InputBasic
            valueInit={data ? data.address : ''}
            ref={refAddress}
            backgroundColor={Light.blue_faint}
            color='#fff'
            placeholderTextColor='#fff'
            placeholder='Địa chỉ'
            marginBottom={10}
            returnKeyType='send'
            onSubmitEditing={handleUpdate}
          />
        </ScrollView>
      )}
      <RNSheetImage
        ref={refImage}
        height={550}
        title='Chọn'
        onPress={handleAlow}
      />
    </Layout>
  )
}
