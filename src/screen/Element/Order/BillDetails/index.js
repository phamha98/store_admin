import React, {useEffect, useState, useContext} from 'react';
import {ScrollView, StyleSheet, Text, View, Image} from 'react-native';
import Header from '../Header';
import {AppContext} from '../../../../component/AppContext';
import {apiBillDetails} from '../../../../api';

export default function index({route, navigation}) {
  const {data} = route.params;
  console.log(data);
  const {token} = useContext(AppContext);
  const [billDetails, setBillDetails] = useState([]);
  const [id_bill, setIdBill] = useState(data.id_bill);

  useEffect(() => {
    apiBillDetails(token, id_bill)
      .then(data => {
        if (data.code === 200) {
          setBillDetails(data.bills_details);
        }
      })
      .catch(e => console.log(e));
  }, []);
  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        title="Chi tiết đơn hàng"
        onClickLeft={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.font1}>CỬA HÀNG THỜI TRANG TIỆN LỢI CNS</Text>
          <Text>Địa Chỉ: 250 Kim Ngưu</Text>
          <Text>Điện thoại: 0974478284 </Text>
          <Text style={[styles.font1, {marginTop: 10}]}>HÓA ĐƠN BÁN HÀNG</Text>
          <Text>Số HĐ: {data.id_bill}</Text>
          <Image
            source={{uri: barcode}}
            style={{width: 150, height: 50, resizeMode: 'stretch'}}></Image>
          <Text>Ngày {data.bill_details.created_at}</Text>
          <View style={{width: '100%', paddingHorizontal: 10}}>
            <Text>Khách hàng: {data.user_order.name}</Text>
            <Text>SDT: {data.user_order.name}</Text>
            <Text>Địa chỉ: {data.user_order.address}</Text>
            <Text>Ngày sinh: {data.user_order.birthday}</Text>
            <Text>Giới tính: {data.user_order.gender}</Text>
            <View style={styles.rowItem1}>
              <Text style={{width: 180}}>Đơn giá</Text>
              <Text style={{width: 60}}>SL</Text>
              <Text style={{width: 100}}>Thành Tiền</Text>
            </View>
            {billDetails.map((item, index) => (
              <View key={index}>
                <View style={styles.rowItem2}>
                  <View style={styles.rowItem3}>
                    <Text style={{width: 180}}>
                      {item.product_details.name}
                    </Text>
                  </View>
                  <View style={styles.rowItem3}>
                    <Text style={{width: 180}}>
                      {item.product_details.price}
                    </Text>
                    <Text style={{width: 60}}>{item.number}</Text>
                    <Text style={{width: 100}}>{item.price}</Text>
                  </View>
                </View>
              </View>
            ))}
            <View style={styles.Money}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.font2}>Tổng tiền hàng:</Text>
                <Text style={styles.font3}>
                  {data.bill_details.total_price}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.font2}>Chiết khấu:</Text>
                <Text style={styles.font3}>0</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.font2}>Tổng thanh toán:{}</Text>
                <Text style={styles.font3}>
                  {data.bill_details.total_price}
                </Text>
              </View>
            </View>
          </View>
          <Text style={{backgroundColor: 'yellow'}}>
            Trạng thái:{data.state == 1 ? 'Chờ xác nhận' : ''}
            {data.state == 2 ? 'Đang giao hàng' : ''}
            {data.state == 3 ? 'Thành công' : ''}
            {data.state == 4 ? 'Đã hủy' : ''}
          </Text>
          <Text style={styles.font4}>Cảm ơn và hẹn gặp lại?</Text>
          <Text style={[styles.font4, {marginTop: 5}]}>
            Hotline: 0958534965
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'gray'},
  content: {
    marginHorizontal: 20,
    marginVertical: 30,
    minHeight: 500,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 30,
    marginBottom: 150,
  },
  font1: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  font2: {
    width: 100,
    fontWeight: 'bold',
  },
  font3: {
    paddingLeft: 50,
    fontWeight: 'bold',
  },
  font4: {fontStyle: 'italic', fontWeight: 'bold', marginTop: 50},
  rowItem0: {
    marginHorizontal: 0,
    paddingHorizontal: 5,
    borderBottomWidth: 0.5,
    borderTopWidth: 1,
    minHeight: 50,
  },
  rowItem1: {
    marginHorizontal: 0,
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
  Money: {
    margin: 10,
  },
});
const barcode =
  'https://upload.wikimedia.org/wikipedia/commons/6/65/Code11_barcode.png';
