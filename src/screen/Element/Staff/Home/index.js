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
        title="Quản lý Nhân viên"
        rightIcon={true}
        background="#FAB802"
        rightNameIcon="person-circle-outline"
        onClickLeft={() => navigation.goBack()}
        onClickRight={() => navigation.navigate('Person')}
      />
      <View
        style={{marginHorizontal: 0, height: '80%', justifyContent: 'center'}}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate('ListStaff')}>
          <Ionicons name="reader-outline" size={30} color="#FF0000F8" />
          <Text style={styles.text}>DANH SÁCH</Text>
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
    marginHorizontal: 50,
    marginVertical: 8,
    height: 100,
    backgroundColor: '#FFC400',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal:20,
  },
  text: {
    fontSize: 20,
    color: 'blue',
    marginHorizontal: 10,
  },
});
