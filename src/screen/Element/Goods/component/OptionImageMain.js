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
  RowInfo,
} from '@component'
import {uriImg} from '@utils'
const OptionImageMain = ({valueInit}, ref) => {
  const refMedia = useRef()
  const [image, setImage] = useState(valueInit ? valueInit : false)
  const handleGet = () => {
    let tem_image = refMedia.current.getImage()
    setImage(tem_image)
    refMedia.current.close()
  }
  useImperativeHandle(ref, () => ({
    getValue: () => {
      let value = image

      if (value) {
        if (image.mime && image.data)
          value = 'data:' + image.mime + ';base64,' + image.data
        else value = image.path
      }
      return value
    },
  }))
  return (
    <ViewCore padding={5} borderRadius={5} backgroundColor='#fff'>
      <RowInfo
        label='Ảnh chính'
        sizeL={20}
        backgroundColor='#AFAFAF'
        styleL={{color: '#fff'}}
        borderRadius={0}
      />

      {image && (
        <ViewCore backgroundColor='gray' padding={5} marginTop={5} alignItems>
          <ImageCore
            source={uriImg(image ? (image.path ? image.path : '') : '')}
            width={'80%'}
            height={300}
          />
        </ViewCore>
      )}
      <ButtonBasic
        marginTop={10}
        title='Chọn ảnh chính'
        onPress={() => refMedia.current.open()}
      />
      <RNSheetImage
        ref={refMedia}
        height={600}
        onPress={handleGet}
        title='Thay đổi'
      />
    </ViewCore>
  )
}
export default forwardRef(OptionImageMain)
const styles = StyleSheet.create({})
