import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Avatar} from 'react-native-elements'

export default function AvatartCore ({
  src,
  size,
  style,
  title,
  activeOpacity,
  ...rest
}) {
  return (
    <Avatar
      size={size}
      title={title}
      activeOpacity={activeOpacity}
      source={src}
      containerStyle={style}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({})
AvatartCore.defaultProps = {
  src: null,
  size: 'small',
  style: {},
  title: '',
  activeOpacity: 0.5,
}
