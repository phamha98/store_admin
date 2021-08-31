import React, {useState, useContext} from 'react';
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Keyboard,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Modal,
  Pressable,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {Avatar} from 'react-native-elements';
const {width, height} = Dimensions.get('window');

import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../component/Header';
import {AppContext} from '../../component/AppContext';
import {apiPersonUpdate} from '../../api';
export default function index({route, navigation}) {
  const {token, idUser, setLEP, lEP} = useContext(AppContext);
  const {transData} = route.params;
  const [data, setData] = useState(transData);
  const [address, setAddress] = useState(data.address);
  const [name, setName] = useState(data.name);
  const [email, setEmail] = useState(data.email);
  const [phone, setPhone] = useState(data.phone);
  
  const [img, setImg] = useState({path: data.img, data: '',mime:""});

  const update = () => {
    apiPersonUpdate(
      token,
      idUser,
      name,
      phone,
      address,
      'data:' + img.mime + ';base64,' + img.data,
    ).catch(e => console.log(e));
    setLEP(!lEP);
    navigation.goBack();
  };

  const [modalVisible, setModalVisible] = useState(false);

  const gotoCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      // cropping: true,
      includeBase64: true,
    })
      .then(image => {
        console.log(image);
        setImg(image);
      })
      .catch(err => {
        console.log('openCamera catch' + err.toString());
      });
  };
  const gotoLibary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      //cropping: true,
      includeBase64: true,
    })
      .then(image => {
        console.log(image);
        setImg(image);
      })
      .catch(err => {
        console.log('openCamera catch' + err.toString());
      });
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar hidden={true} backgroundColor="#0B193F" />

        <ImageBackground
          style={{flex: 1}}
          source={require('../../img/signup.jpg')}>
          <Header
            background={null}
            navigation={navigation}
            onClickLeft={() => navigation.goBack()}
            title="Chỉnh sửa thông tin cá nhân"
          />
          <View style={styles.content}>
            <View style={[styles.viewChildren, {alignItems: 'center'}]}>
              <TextInput
                placeholder="Name"
                style={{fontSize: 28, fontWeight: 'bold'}}
                value={name}
                onChangeText={text => setName(text)}></TextInput>
            </View>
            <View style={styles.viewChildren}>
              <TextInput
                placeholder="Phone"
                style={styles.textInput}
                value={phone}
                onChangeText={text => setPhone(text)}></TextInput>
            </View>
            <View style={styles.viewChildren}>
              <TextInput
                placeholder="Address"
                style={styles.textInput}
                value={address}
                onChangeText={text => setAddress(text)}></TextInput>
            </View>
            <TouchableOpacity onPress={update} style={styles.logout}>
              <Text style={{fontSize: 25, color: '#fff', fontWeight: '200'}}>
                Save{'  '}
                <Ionicons
                  style={{position: 'absolute', top: 15, right: 40}}
                  name="checkmark-done-outline"
                  size={25}
                />
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={styles.imgAvatar}
              onPress={() => setModalVisible(true)}>
              <Image
                source={{uri: img.path}}
                style={{width: 100, height: 100, resizeMode: 'contain'}}
              />
              <Ionicons
                style={{position: 'absolute', top: 35, right: 35}}
                name="brush"
                size={28}
                color="blue"
              />
            </TouchableOpacity> */}
            <Avatar
              size="xlarge"
              title="LW"
              onPress={() => setModalVisible(true)}
              activeOpacity={0.7}
              rounded
              source={{
                uri: img.path,
              }}
              containerStyle={{
                position: 'absolute',
                top: -75,
                left: (width - 40) / 2 - 75,
                backgroundColor: 'pink',
              }}
            />
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
                <Text style={styles.modalText}>Chose img</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={gotoCamera}>
                  <Text style={styles.textStyle}>Camera</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={gotoLibary}>
                  <Text style={styles.textStyle}>Libary</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Hide</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}
