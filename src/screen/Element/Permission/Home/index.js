import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function index({navigation}) {
  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        title="Quản lý Phân quyền"
        rightIcon={true}
        background="#85827A"
        rightNameIcon="person-circle-outline"
        onClickLeft={() => navigation.goBack()}
        onClickRight={() => navigation.navigate('Person')}
      />
      <View
        style={{marginHorizontal: 0, height: '80%', justifyContent: 'center'}}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate('ListPermission')}>
          <Ionicons name="reader-outline" size={30} color="#FF0000F8" />
          <Text style={styles.text}>DANH SÁCH NHÓM NGƯỜI DÙNG</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate('AddGroup')}>
          <Ionicons name="add" size={30} color="#FF00EA" />
          <Text style={styles.text}>THÊM NHÓM NGƯỜI DÙNG </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
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
    paddingHorizontal:20,
  },
  text: {
    fontSize: 18,
    color: 'blue',
    marginHorizontal: 10,
  },
});
