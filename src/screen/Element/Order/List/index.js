import React, {useState, useEffect, useContext} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {apiListFullBills} from '../../../../api';
import {AppContext} from '../../../../component/AppContext';
import Header from '../Header';
import styles from './styles';
export default function index({navigation}) {
  const {token} = useContext(AppContext);
  const [isFilter, setIsFiter] = useState(false);
  const [datafull, setDatafull] = useState([]);
  useEffect(() => {
    apiListFullBills(token)
      .then(data => {
        if (data.code === 200) {
          //console.log('______________________________________');
          //console.log(data);
          setDatafull(data.bill_state_display);
          //const v = data.bill_state_display;
          // console.log(v);
          //console.log(datafull);
        } else alert(data.code);
      })
      .catch(e => console.log(e));
  }, []);
  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        title="Danh sách đơn hàng"
        rightIcon={true}
        rightNameIcon="search"
        onClickLeft={() => navigation.goBack()}
        onClickRight={() => setIsFiter(!isFilter)}
      />
      {isFilter && <Filer />}
      <View style={{backgroundColor: 'gray', padding: 10,marginBottom:50}}>
        <FlatList
          data={datafull}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <ItemBill item={item} navigation={navigation} />
          )}></FlatList>
      </View>
    </View>
  );
}

function ItemBill({item, navigation}) {
  const renderState = state => {
    if (state == 1)
      return (
        <Text style={{color: 'blue', fontWeight: 'bold'}}>Chờ xác nhận</Text>
      );
    if (state == 2)
      return (
        <Text style={{color: 'green', fontWeight: 'bold'}}>Đang giao hàng</Text>
      );
    if (state == 3) return <Text style={styles.fontW}>Thành công</Text>;
    if (state == 4)
      return <Text style={{color: '#000', fontWeight: 'bold'}}>Đã hủy</Text>;
  };
  return (
    <View style={styles.containerItem}>
      <View style={{flexDirection: 'row'}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
          Mã Hóa Đơn:HD{item.id_bill}---
        </Text>
        <View
          style={{
            minWidth: 80,
            height: 30,
            backgroundColor: '#ECC6C6',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            paddingHorizontal: 5,
          }}>
          {renderState(item.state)}
        </View>
      </View>
      <ViewName
        title="Tên khách hàng"
        name={item.user_order.name}
        data={item.user_order}
        navigation={navigation}
      />
      {(item.state === '2' || item.state === '3') && (
        <ViewName
          title="Nhân viên xác nhận"
          name={item.user_confirm.name}
          data={item.user_confirm}
          navigation={navigation}
        />
      )}
      {item.state === '3' && (
        <ViewName
          title="Nhân viên vận chuyển"
          name={item.user_transport.name}
          data={item.user_transport}
          navigation={navigation}
        />
      )}
      <View style={styles.rowName}>
        <Text>Ngày đặt hàng:{item.bill_details.date}</Text>
      </View>
      <View style={styles.rowName}>
        <Text>Tổng tiền:{item.bill_details.total_price}</Text>
      </View>
      <View style={styles.rowName}>
        <TouchableOpacity
          onPress={() => navigation.navigate('BillDetails', {data: item})}
          style={{
            backgroundColor: '#EE7E14',
            borderRadius: 5,
            paddingHorizontal: 10,
            marginHorizontal: 10,
          }}>
          <Text>Chi tiết</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const ViewName = ({name, data, navigation, title}) => {
  return (
    <View style={styles.rowName}>
      <Text>
        {title}: {name}
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('ShowUser', {data: data})}
        style={{
          backgroundColor: '#FF09F3',
          borderRadius: 5,
          paddingHorizontal: 10,
          marginHorizontal: 10,
        }}>
        <Text>Chi tiết</Text>
      </TouchableOpacity>
    </View>
  );
};
const Filer = () => {
  return (
    <View
      style={{
        minHeight: 50,
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 5,
        overflow: 'hidden',
        borderWidth: 0.5,
      }}>
      <TextInput
        style={{
          fontSize: 15,
          color: 'red',
          paddingHorizontal: 5,
        }}
        placeholder="search...."></TextInput>
    </View>
  );
};
