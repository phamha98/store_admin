import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
export default function Layout ({children, ...rest}) {
  return (
    <SafeAreaView
      forceInset={{top: 'never'}}
      style={[{flex: 1, backgroundColor: '#fff'}, {...rest}]}>
      {children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})
