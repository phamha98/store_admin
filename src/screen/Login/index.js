import React, {useState, useContext, useEffect} from 'react'
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
} from 'react-native'
import styles from './styles'
import {apiLoginPermision} from '@api'
import Spinner from 'react-native-spinkit'
import {ToastAndroidShort, AppContext} from '@component'
import {Fumi} from 'react-native-textinput-effects'
import {Content} from 'native-base'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import {navigate} from '@navigation'
export default function Login () {
  const [email, setEmail] = useState('m')
  const [password, setPassword] = useState('m')
  const [progess, setProgess] = useState(false)
  const {setToken, setIdUser, permission, setPermission} = useContext(
    AppContext,
  )
  const btnLogin = () => {
    if (email.trim() === '') return ToastAndroidShort('Bạn cần nhập Email!')
    if (password.trim() === '')
      return ToastAndroidShort('Bạn cần nhập mật khẩu!')
    setProgess(true)
    apiLoginPermision(email, password)
      .then(result => {
        console.log(result)
        if (result.code === 200) {
          setToken(result.data.token)
          setPermission(result.permission)
          setIdUser(result.data.id_user)
          console.log('Login thanh cong')
          const isObject = v => {
            return !!v && v.constructor === Object
          }
          let permission1 = result.permission
          let find = permission1.find(item => item.name == 'manager')
          if (isObject(find)) navigate('Drawer')
          else {
            Alert.alert('Thông báo', 'Bạn không có quyền truy cập', [
              {
                text: 'Quay lại',
              },
            ])
          }
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
                setEmail('')
                setPassword('')
              },
            },
          ])
        }
      })
      .catch(e =>ToastAndroidShort("Quássss trình xảy ra lỗi! Xin vuii lòng thử lại sau."))
      .finally(() => setProgess(false))
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Content style={{flex: 1, backgroundColor: '#0B193F'}}>
        <View style={styles.container}>
          <StatusBar backgroundColor='#0B193F' />
          <Image style={styles.img} source={require('@image/aodep.png')} />
          <Fumi
            style={styles.textInput1}
            label={'Email'}
            iconClass={FontAwesomeIcon}
            iconName={'envelope'}
            iconColor={'#FFFFFF'}
            iconSize={20}
            iconWidth={40}
            inputPadding={16}
            textContentType='emailAddress'
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
              type='FadingCircleAlt'
              color='blue'
              style={{position: 'absolute', top: 310}}
            />
          )}
        </View>
      </Content>
    </TouchableWithoutFeedback>
  )
}
