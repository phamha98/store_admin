import React from 'react'
import {StyleSheet} from 'react-native'
import {
  ButtonBasic,
  ImageCore,
  Light,
  screen_width,
  TextCore,
  ViewCore,
} from '@component'
import {isEmpty} from 'underscore'
export default function ItemPost ({item, onUpdate, onRemove}) {
  if (isEmpty(item)) return null
  return (
    <ViewCore
      backgroundColor='#fff'
      style={{borderWidth: 1, borderColor: Light.blue_faint}}
      paddingHorizontal={10}
      marginBottom={20}>
      <ViewCore
        alignItems
        justifyContent
        minHeight={50}
        style={{borderBottomWidth: 1, borderColor: 'gray'}}>
        <TextCore>{item.title}</TextCore>
      </ViewCore>

      <ImageCore
        source={item.img ? {uri: item.img} : require('@image/noimage.jpg')}
        width='100%'
        height={250}
      />
      <ViewCore>
        <TextCore style={{maxWidth: screen_width - 10}}>
          {item.content}
        </TextCore>
      </ViewCore>
      <ViewCore row centerHorizontal paddingHorizontal={10} marginVertical={10}>
        <ButtonBasic title='Sửa' onPress={onUpdate} height={30} />
        <ButtonBasic
          title='Xóa'
          onPress={onRemove}
          height={30}
          backgroundColor={Light.danger}
        />
      </ViewCore>
    </ViewCore>
  )
}

const styles = StyleSheet.create({})
