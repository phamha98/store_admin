import React from 'react'
import {Button, StyleSheet, Text, View} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {navigate} from '@navigation'
import {HeaderC, Layout} from '@component'
import Ionicons from 'react-native-vector-icons/Ionicons'
export default function index () {
  return (
    <Layout>
      <HeaderC title='Quản lý Phân quyền' />
      <View
        style={{marginHorizontal: 0, height: '80%', justifyContent: 'center'}}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigate('ListPermission')}>
          <Ionicons name='reader-outline' size={30} color='#FF0000F8' />
          <Text style={styles.text}>DANH SÁCH NHÓM NGƯỜI DÙNG</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigate('AddGroup')}>
          <Ionicons name='add' size={30} color='#FF00EA' />
          <Text style={styles.text}>THÊM NHÓM NGƯỜI DÙNG </Text>
        </TouchableOpacity>
      </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    marginHorizontal: 30,
    marginVertical: 8,
    height: 100,
    backgroundColor: '#BEC0B9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 18,
    color: 'blue',
    marginHorizontal: 10,
  },
})
