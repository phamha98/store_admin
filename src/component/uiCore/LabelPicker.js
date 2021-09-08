import React, {useState, forwardRef, useImperativeHandle} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Picker} from '@react-native-picker/picker'
import {isEmpty} from 'underscore'
import {ViewCore} from './index'
const LabelPicker = ({data, label, valueInit, ...rest}, ref) => {
  //data=[{name/value}]

  if (isEmpty(data)) return null
  const [value, setValue] = useState(valueInit ? valueInit : data[0].id)
  useImperativeHandle(ref, () => ({
    getValue: () => {
      return value
    },
  }))
  return (
    <ViewCore
      height={50}
      row
      centerHorizontal
      backgroundColor='#fff'
      borderRadius={5}
      paddingHorizontal={10}
      marginBottom={5}
      {...rest}>
      <Text style={{width: 100}}>{label}</Text>
      <Picker
        style={{width: 200}}
        selectedValue={value}
        onValueChange={setValue}>
        {data.map((item, index) => (
          <Picker.Item
            key={index}
            label={item.name ? item.name : ''}
            value={item.id ? item.id : ''}
          />
        ))}
      </Picker>
    </ViewCore>
  )
}
export default forwardRef(LabelPicker)
const styles = StyleSheet.create({})
