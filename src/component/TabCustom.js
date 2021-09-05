import React, {forwardRef, useImperativeHandle, useState, useRef} from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import {ViewCore, TextCore, IconCore} from '@component'
export default function TabCustom ({mapView, mapTitle, styleTab, styleButton}) {
  if (!mapView || !mapTitle) return null
  //if (mapView.length !== mapTitle.length) return null
  const [id, setId] = useState(0)
  const renderBackground = _id => {
    return _id === id ? colorA : colorZ
  }
  const renderColorLine = _id => {
    return _id === id ? color0 : color1
  }
  const renderColor = _id => {
    return _id === id ? color4 : color2
  }
  const handleClick = _id => {
    setId(_id)
  }
  const RenderTab1 = () => {
    return mapView[id]
  }
  return (
    <ViewCore style={{flex: 1,}} marginTop={2}>
      <ViewCore style={[styles.content, styleTab]} row>
        {mapTitle.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              {
                backgroundColor: renderBackground(index),
                borderBottomColor: renderColorLine(index),
              },
              styleButton,
            ]}
            onPress={() => handleClick(index)}>
            <Text style={[styles.text, {color: renderColor(index)}]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </ViewCore>
      <View style={{height:'100%',backgroundColor:'#fff'}}>
        <RenderTab1 />
      </View>
    </ViewCore>
  )
}
TabCustom.defaultProps = {
  Tab1: <></>,
  Tab2: <></>,
  Tab3: <></>,
  Tab4: <></>,
  data: [],
}
const colorA = '#3887ff'
const colorZ = '#00df72'
const color0 = '#FF0000'
const color1 = '#FFB005'
const color2 = '#6D6D6D'
const color4 = '#FFFFFF'
const styles = StyleSheet.create({
  content: {
    height: 45,
    alignItems: 'center',
    backgroundColor: '#00df72',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  text: {
    color: '#0044FF',
    fontSize: 16,
  },
  icon: {},
  button: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    height: 45,
    borderBottomWidth: 1,
  },
})
const dataTemp = ['Chờ xác nhận', 'Đang giao']
