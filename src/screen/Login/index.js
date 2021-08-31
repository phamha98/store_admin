import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import {AppContext} from '@component/AppContext';
import {apiLogin, apiLoginPermision} from '@api';
import Spinner from 'react-native-spinkit';
import NetInfo from '@react-native-community/netinfo';
import {ToastAndroidShort} from '@component/ToastAndroid';
import {Fumi} from 'react-native-textinput-effects';
import {Content} from 'native-base';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default function Login({navigation}) {
  const [netState, setNetState] = useState(false);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      //console.log('Connection type', state.type);
      //console.log('Is connected?', state.isConnected);
      return setNetState(state.isConnected);
    });
  }, [netState]);
  const [email, setEmail] = useState('m');
  const [password, setPassword] = useState('m');
  const [progess, setProgess] = useState(false);
  const {setToken, setIdUser, permission, setPermission} =
    useContext(AppContext);
  const btnLogin = () => {
    if (!netState) return ToastAndroidShort('Không có kết nối');
    setProgess(true);
    apiLoginPermision(email, password)
      .then(result => {
        if (result.code === 200) {
          setToken(result.data.token);
          setPermission(result.permission);
          setIdUser(result.data.id_user);
          console.log('Login thanh cong');
          const isObject = v => {
            return !!v && v.constructor === Object;
          };
          let permission1 = result.permission;
          let find = permission1.find(item => item.name == 'manager');
          // console.log(isObject(find));
          if (isObject(find)) navigation.navigate('Drawer');
          //navigation.replace('Drawer');
          else alert('Ban Khong co quyen truy cap,neu tiep tuc se canh bao');
        } else {
          Alert.alert('Email hoặc mật khẩu không đúng', result.message, [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel '),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {
                setEmail('');
                setPassword('');
              },
            },
          ]);
        }
      })
      .catch(e => console.log(e))
      .finally(() => setProgess(false));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Content style={{flex: 1, backgroundColor: '#0B193F'}}>
        <View style={styles.container}>
          <StatusBar hidden={false} backgroundColor="#0B193F"></StatusBar>
          <View
            style={{
              marginHorizontal: 0,
              height: 50,
              backgroundColor: 'red',
            }}></View>
          <Image
            style={styles.img}
            source={require('../../img/aodep.png')}></Image>
          <Fumi
            style={styles.textInput1}
            label={'Email'}
            iconClass={FontAwesomeIcon}
            iconName={'envelope'}
            iconColor={'#FFFFFF'}
            iconSize={20}
            iconWidth={40}
            inputPadding={16}
            textContentType="emailAddress"
            onChangeText={text => setEmail(text)}
            value={email}
          />
          <Fumi
            style={styles.textInput1}
            label={'Mật khẩu'}
            iconClass={FontAwesomeIcon}
            iconName={'lock'}
            iconColor={'#FFFFFF'}
            iconSize={25}
            iconWidth={40}
            inputPadding={16}
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
            value={password}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('Forgot')}
            style={styles.textForgot}>
            <Text style={{fontSize: 16, color: 'gray'}}>Quên mật khẩu</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={btnLogin} style={styles.buttonLogin1}>
            <Text style={{fontSize: 25, color: '#fff'}}>Đăng nhập</Text>
          </TouchableOpacity>
          {progess && (
            <Spinner
              isVisible={true}
              size={100}
              type="FadingCircleAlt"
              color="blue"
              style={{position: 'absolute', top: 310}}
            />
          )}
        </View>
      </Content>
    </TouchableWithoutFeedback>
  );
}