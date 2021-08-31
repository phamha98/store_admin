import React, {useState, forwardRef, useImperativeHandle, useRef} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Kaede, Jiro, Kohana, Makiko, Fumi} from 'react-native-textinput-effects'

const InputJAP = (
  {
    type = 'Jiro',
    valueInit,
    placeholder,
    borderColor = '#11ca71',
    inputStyle = {color: '#fff'},
    iconName,
    iconColor,
    iconClass,
    labelStyle,
    labelContainerStyle,
    iconContainerStyle,
    ...rest
  },
  ref,
) => {
  const [value, setValue] = useState(valueInit)
  const refI = useRef()
  useImperativeHandle(ref, () => ({
    getValue: _getValue,
    focus: _focus,
  }))
  const _getValue = () => {
    return value
  }
  const _focus = () => {
    refI.focus()
  }
  if (type === 'Jiro')
    return (
      <Jiro
        ref={refI}
        label={placeholder}
        borderColor={borderColor}
        inputStyle={inputStyle}
        value={value}
        onChangeText={setValue}
        {...rest}
      />
    )
  if (type === 'Fumi')
    return (
      <Fumi
        ref={refI}
        label={placeholder}
        borderColor={borderColor}
        inputStyle={inputStyle}
        value={value}
        onChangeText={setValue}
        iconClass={iconClass}
        iconName={iconName}
        iconColor={iconColor}
        {...rest}
      />
    )
  if (type === 'Kohana')
    return (
      <Kohana
        ref={refI}
        label={placeholder}
        borderColor={borderColor}
        inputStyle={inputStyle}
        iconClass={iconClass}
        iconName={iconName}
        iconColor={iconColor}
        inputPadding={16}
        labelStyle={labelStyle}
        labelContainerStyle={labelContainerStyle}
        iconContainerStyle={iconContainerStyle}
        useNativeDriver
        value={value}
        onChangeText={setValue}
        {...rest}
      />
    )
  if (type === 'Kaede')
    return (
      <Kaede
        ref={refI}
        label={placeholder}
        borderColor={borderColor}
        inputStyle={inputStyle}
        value={value}
        onChangeText={setValue}
        {...rest}
      />
    )
}
export default forwardRef(InputJAP)
const styles = StyleSheet.create({})
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons'
