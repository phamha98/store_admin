import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import Header from '../Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Avatar} from 'react-native-elements';
import {Button} from 'react-native-elements';
import {apiListGroupUser} from '../../../../api';
import {AppContext} from '../../../../component/AppContext';

export default function index({navigation}) {
  const {token} = useContext(AppContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    apiListGroupUser(token).then(result => {
      console.log(result);
      setData(result.data);
    });
  }, []);
  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        title="Danh sách nhóm người dùng"
        rightIcon={true}
        background="#FFFFFF"
        rightNameIcon="person-circle-outline"
        onClickLeft={() => navigation.goBack()}
        onClickRight={() => navigation.navigate('Person')}
      />
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <ViewItem item={item} navigation={navigation}></ViewItem>
        )}
      />
    </View>
  );
}
const ViewItem = ({item, navigation}) => {
  return (
    <View style={styles.viewItem}>
      <View style={styles.content}>
        <View style={styles.rowItem}>
          <Ionicons
            style={{marginHorizontal: 5}}
            name="person-outline"
            size={20}
            color="red"
          />
          <Text>Key:{item.name}</Text>
        </View>
        <View style={styles.rowItem}>
          <Ionicons
            style={{marginHorizontal: 5}}
            name="mail-outline"
            size={20}
            color="red"
          />
          <Text>Name:{item.display_name}</Text>
        </View>
      </View>
      <View style={styles.viewIcon}>
        <Button
          onPress={() =>
            navigation.navigate('ListUserRole', {
              idRole: item.id,
              displayName: item.display_name,
            })
          }
          title="Xem thành viên"></Button>
        <Text></Text>
        <Button
          onPress={() =>
            navigation.navigate('ShowPermission', {
              idRole: item.id,
              displayName: item.display_name,
            })
          }
          title="Xem các quyền"></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#666560'},
  viewItem: {
    marginHorizontal: 5,
    marginVertical: 5,
    minHeight: 100,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    width: 250,
    padding: 10,
  },
  rowItem: {
    minHeight: 30,
    backgroundColor: '#fff',
    marginVertical: 2,
    flexDirection: 'row',
    padding: 5,
    borderRadius: 5,
    minWidth: 200,
    borderBottomWidth: 0.2,
    marginHorizontal: 0,
  },
  viewIcon: {
    width: 130,
    margin: 5,
  },
});
