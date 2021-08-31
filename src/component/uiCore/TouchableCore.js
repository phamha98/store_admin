import React from 'react'
import {TouchableOpacity} from 'react-native'
import {TextCore} from '@component'
import {Children} from 'react'

export default function TouchableCore ({
  title,
  children,
  titleColor,
  titleSize,
  titleStyle,
  bacgroundColor,
  width,
  height,
  onPress,
  row,
  alignItems,
  justifyContent,
  midle,
  spaceBetween,
  centerHorizontal,
  style,
  ...rest
}) {
  const styleAdd = [
    row && {flexDirection: 'row'},
    alignItems && {alignItems: 'center'},
    justifyContent && {justifyContent: 'center'},
    midle && {alignItems: 'center', justifyContent: 'center'},
    spaceBetween && {justifyContent: 'space-between'},
    centerHorizontal && {alignItems: 'center', justifyContent: 'space-between'},
    style
  ]
  if (title)
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          {
            width: width,
            height: height,
            backgroundColor: bacgroundColor,
            justifyContent: 'center',
            alignItems: 'center',
            ...rest,
          },
          styleAdd,
        ]}>
        <TextCore color={titleColor} size={titleSize}>
          {title}
        </TextCore>
      </TouchableOpacity>
    )
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          width: width,
          height: height,
          backgroundColor: bacgroundColor,
          justifyContent: 'center',
          alignItems: 'center',
          ...rest,
        },
        styleAdd,
      ]}>
      {children}
    </TouchableOpacity>
  )
}
TouchableCore.defaultProps = {
  title: '',
  titleColor: '#000',
  titleSize: 14,
  titleStyle: {},
  bacgroundColor: null,
  width: 100,
  height: 40,
  onPress: null,
}
