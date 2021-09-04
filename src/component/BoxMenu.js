import React from 'react'
import {TouchableOpacity} from 'react-native'
import {StyleSheet, Text, View} from 'react-native'
import {isEmpty} from 'underscore'
import {ViewCore, Light} from './index'
import {IconCore, TextCore, TouchableCore} from './uiCore'
export default function BoxMenu ({item, onPress, name, icon}) {
  return (
    <TouchableCore
      onPress={onPress}
      activeOpacity={1}
      row
      width={'90%'}
      backgroundColor={Light.blue_faint}
      height={100}
      marginBottom={10}
      paddingHorizontal={10}
      centerHorizontal
      style={{borderRadius: 5}}>
      <TextCore color='#fff' size={16}>
        {item ? item.name : name}
      </TextCore>
      <IconCore color='#fff' name={item ? item.icon : icon} size={30} />
    </TouchableCore>
  )
}

const styles = StyleSheet.create({})
