import React, {useRef, forwardRef, useImperativeHandle} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import {Light} from '@component'
import {ViewCore, ButtonIcon, ButtonBasic} from '@component'
import {IconCore, InputBasic} from './uiCore'
import {isEmpty} from 'underscore'
import {screen_width} from './Color'
import {ScrollView} from 'react-native'
const BottomSheetCamera = (
  {
    height = 400,
    openDuration = 300,
    openCamera,
    openLibary,
    onClose,
    input,
    placeholder,
    onPressInput,
  },
  ref,
) => {
  const refC = useRef()
  const refInput = useRef()
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
  }))

  return (
    <RBSheet
      ref={refC}
      closeOnDragDown={true}
      closeOnPressMask={false}
      height={height}
      openDuration={openDuration}>
      <ViewCore alignItems style={styles.viewChose}>
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
          onPress={openCamera}
          marginTop={10}
          paddingHorizontal={40}
          backgroundColor={Light.blue_faint}
        />
        <ButtonIcon
          icon='images-outline'
          width='80%'
          title='Đi đến Thư viện'
          onPress={openLibary}
          marginTop={10}
          paddingHorizontal={40}
          backgroundColor={Light.blue_faint}
        />
        <ButtonBasic
          title='Hủy'
          width='80%'
          height={50}
          onPress={onClose}
          marginTop={10}
          backgroundColor={Light.blue_faint}
        />
      </ViewCore>
    </RBSheet>
  )
}
export default forwardRef(BottomSheetCamera)
const styles = StyleSheet.create({})
///forward reference
