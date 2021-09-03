import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'
export default function Layout ({children, backgroundColor, ...rest}) {
  return (
    <SafeAreaView
      forceInset={{top: 'never'}}
      style={[{flex: 1, backgroundColor: backgroundColor}, {...rest}]}>
      {children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})
Layout.defaultProps = {
  backgroundColor: '#fff',
}
