import React, {useContext, useEffect, useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  FlatList,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppContext} from '../../../../component/AppContext';
import {apiBillUserState} from '../../../../api';
export default function index({navigation}) {
  const {token, idUser} = useContext(AppContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    apiBillUserState(token, idUser)
      .then(result => {
        console.log(result);
        setData(result.data);
      })
      .catch(e => console.log(e));
  }, []);
  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        title="Đơn hàng của tôi"
        rightIcon={true}
        background="#00A2FF"
        rightNameIcon="person-circle-outline"
        onClickLeft={() => navigation.goBack()}
        onClickRight={() => navigation.navigate('Person')}
      />
      <View
        style={{
          marginHorizontal: 0,
          minHeight: 100,
          marginVertical: 10,
        }}>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <ItemState item={item} navigation={navigation} />
          )}></FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1,backgroundColor:'gray'},
  viewItem: {
    flexDirection: 'row',
    marginHorizontal: 5,
    minHeight: 30,
    marginVertical: 5,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  button: {
    minWidth: 80,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    backgroundColor: '#0084FF',
    borderRadius: 5,
  },
  fontW: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
function ItemState({item, navigation}) {
  const renderState = state => {
    if (state == 2) return <Text style={{color:'green'}}>Chờ xác nhận</Text>;
    if (state == 3) return <Text style={{color: 'red'}}>Thành công</Text>;

  };
  return (
    <View style={styles.viewItem}>
      <View style={{flexDirection: 'column', minWidth: 250, minHeight: 60}}>
        <Text style={styles.fontW}>Mã Hóa Đơn: HD{item.id_bill}</Text>
        <Text style={styles.fontW}>Trạng thái: {renderState(item.state)}</Text>
      </View>
      <View
        style={{
          flexDirection: 'column',
          minWidth: 100,
          minHeight: 60,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('BillDetails', {data: item})}
          style={styles.button}>
          <Text style={{color: '#FFFFFF'}}>Xem chi tiết</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
