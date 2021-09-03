import React, {useRef, forwardRef, useImperativeHandle} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import {Light} from '@component'
import {ViewCore, ButtonIcon, ButtonBasic} from '@component'
const BottomSheetCamera = (
  {height = 400, openDuration = 300, openCamera, openLibary, onClose},
  ref,
) => {
  const refC = useRef()
  useImperativeHandle(ref, () => ({
    open: () => {
      refC.current.open()
    },
    close: () => {
      refC.current.close()
    },
  }))
  return (
    <RBSheet
      ref={refC}
      closeOnDragDown={true}
      closeOnPressMask={false}
      height={height}
      openDuration={openDuration}
      customStyles={[
        {
          wrapper: {
            backgroundColor: 'transparent',
            backgroundColor: Light.card,
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        },
      ]}>
      <ViewCore alignItems style={styles.viewChose}>
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
