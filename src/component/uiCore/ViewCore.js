import React from 'react'
import {StyleSheet, Text, View} from 'react-native'

export default function ViewCore ({
  children,
  width,
  height,
  backgroundColor,
  alignItems,
  justifyContent,
  midle,
  row,
  style,
  spaceBetween,
  centerHorizontal,
  ...rest
}) {
  const styleAdd = [
    row && {flexDirection: 'row'},
    alignItems && {alignItems: 'center'},
    justifyContent && {justifyContent: 'center'},
    midle && {alignItems: 'center', justifyContent: 'center'},
    spaceBetween && {justifyContent: 'space-between'},
    centerHorizontal && {alignItems: 'center', justifyContent: 'space-between'},
    {
      width: width,
      height: height,
      backgroundColor: backgroundColor,
      ...rest
    },

  ]
  return <View style={[styleAdd, style]}>{children}</View>
}

const styles = StyleSheet.create({
  s: {
    justifyContent: 'space-between',
  },
})
