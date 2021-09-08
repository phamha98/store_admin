import React, {useRef, forwardRef, useImperativeHandle, useState} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import {Light} from '@component'
import {ViewCore, ButtonIcon, ButtonBasic} from '@component'
import {IconCore, ImageCore, InputBasic} from './uiCore'
import {isEmpty} from 'underscore'
import {screen_width} from './Color'
import {ScrollView} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import {uriImg} from '@utils'

const RNSheetImage = (
  {
    height = 500,
    openDuration = 300,
    input,
    placeholder,
    onPressInput,
    onPress,
    title = 'OK',
  },
  ref,
) => {
  const refC = useRef()
  const refInput = useRef()
  const [image, setImage] = useState()
  useImperativeHandle(ref, () => ({
    open: () => {
      refC.current.open()
    },
    close: () => {
      refC.current.close()
    },
    getInput () {
      if (isEmpty(input)) return ''
      return refInput.current.getValue()
    },
    getImage () {
      if (isEmpty(image)) return false
      else return image
    },
  }))
  const gotoCamera = async () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      includeBase64: true,
    })
      .then(data => {
        setImage(data)
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
        setImage(data)
      })
      .catch(err => {})
  }
  return (
    <RBSheet
      ref={refC}
      closeOnDragDown={true}
      closeOnPressMask={false}
      height={height}
      openDuration={openDuration}>
      <ScrollView style={{flex: 1, backgroundColor: Light.border}}>
        <ViewCore alignItems marginBottom={100}>
          {input && (
            <ViewCore
              row
              centerHorizontal
              width={screen_width * 0.8}
              backgroundColor={Light.border}
              borderRadius={5}
              paddingRight={5}>
              <InputBasic
                width={screen_width * 0.6}
                ref={refInput}
                placeholder={placeholder}
                placeholderTextColor='#fff'
                style={{backgroundColor: Light.border, color: '#fff'}}
              />
              <IconCore
                onPress={() => refInput.current.focus()}
                name='close-circle-outline'
                size={30}
                color='#fff'
              />
              <IconCore
                onPress={onPressInput}
                name='checkbox-outline'
                size={30}
                color='#fff'
              />
            </ViewCore>
          )}

          <ButtonIcon
            icon='camera-outline'
            width='80%'
            title='Đi đến máy ảnh'
            onPress={gotoCamera}
            marginTop={10}
            paddingHorizontal={40}
            backgroundColor={Light.blue_faint}
          />
          <ButtonIcon
            icon='images-outline'
            width='80%'
            title='Đi đến Thư viện'
            onPress={gotoLibary}
            marginTop={10}
            paddingHorizontal={40}
            backgroundColor={Light.blue_faint}
            marginBottom={10}
          />
          <ImageCore
            source={uriImg(image ? (image.path ? image.path : '') : '')}
            width={'80%'}
            height={300}
          />

          <ViewCore row centerHorizontal width={'80%'}>
            <ButtonBasic
              title='Hủy'
              onPress={() => refC.current.close()}
              marginTop={10}
              backgroundColor={Light.toggle}
            />
            <ButtonBasic
              title={title}
              onPress={onPress}
              marginTop={10}
              backgroundColor={Light.blue_faint}
            />
          </ViewCore>
        </ViewCore>
      </ScrollView>
    </RBSheet>
  )
}
export default forwardRef(RNSheetImage)
const styles = StyleSheet.create({})
///forward reference
