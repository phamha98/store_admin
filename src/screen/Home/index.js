import React, {useContext} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
//import Ionicons from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../component/Header';
import {AppContext} from '../../component/AppContext';
export default function Home({navigation}) {
  return (
    <View style={styles.container}>
      <Header
        background="#18B918"
        colorIcon="#FFFFFF"
        navigation={navigation}
        title={<Text style={{color:"#fff"}}>Admin</Text>}
        rightIcon={true}
        rightNameIcon="person-circle-outline"
        leftNameIcon="menu"
        onClickLeft={() => navigation.openDrawer()}
        onClickRight={() => navigation.navigate('Person')}
      />
      
      <View style={styles.content}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={listContent}
          renderItem={({item}) => <Item item={item} navigation={navigation} />}
          numColumns={2}></FlatList>
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
    marginBottom: 50,
  },
});
///=>load dc
const listContent = [
  {
    id: 1,
    name: 'Quản lý nhân viên',
    icon: 'person-add-outline',
    background: '#F388D7',
    colorText: '#fff',
    navigation: 'HomeStaff',
    permision: 'NaviStaff',
  },
  {
    id: 2,
    name: 'Quản lý khách hàng thành viên',
    icon: 'people-outline',
    background: '#FFA600',
    colorText: '#fff',
    navigation: 'HomeCustomer',
    permision: 'NaviCustomer',
  },
  {
    id: 3,
    name: 'Quản lý đơn hàng',
    icon: 'bar-chart-outline',
    background: '#00B7FF',
    colorText: '#fff',
    navigation: 'HomeOrder',
    permision: 'NaviOrder',
  },
  {
    id: 4,
    name: 'Quản lý mặt hàng',
    icon: 'apps-outline',
    background: 'green',
    colorText: '#fff',
    navigation: 'HomeGoods',
    permision: 'NaviGoods',
  },
  {
    id: 4,
    name: 'Thống kê',
    icon: 'stats-chart-outline',
    background: 'pink',
    colorText: '#fff',
    navigation: 'Statistical',
    permision: 'NaviStatistical',
  },
  {
    id: 4,
    name: 'Quản lý phân quyền',
    icon: 'people-circle-outline',
    background: 'gray',
    colorText: '#fff',
    navigation: 'HomePermission',
    permision: 'NaviPremission',
  },
  {
    id: 5,
    name: 'Đăng bài',
    icon: 'newspaper-outline',
    background: '#33B07E',
    colorText: '#fff',
    navigation: 'HomePost',
    permision: 'NaviPremission',
  },
  {
    id: 6,
    name: 'Cài đặt thông tin',
    icon: 'cog-outline',
    background: '#B887E6',
    colorText: '#fff',
    navigation: 'HomePermission',
    permision: 'NaviPremission',
  },
];
const Item = ({item, navigation}) => {
  const {permission} = useContext(AppContext);

  return (
    <TouchableOpacity
      style={{
        width: 170,
        height: 140,
        marginVertical: 8,
        marginHorizontal: 10,
        backgroundColor: item.background,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={() => {
        const isObject = v => {
          return !!v && v.constructor === Object;
        };
        let find = permission.find(key => key.name == item.permision);
        if (isObject(find)) navigation.navigate(item.navigation);
        else
          ToastAndroid.showWithGravity(
            'Bạn không có quyền truy cập',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
      }}>
      <Ionicons name={item.icon} color={item.colorText} size={40} />
      <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};
