import React, {useState, useContext, useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
  Pressable,
  Alert,
  ToastAndroid,
} from 'react-native';

import Header from '../Header';
import {apiBillState} from '../../../../api';
import {AppContext} from '../../../../component/AppContext';
import ItemState from './ItemState';

export default function index({navigation}) {
  const {token, lEP, setLEP, permission} = useContext(AppContext);
  const [isConfirm, setIsConfirm] = useState(true);
  const [isTransport, setIstransport] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isCancel, setIsCancel] = useState(false);

  const [dataConfirm, setDataConfirm] = useState([]);
  const [dataTransport, setDataTransport] = useState([]);
  const [dataComplete, setDataComplete] = useState([]);
  const [dataCancel, setDataCancel] = useState([]);

  useEffect(() => {
    apiBillState(token)
      .then(data => {
        if (data.code === 200) {
          console.log(data);
          setDataConfirm(data.billconfirm);
          setDataTransport(data.billtransport);
          setDataComplete(data.billsuccess);
          setDataCancel(data.billcancel);
        } else alert(data.code);
      })
      .catch(e => console.log(e));
  }, [lEP]);
  const handleState = key => {
    if (key == 1) {
      setIsConfirm(true);
      setIstransport(false);
      setIsComplete(false);
      setIsCancel(false);
    }
    if (key == 2) {
      setIsConfirm(false);
      setIstransport(true);
      setIsComplete(false);
      setIsCancel(false);
    }

    if (key == 3) {
      setIsConfirm(false);
      setIstransport(false);
      setIsComplete(false);
      setIsCancel(true);
    }
    if (key == 4) {
      setIsConfirm(false);
      setIstransport(false);
      setIsComplete(true);
      setIsCancel(false);
    }
  };
  return (
    <View style={styles.container}>
      <Header
        title="Trang thai don hang"
        navigation={navigation}
        title="Trạng thái đơn hàng"
        onClickLeft={() => navigation.goBack()}
        rightIcon={true}
        rightNameIcon="reload-outline"
        onClickRight={() => setLEP(!lEP)}></Header>
      <View style={styles.rowState}>
        <TouchableOpacity
          onPress={() => handleState(1)}
          style={[
            {backgroundColor: isConfirm ? '#FFC60B' : '#fff'},
            styles.viewState,
          ]}>
          <Text
            style={{
              color: isConfirm ? 'red' : '#0184FF',
              fontWeight: isConfirm ? 'bold' : 'normal',
            }}>
            Chờ xác nhận
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleState(2)}
          style={[
            {backgroundColor: isTransport ? '#FFC60B' : '#fff'},
            styles.viewState,
          ]}>
          <Text
            style={{
              color: isTransport ? 'red' : '#0184FF',
              fontWeight: isTransport ? 'bold' : 'normal',
            }}>
            Đang giao
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleState(4)}
          style={[
            {backgroundColor: isComplete ? '#FFC60B' : '#fff'},
            styles.viewState,
          ]}>
          <Text
            style={{
              color: isComplete ? 'red' : '#0184FF',
              fontWeight: isComplete ? 'bold' : 'normal',
            }}>
            Thành công
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleState(3)}
          style={[
            {backgroundColor: isCancel ? '#FFC60B' : '#fff'},
            styles.viewState,
          ]}>
          <Text
            style={{
              color: isCancel ? 'red' : '#0184FF',
              fontWeight: isCancel ? 'bold' : 'normal',
            }}>
            Hủy
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {isConfirm && (
          <FlatList
            data={dataConfirm}
            renderItem={({item}) => (
              <ItemState item={item} navigation={navigation} />
            )}></FlatList>
        )}
        {isTransport && (
          <FlatList
            data={dataTransport}
            renderItem={({item}) => (
              <ItemState item={item} navigation={navigation} />
            )}></FlatList>
        )}
        {isComplete && (
          <FlatList
            data={dataComplete}
            renderItem={({item}) => (
              <ItemState item={item} navigation={navigation} />
            )}></FlatList>
        )}
        {isCancel && (
          <FlatList
            data={dataCancel}
            renderItem={({item}) => (
              <ItemState item={item} navigation={navigation} />
            )}></FlatList>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginHorizontal: 10,
    minHeight: 500,
    marginVertical: 10,
    backgroundColor: 'gray',
  },
  rowState: {
    marginHorizontal: 10,
    marginVertical: 8,
    flexDirection: 'row',
    paddingVertical: 5,
    justifyContent: 'space-between',
    borderBottomColor: 'blue',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
  },
  viewState: {
    minWidth: 80,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 5,
    borderWidth: 0.5,
    borderColor: 'pink',
  },
  content: {
    marginHorizontal: 10,
    paddingVertical: 8,
    minHeight: 100,
    backgroundColor: '#76C3F7',
    alignItems: 'center',
    borderRadius: 5,
  },
});
