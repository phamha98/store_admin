import React from 'react'
import {StyleSheet, Text, TouchableOpacity} from 'react-native'
import {ViewCore, TextCore, Light, screen_width, ImageCore} from './index'
import ButtonBasic from './ButtonBasic'
import {isEmpty} from 'underscore'
export default function ItemTypeProduct ({
  item,
  onPress,
  onRemove,
  onUpdate,
}) {
  if (isEmpty(item)) return null
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <ViewCore
        width={screen_width / 2 - 10}
        minHeight={150}
        margin={5}
        spaceBetween
        padding={5}
        style={styles.container}>
        <ViewCore alignItems>
          <ImageCore source={{uri: item.img}}  width='100%' height={200}  />
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

        <ViewCore row centerHorizontal marginTop={10}>
          {item.id !== -1 && (
            <>
              <ButtonBasic
                title={'Sửa'}
                style={styles.button}
                backgroundColor={Light.blue_faint}
                onPress={onUpdate}
              />
              <ButtonBasic
                title={'Xóa'}
                style={styles.button}
                backgroundColor={Light.danger}
                onPress={onRemove}
              />
            </>
          )}
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
    width: 80,
    height: 25,
  },
  container: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#3887ff',
    backgroundColor: '#eceff2',
  },
})
