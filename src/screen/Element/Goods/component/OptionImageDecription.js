import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  createRef,
  useRef,
} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {
  ButtonBasic,
  ViewCore,
  TextCore,
  Light,
  ToastAndroidLong,
  RNSheetImage,
  ImageCore,
  IconCore,
  RowInfo,
} from '@component'
import {uriImg} from '@utils'
const OptionImageDecription = ({valueInit}, ref) => {
  const refMedia = useRef()
  const [arrayImg, setArrayImg] = useState(valueInit?valueInit:[])
  const [r, setR] = useState(false)
  const handleAddImage = () => {
    let first_data = arrayImg
    const tem_image = refMedia.current.getImage()
    first_data.push({
      name: tem_image.path,
      base64: 'data:' + tem_image.mime + ';base64,' + tem_image.data,
    })
    setArrayImg(first_data)
    setR(!r)
    refMedia.current.close()
  }
  useImperativeHandle(ref, () => ({
    getValue: () => {
      return arrayImg
    },
  }))
  const handleRemoveImageItem = index => {
    let first_data = arrayImg
    first_data.splice(index, 1)
    setArrayImg(first_data)
    setR(!r)
  }
  return (
    <ViewCore padding={5} borderRadius={5} backgroundColor='#fff' marginTop={5}>
      <RowInfo
        label='Ảnh mô tả'
        sizeL={20}
        backgroundColor='#AFAFAF'
        styleL={{color: '#fff'}}
        borderRadius={0}
      />
      {arrayImg.map((item, index) => (
        <ViewCore
          key={index}
          backgroundColor='gray'
          padding={5}
          marginTop={5}
          alignItems>
          <ImageCore
            source={uriImg(item ? (item.name ? item.name : '') : '')}
            width={'80%'}
            height={300}
          />
          <IconCore
            onPress={() => handleRemoveImageItem(index)}
            name='close-outline'
            color={Light.danger}
            size={40}
            style={{position: 'absolute', right: 0}}
          />
        </ViewCore>
      ))}
      <ButtonBasic
        marginTop={10}
        title='Thêm ảnh mô tả'
        width={120}
        onPress={() => refMedia.current.open()}
      />
      <RNSheetImage
        ref={refMedia}
        height={600}
        onPress={handleAddImage}
        title='Thêm'
      />
    </ViewCore>
  )
}
export default forwardRef(OptionImageDecription)
const styles = StyleSheet.create({})
