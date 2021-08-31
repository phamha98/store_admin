import React, {useState, useEffect, useContext, useRef} from 'react';
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
  TextInput,
  ToastAndroid,
  Keyboard,
} from 'react-native';
import Header from '../Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Avatar} from 'react-native-elements';
import {Button, SearchBar} from 'react-native-elements';
import {
  apiListUserRole,
  apiSearchAcountName,
  apiInsertRoleUser,
  apiDeleteRoleUser,
} from '../../../../api';
import {AppContext} from '../../../../component/AppContext';
import RBSheet from 'react-native-raw-bottom-sheet';
import styles from './styles';
export default function index({route, navigation}) {
  const {token, lEP, setLEP} = useContext(AppContext);
  const [data, setData] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [show, setShow] = useState(false);
  const [nameUser, setNameUser] = useState('');
  const {idRole} = route.params;
  useEffect(() => {
    apiListUserRole(token, idRole).then(result => {
      //console.log(result.data);
      setData(result.data);
    });
  }, [lEP]);
  const loadUser = () => {
    if (nameUser.trim() === '') {
      return ToastAndroid.showWithGravity(
        'Nhập vào tên...',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
    apiSearchAcountName(token, nameUser).then(result => {
       console.log(result);
      setListUser(result.data);
    });
  };
  const check = id => {
    const isObject = v => {
      return !!v && v.constructor === Object;
    };
    let temp = data.find(item => item.id == id);
    return isObject(temp);
  };
  const handleInsertRoleUser = idUser => {
    //console.log(idUser);
    apiInsertRoleUser(token, idRole, idUser)
      .then(re => {
        ToastAndroid.showWithGravity(
          'Đã thêm',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      })
      .catch(e => console.log(e));
  };

  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        title="Danh sách Thành viên"
        rightIcon={true}
        background="#FFEE00"
        rightNameIcon="person-circle-outline"
        onClickLeft={() => navigation.goBack()}
        onClickRight={() => navigation.navigate('Person')}
      />
      <TouchableOpacity
        onPress={() => setShow(!show)}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#04BBE9',
          width: 100,
          marginTop: 5,
          borderRadius: 5,
          minHeight: 35,
          position: 'absolute',
          top: 0,
          right: 45,
        }}>
        <Text style={{color: '#fff', fontSize: 14, fontWeight: 'bold'}}>
          Thêm người dùng
        </Text>
      </TouchableOpacity>

      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <ViewItem
            item={item}
            token={token}
            idRole={idRole}
            navigation={navigation}></ViewItem>
        )}
      />
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
            Thêm người dùng vào nhóm
          </Text>
          <SearchBar
            placeholder="Type Here..."
            onChangeText={text => setNameUser(text)}
            value={nameUser}
            lightTheme="#fff"
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 5,
            }}>
            <Button
              onPress={() => {
                loadUser();
                Keyboard.dismiss();
              }}
              title="Tìm kiếm"
            />
            <Button
              title="Ẩn hộp thoại"
              onPress={() => {
                setShow(!show);
                setLEP(!lEP);
              }}
            />
          </View>
          <View style={{width: 350, height: 400}}>
            <FlatList
              data={listUser}
              keyExtractor={item => item.id}
              renderItem={({item}) =>
                !check(item.id) && (
                  <View style={styles.rowPerson}>
                    <Avatar
                      size="large"
                      rounded
                      source={{
                        uri: item.img != null ? item.img : noImage,
                      }}
                    />
                    <View style={{padding: 10}}>
                      <Text>Email: {item.email}</Text>
                      <Text>Name: {item.name}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        handleInsertRoleUser(item.id);
                        loadUser();
                      }}
                      style={styles.buttonAdd}>
                      <Ionicons name="add" size={30} color="blue" />
                    </TouchableOpacity>
                  </View>
                )
              }></FlatList>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const ViewItem = ({item, navigation, token, idRole}) => {
  const refRBSheet = useRef();
  const {lEP, setLEP} = useContext(AppContext);

  const handleDeleteRoleUser = idUser => {
    apiDeleteRoleUser(token, idRole, idUser)
      .then(re => {
        setLEP(!lEP);
        //console.log(re);
        ToastAndroid.showWithGravity(
          'Đã xóa',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      })
      .catch(e => console.log(e));
  };
  const noImage =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png';
  console.log(item);
  return (
    <View style={styles.viewItem}>
      <View
        style={{
          alignItems: 'center',
          height: 100,
          flexDirection: 'row',
          padding: 10,
        }}>
        <Avatar
          size="large"
          rounded
          source={{
            uri: item.img != null ? item.img : noImage,
          }}
        />
        <View style={[styles.rowItem, {marginHorizontal: 10}]}>
          <Ionicons
            style={{marginHorizontal: 5}}
            name="person-outline"
            size={20}
            color="red"
          />
          <Text>Name:{item.name}</Text>
        </View>
        <Ionicons
          name="play-forward-circle-outline"
          size={25}
          color="red"
          //onPress={() => setShow(!show)}
          onPress={() => refRBSheet.current.open()}
        />
      </View>

      <View style={styles.content}>
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

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
            backgroundColor: '#8B7878CA',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <View style={styles.viewChose}>
          <Text style={{fontSize: 20, color: '#000', fontWeight: 'bold'}}>
            Tùy chọn
          </Text>
          <Button
            title="Xem thông tin người dùng"
            onPress={() => navigation.navigate('ShowUser', {data: item})}
          />
          <Text></Text>
          <Button
            onPress={() => handleDeleteRoleUser(item.id)}
            title="Xóa người dùng khỏi nhóm"
          />
          <Text></Text>
          <Button
            title="Ẩn hộp thoại"
            onPress={() => refRBSheet.current.close()}
          />
        </View>
      </RBSheet>
    </View>
  );
};
///where role_use=3
