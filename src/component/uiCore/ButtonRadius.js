import React, {useState, forwardRef, useImperativeHandle} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {ButtonBasic, screen_width, Light,ViewCore, TextCore} from '../index'
import {isArray, isEmpty} from 'underscore'
const ButtonRadius = ({label, data,colorLabel="#fff"}, ref) => {
  if (isEmpty(data) || !isArray(data)) return null
  const [value, setValue] = useState(data[0].title)
  useImperativeHandle(ref, () => ({
    getValue: () => {
      return value
    },
  }))
  return (
    <ViewCore>
    <ViewCore alignItems paddingVertical={5}>
        <TextCore size={16} color={colorLabel}>{label}</TextCore>
    </ViewCore>
      

      <ViewCore row centerHorizontal>
        {data.map((item, index) => (
          <ButtonBasic
            key={index}
            onPress={() => setValue(item.value ? item.value : '')}
            title={item.title ? item.title : ''}
            width={screen_width / data.length - 20}
            backgroundColor={
              item.value === value ? Light.blue_faint : Light.primary
            }
          />
        ))}
      </ViewCore>
    </ViewCore>
  )
}
export default forwardRef(ButtonRadius)
const styles = StyleSheet.create({})
