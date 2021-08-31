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
import {apiListAcount, apiListUserRole} from '../../../../api';
import {AppContext} from '../../../../component/AppContext';

export default function index({navigation}) {
  const {token} = useContext(AppContext);
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   apiListAcount(token).then(result => {
  //     //console.log(result);
  //     setData(result.data);
  //   });
  // }, []);
  useEffect(() => {
    apiListUserRole(token, "4").then(result => {
      setData(result.data);
    });
  }, []);
  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        title="Danh sách khách hàng"
        rightIcon={true}
        background="#FAE902"
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
  const [show, setShow] = useState(false);

  return (
    <View style={styles.viewItem}>
      <View style={{alignItems: 'center', height: 100}}>
        <Avatar
          size="large"
          rounded
          source={{
            uri: item.img,
          }}
        />
      </View>
      <Ionicons
        style={{position: 'absolute', bottom: 5, left: 5}}
        name="play-forward-circle-outline"
        size={25}
        color="green"
        onPress={() => setShow(!show)}
      />
      <View style={styles.content}>
        <View style={styles.rowItem}>
          <Ionicons
            style={{marginHorizontal: 5}}
            name="person-outline"
            size={20}
            color="red"
          />
          <Text>Name:{item.name}</Text>
        </View>
        <View style={styles.rowItem}>
          <Ionicons
            style={{marginHorizontal: 5}}
            name="mail-outline"
            size={20}
            color="red"
          />
          <Text>{item.email}</Text>
        </View>
        <View style={styles.rowItem}>
          <Ionicons
            style={{marginHorizontal: 5}}
            name="today-outline"
            size={20}
            color="red"
          />
          <Text>{item.birthday}</Text>
        </View>
        <View style={styles.rowItem}>
          <Ionicons
            style={{marginHorizontal: 5}}
            name="transgender-outline"
            size={20}
            color="red"
          />
          <Text>{item.gender}</Text>
        </View>
        <View style={styles.rowItem}>
          <Ionicons
            style={{marginHorizontal: 5}}
            name="call-outline"
            size={20}
            color="red"
          />
          <Text>{item.phone}</Text>
        </View>
        <View style={styles.rowItem}>
          <Ionicons
            style={{marginHorizontal: 5}}
            name="navigate-outline"
            size={20}
            color="red"
          />
          <Text> {item.address}</Text>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={show}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setShow(!show);
        }}>
        <View style={styles.viewModal}>
          <Text style={{fontSize: 20, color: '#fff', fontWeight: 'bold'}}>
            Option
          </Text>
          <Button title="Xem" onPress={() => navigation.navigate('ShowUser',{data:item})} />
          <Text></Text>
          <Button title="Xoa" />
          <Text></Text>
          <Button title="An" onPress={() => setShow(!show)} />
        </View>
      </Modal>
    </View>
  );
};
///where role_use=3

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F1E3A1'},
  viewItem: {
    marginHorizontal: 5,
    marginVertical: 5,
    minHeight: 100,
    backgroundColor: '#C44E0A',
    borderRadius: 5,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    marginHorizontal: 10,
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
  },
  viewModal: {
    marginHorizontal: 40,
    minHeight: 300,
    backgroundColor: 'gray',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginVertical: 200,
    borderWidth: 5,
    borderColor: 'yellow',
  },
});