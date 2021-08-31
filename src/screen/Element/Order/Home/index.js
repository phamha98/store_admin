import React,{useContext} from 'react';
import {Button, StyleSheet, Text, View,ToastAndroid} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../Header';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {AppContext} from '../../../../component/AppContext';

export default function index({navigation}) {
    const {permission} = useContext(AppContext);

  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        title="Quản lý đơn hàng"
        rightIcon={true}
        background="#00A2FF"
        rightNameIcon="person-circle-outline"
        onClickLeft={() => navigation.goBack()}
        onClickRight={() => navigation.navigate('Person')}
      />
      <View
        style={{marginHorizontal: 0, height: '80%', justifyContent: 'center'}}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => {
            const isObject = v => {
              return !!v && v.constructor === Object;
            };
            let find = permission.find(key => key.name == 'NaviOrderList');
            if (isObject(find)) navigation.navigate('ListOrder');
            else
              ToastAndroid.showWithGravity(
                'Bạn không có quyền truy cập',
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
              );
          }}>
          <Ionicons name="reader-outline" size={30} color="#2600FF" />
          <Text style={styles.text}>DANH SÁCH ĐƠN HÀNG</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() => {
            const isObject = v => {
              return !!v && v.constructor === Object;
            };
            let find = permission.find(key => key.name == 'NaviOrderSearch');
            if (isObject(find)) navigation.navigate('SearchOrder');
            else
              ToastAndroid.showWithGravity(
                'Bạn không có quyền truy cập',
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
              );
          }}>
          <Ionicons name="search" size={30} color="#26FF00" />
          <Text style={styles.text}>TÌM KIẾM VÀ SẮP XẾP </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() => {
            const isObject = v => {
              return !!v && v.constructor === Object;
            };
            let find = permission.find(key => key.name == 'NaviOrderState');
            if (isObject(find)) navigation.navigate('StateOrder');
            else
              ToastAndroid.showWithGravity(
                'Bạn không có quyền truy cập',
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
              );
          }}>
          <Ionicons name="paper-plane-outline" size={30} color="#FF00D4" />
          <Text style={styles.text}>TRẠNG THÁI ĐƠN HÀNG</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate('MyOrder')}>
          <Ionicons name="person-outline" size={30} color="#FF0000" />
          <Text style={styles.text}>ĐƠN HÀNG CỦA TÔI</Text>
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
    marginHorizontal: 60,
    marginVertical: 8,
    height: 100,
    backgroundColor: '#00AEFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    padding:10
  },
  text: {
    fontSize: 20,
    color: '#fff',
    marginHorizontal:10
  },
});
