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
        title="Quản lý mặt hàng"
        rightIcon={true}
        background="#0D9E00"
        rightNameIcon="person-circle-outline"
        onClickLeft={() => navigation.goBack()}
        onClickRight={() => navigation.navigate('Person')}
      />
      <View
        style={{marginHorizontal: 0, height: '80%', justifyContent: 'center'}}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate('ShowGoods')}>
          <Ionicons name="reader-outline" size={30} color="#2600FF" />
          <Text style={styles.text}>XEM MẶT HÀNG</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate('SearchGoods')}>
          <Ionicons name="search" size={30} color="#26FF00" />
          <Text style={styles.text}>TÌM KIẾM </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate('InsertGoods')}>
          <Ionicons name="medkit-outline" size={30} color="#FF0000" />
          <Text style={styles.text}>THÊM MẶT HÀNG</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() =>
            navigation.navigate('InsertTypeGoods', {
              idT: '',
              nameT: '',
              imgT: 'https://thailamlandscape.vn/wp-content/uploads/2017/10/no-image.png',
            })
          }>
          <Ionicons name="grid-outline" size={30} color="#FFD900" />
          <Text style={styles.text}>THÊM LOẠI HÀNG</Text>
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
    backgroundColor: '#509601',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    padding: 10,
  },
  text: {
    fontSize: 20,
    color: '#fff',
    marginHorizontal: 10,
  },
});
