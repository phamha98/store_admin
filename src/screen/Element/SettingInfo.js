import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {
  AppContext,
  HeaderC,
  Layout,
  screen_width,
  TabCustom,
  ViewCore,
  InputBasic,
  Light,
} from '@component'
import {goBack, navigate} from '@navigation'
export default function SettingInfo () {
  const handleSave = () => {
    goBack()
  }
  return (
    <Layout backgroundColor={Light.background}>
      <HeaderC
        title='Cài đặt thông tin'
        rightNameIcon='checkmark-circle-outline'
        onClickRight={handleSave}
      />
      <ViewCore padding={10}>
        <InputBasic placeholder='Tên shop' />
        <InputBasic placeholder='Link Google Map' />
        <InputBasic placeholder='Link Web' />
        <InputBasic placeholder='Phone'  keyboardType="numeric"/>
      </ViewCore>
    </Layout>
  )
}

const styles = StyleSheet.create({})
