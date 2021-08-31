import React, {useState, useEffect, useContext} from 'react';
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  ActivityIndicator,
  Dimensions,
  Pressable,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {Modal} from 'react-native';
//import ImageViewer from 'react-native-image-zoom-viewer';
import ImageZoom from 'react-native-image-pan-zoom';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../component/Header';
import {AppContext} from '../../component/AppContext';
import {apiPersonShow} from '../../api';
import {log} from 'react-native-reanimated';
export default function index({navigation}) {
  const {token, idUser, lEP, setLEP} = useContext(AppContext);
  const [data, setData] = useState();
  const [name, setName] = useState('name');
  const [email, setEmail] = useState('email');
  const [phone, setPhone] = useState('phomne');
  const [img, setImg] = useState(
    'https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png'
  );
  const [address, setAddress] = useState();
  const [progess1, setProgess1] = useState(true);
  useEffect(() => {
    apiPersonShow(token, idUser)
      .then(data => {
        console.log(data.data);
        setData(data.data);
        setAddress(data.data.address);
        setName(data.data.name);
        setPhone(data.data.phone);
        setEmail(data.data.email);
        setImg(data.data.img);
        setProgess1(false);
      })
      .catch(e => console.log(e));
  }, [lEP]);
  const [modalVisible, setModalVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const images = [
    {
      url: 'https://duhocvietglobal.com/wp-content/uploads/2018/12/dat-nuoc-va-con-nguoi-anh-quoc.jpg',
      freeHeight: true,
      id: 1,
    },
    {
      url: 'https://vuongquocanh.com/wp-content/uploads/2018/03/england-wal.jpg',
      freeHeight: true,
      id: 2,
    },
  ];
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} backgroundColor="#0B193F" />
      <ImageBackground
        style={{flex: 1}}
        source={require('../../img/signup.jpg')}>
        <Header
          background="#fff"
          navigation={navigation}
          onClickLeft={() => navigation.goBack()}
          title="Thông tin cá nhân"
          rightIcon={true}
          rightNameIcon="reload-outline"
          onClickRight={() => setLEP(!lEP)}
        />
        <View style={styles.content}>
          <View style={[styles.viewChildren, {alignItems: 'center'}]}>
            <Text style={{fontSize: 28, fontWeight: 'bold'}}>{name}</Text>
            <Text>@{name}</Text>
          </View>
          <View style={styles.viewChildren}>
            <Text>Số điện thoại:{phone} </Text>
          </View>
          <View style={styles.viewChildren}>
            <Text>Email: {email}</Text>
          </View>
          <View style={styles.viewChildren}>
            <Text>Địa chỉ: {address}</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={styles.logout}>
            <Text style={{fontSize: 25, color: '#fff', fontWeight: '200'}}>
              Đăng xuất
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('EditPerson', {transData: data})}
            style={styles.logout}>
            <Text style={{fontSize: 25, color: '#fff', fontWeight: '200'}}>
              Thay đổi thông tin
            </Text>
          </TouchableOpacity>
          <Ionicons
            style={{position: 'absolute', top: 15, right: 40}}
            name="brush"
            size={28}
            color="red"
            onPress={() =>
              navigation.navigate('EditPerson', {
                transData: data,
              })
            }
          />
          <Avatar
            size="xlarge"
            title="LW"
            onPress={() => setModalVisible(true)}
            activeOpacity={0.7}
            rounded
            source={{
              uri:img ,
            }}
            containerStyle={{
              position: 'absolute',
              top: -75,
              left: (width - 40) / 2 - 75,
              backgroundColor: 'pink',
            }}
          />
          <Modal
            transparent
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}>
            <View style={styles.modalView}>
              {/* <ImageViewer
                  imageUrls={images}
                  index={images.id}
                  onSwipeDown={() => {
                    console.log(' onSwipeDown');
                  }}
                  onMove={data => console.log(data)}
                  enableSwipeDown
                /> */}
              <ImageZoom
                cropWidth={Dimensions.get('window').width}
                cropHeight={500}
                imageWidth={Dimensions.get('window').width}
                imageHeight={500}>
                <Image
                  style={{width: 400, height: 400, resizeMode: 'contain'}}
                  source={{
                    uri: img,
                  }}
                />
              </ImageZoom>
              <Pressable
                style={{
                  height: 30,
                  width: 100,
                  backgroundColor: 'blue',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                }}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={{color: '#fff'}}>Hide</Text>
              </Pressable>
            </View>
          </Modal>
          {/* <ImageZoom
                    //cropWidth={Dimensions.get('window').width}
                    //cropHeight={Dimensions.get('window').height-500}
                  imageWidth={200}
                  imageHeight={200}>
                  <Image
                    style={{width: 200, height: 200,resizeMode:"contain"}}
                    source={{
                      uri: 'https://vuongquocanh.com/wp-content/uploads/2018/03/england-wal.jpg',
                    }}
                  />
                </ImageZoom> */}
        </View>
      </ImageBackground>
    </View>
  );
}
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: '#FFFFFFAB',
    marginHorizontal: 20,
    height: 400,
    marginTop: 100,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    paddingTop: 70,
  },

  viewChildren: {
    width: '100%',
    marginVertical: 2,
    paddingVertical: 5,
    borderBottomWidth: 0.2,
  },
  logout: {
    height: 40,
    width: 200,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#406C81',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    marginTop: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    minHeight: 500,
    elevation: 5,
    padding: 10,
  },
});
