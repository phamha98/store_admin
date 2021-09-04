import React from 'react'
import {StyleSheet, Text, TouchableOpacity} from 'react-native'
 import {ViewCore, TextCore, Light, screen_width, ImageCore} from './index'
import ButtonBasic from './ButtonBasic'
import {isEmpty} from 'underscore'
export default function ItemTypeProduct ({
  item,
  onPress,
  onRemove,
  onSeen,
  onUpdate,
}) {

  if (isEmpty(item)) return null
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <ViewCore
        width={screen_width / 2 - 10}
        height={150}
        margin={5}
        spaceBetween
        padding={5}
        style={styles.container}>
        <ViewCore alignItems>
          <ImageCore source={{uri: item.img}} />
        </ViewCore>
        <ViewCore
          position='absolute'
          left={0}
          right={0}
          alignItems
          paddingTop={50}>
          <TextCore size={25} color='red' bold color={Light.blue_faint}>
            {item.name}
          </TextCore>
        </ViewCore>

        <ViewCore row centerHorizontal>
          <ButtonBasic
            title={'Sửa'}
            style={styles.button}
            backgroundColor={Light.toggle}
            onPress={onUpdate}
          />
          <ButtonBasic
            title={'Xóa'}
            style={styles.button}
            backgroundColor={Light.primary}
            onPress={onRemove}
          />
          <ButtonBasic title={'Xem'} style={styles.button} onPress={onSeen} />
        </ViewCore>
      </ViewCore>
    </TouchableOpacity>
  )
}

ItemTypeProduct.defaultProps = {
  item: {},
  onPress: null,
  onRemove: null,
  onSeen: null,
  onUpdate: null,
}
const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 25,
  },
  container: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor:"#3887ff",
    backgroundColor: '#eceff2',
  },
})
