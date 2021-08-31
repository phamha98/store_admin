import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {ButtonBasic, TextCore, ViewCore} from '@component'
import {useSelector, useDispatch} from 'react-redux'
import MoneyFormat from './MoneyFormat'
export default function ButtonFooter ({money, onPress}) {
  const numberPrice = useSelector(state => state._todoProduct.numberPrice)
  return (
    <ViewCore style={styles.container}>
      <ViewCore row alignItems>
        <TextCore color='#000' size={16}>Tổng tiền:</TextCore>
        <TextCore size={20} color='red' marginLeft={5}>
          {MoneyFormat.MoneyFormat(numberPrice)}
        </TextCore>
      </ViewCore>
      <ButtonBasic
        onPress={onPress}
        title='Đặt hàng'
        styleTitle={{color: '#000'}}
      />
    </ViewCore>
  )
}
ButtonFooter.defaultProps = {
  money: 999,
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: 50,
    backgroundColor: '#FFFFFF',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
})
