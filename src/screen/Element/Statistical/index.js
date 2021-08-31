
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../Permission/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function index({navigation}) {
  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        title="Thống kê"
        rightIcon={true}
        background="#FAC2FF"
        rightNameIcon="person-circle-outline"
        onClickLeft={() => navigation.goBack()}
        onClickRight={() => navigation.navigate('Person')}
      />
      <View
        style={{marginHorizontal: 0, height: '80%', justifyContent: 'center'}}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate('StatisticBills')}>
          <Ionicons name="reader-outline" size={30} color="#FF0000F8" />
          <Text style={styles.text}>THỐNG KÊ THEO HÓA ĐƠN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate('StatisticCustomer')}>
          <Ionicons name="reader-outline" size={30} color="#FF00EA" />
          <Text style={styles.text}>THỐNG KÊ THEO KHÁCH HÀNG</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate('StatisticChart')}>
          <Ionicons name="reader-outline" size={30} color="#FF00EA" />
          <Text style={styles.text}>THỐNG KÊ BIỂU ĐỒ</Text>
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
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 18,
    color: 'blue',
    marginHorizontal: 10,
  },
});
