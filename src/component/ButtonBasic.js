import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'

export default function ButtonBasic ({
  title,
  width,
  height,
  onPress,
  backgroundColor,
  styleTitle,
  style,
  alignItems,
  ...rest
}) {
  const styleAdd = [alignItems && {alignItems: 'center'}]
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          width: width,
          height: height,
          backgroundColor: backgroundColor,
          ...rest,
        },
        style,
        styleAdd,
      ]}
      onPress={onPress}>
      <Text style={[styleTitle, styles.title]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
  },
})
ButtonBasic.defaultProps = {
  width: 100,
  height: 40,
  title: '',
  backgroundColor: '#11ca71',
  onPress: null,
  styleTitle: {},
}
