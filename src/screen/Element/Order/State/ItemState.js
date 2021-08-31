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
  ToastAndroid
} from 'react-native';
import {AppContext} from '../../../../component/AppContext';
import {apiConfirm, apiBillDetails, apiTransport} from '../../../../api';

export default function ItemState({item, navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const {token, idUser, lEP, setLEP, permission} = useContext(AppContext);

  const handleNavBillDetails = id => {
    return navigation.navigate('BillDetails', {idBill: id});
  };
  const handleConfirm = (id_bill, idUser, token, state) => {
    if (state === '1') {
      return apiConfirm(id_bill, idUser, token)
        .then(data => {
          if (data.code === 200) {
            alert('Xác nhận thành công');
            setLEF(!lEP);
            setModalVisible(!modalVisible);
          }
        })
        .catch(e => console.log(e));
    }
    if (state === '2') {
      return apiTransport(id_bill, idUser, token)
        .then(data => {
          if (data.code === 200) {
            alert('Xác nhận thành công');
            setLEP(!lEP);
            setModalVisible(!modalVisible);
          }
        })
        .catch(e => console.log(e));
    }
  };
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'column', minWidth: 250, minHeight: 60}}>
        <Text style={{minWidth: 100}}>Mã Hóa Đơn: HD{item.id_bill}</Text>
        <Text style={{minWidth: 100}}>
          Tiền: {item.bill_details.total_price} VND
        </Text>
        <Text>Ngày : {item.bill_details.date}</Text>
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
          style={styles.viewDetails}>
          <Text style={{color: '#F10202'}}>Xem chi tiết</Text>
        </TouchableOpacity>
        {item.state !== '3' && (
          <Pressable
            style={styles.viewDetails}
            onPress={() => {
              const isObject = v => {
                return !!v && v.constructor === Object;
              };
              console.log(item.state);
              if (item.state == 1) {
                let find = permission.find(
                  key => key.name == 'NaviOrderStateConfirm',
                );
                if (isObject(find)) setModalVisible(true);
                else
                  ToastAndroid.showWithGravity(
                    'Bạn không có quyền xác nhận đơn hàng',
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER,
                  );
              }
              if (item.state == 2) {
                let find = permission.find(
                  key => key.name == 'NaviOrderStateTransport',
                );
                if (isObject(find)) setModalVisible(true);
                else
                  ToastAndroid.showWithGravity(
                    'Bạn không có quyền xác nhận đã giao thành công',
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER,
                  );
              }
            }}>
            <Text style={{color: '#FF00DD'}}>Xác nhận</Text>
          </Pressable>
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                marginHorizontal: 0,
                alignItems: 'center',
                marginBottom: 20,
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 20}}>
                Thông tin đặt hàng
              </Text>
            </View>

            <View style={styles.info}>
              <Image
                source={{uri: item.user_order.img}}
                style={styles.avatar}></Image>
              <View style={styles.des}>
                <Text>Name:{item.user_order.name}</Text>
                <Text>phone:{item.user_order.phone}</Text>
                <Text>address:{item.user_order.address}</Text>
                <Text>gender:{item.user_order.gender}</Text>
              </View>
            </View>
            <View style={styles.cart}>
              <ViewBillDetails id={item.id_bill} />
            </View>
            <Pressable
              style={styles.stateConfirm}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Ẩn</Text>
            </Pressable>

            <TouchableOpacity
              onPress={() =>
                handleConfirm(item.id_bill, idUser, token, item.state)
              }
              style={styles.stateConfirm}>
              <Text style={styles.textStyle}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const ViewBillDetails = id => {
  const {token} = useContext(AppContext);
  const [billDetails, setBillDetails] = useState([
    {
      product_details: {
        name: '',
        details: '',
        price: '',
        sale: '',
        new: '',
        img: 'https://thailamlandscape.vn/wp-content/uploads/2017/10/no-image.png',
      },
    },
  ]);

  useEffect(() => {
    apiBillDetails(token, id)
      .then(data => {
        if (data.code === 200) {
          console.log(data.bills_details);
          setBillDetails(data.bills_details);
        }
      })
      .catch(e => console.log(e));
  }, []);
  return (
    <View>
      <View style={styles.rowItem1}>
        <Text style={{width: 180, fontWeight: 'bold'}}>Đơn giá</Text>
        <Text style={{width: 60, fontWeight: 'bold'}}>SL</Text>
        <Text style={{width: 100, fontWeight: 'bold'}}>Thành Tiền</Text>
      </View>
      {billDetails.map((item, index) => (
        <View key={index}>
          <View style={styles.rowItem2}>
            <View style={{marginHorizontal: 10, minHeight: 60}}>
              <Text style={{width: 180}}>{item.product_details.name}</Text>
              <Image
                source={{uri: item.product_details.img}}
                style={{width: 50, height: 50, resizeMode: 'stretch'}}></Image>
            </View>
            <View style={styles.rowItem3}>
              <Text style={{width: 180}}>{item.product_details.price}</Text>
              <Text style={{width: 60}}>{item.number}</Text>
              <Text style={{width: 100}}>{item.price}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 5,
    minHeight: 30,
    marginVertical: 5,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  viewDetails: {
    minWidth: 80,
    height: 30,
    paddingHorizontal: 5,
    backgroundColor: '#92F018',
    borderWidth: 0.2,
    borderColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 5,
  },
  viewConfirm: {
    elevation: 2,
    minWidth: 80,
    height: 30,
    paddingHorizontal: 5,
    backgroundColor: '#FCB666',
    borderWidth: 0.2,
    borderColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 35,
    shadowColor: 'red',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  info: {
    flexDirection: 'row',
  },
  avatar: {
    width: 100,
    height: 100,
    resizeMode: 'stretch',
    borderRadius: 50,
    overflow: 'hidden',
  },
  des: {
    marginHorizontal: 10,
  },
  rowItem0: {
    marginHorizontal: 0,
    paddingHorizontal: 5,
    borderBottomWidth: 0.5,
    borderTopWidth: 1,
    minHeight: 50,
  },
  rowItem1: {
    marginHorizontal: 0,
    marginVertical: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  rowItem2: {
    marginHorizontal: 0,
    paddingHorizontal: 5,
    paddingVertical: 5,
    minHeight: 50,
    borderBottomWidth: 0.2,
  },
  rowItem3: {
    marginHorizontal: 0,
    paddingHorizontal: 5,
    paddingVertical: 5,
    flexDirection: 'row',
  },
  stateConfirm: {
    marginHorizontal: 100,
    marginVertical: 10,
    height: 30,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
