import React, {useState, useContext, useEffect, useRef} from 'react'
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
  Modal,
} from 'react-native'
import styles from './styles'
import {apiLoginPermision, getLocalHost, setLocalHost} from '@api'
import Spinner from 'react-native-spinkit'
import {
  ToastAndroidShort,
  AppContext,
  IconCore,
  ButtonBasic,
  ViewCore,
  TextCore,
  InputBasic,
} from '@component'
import {Fumi} from 'react-native-textinput-effects'
import {Content} from 'native-base'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import {navigate} from '@navigation'
import {isEmpty} from 'underscore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import RNBootSplash from "react-native-bootsplash";
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
          if (isObject(find)) {
            RNBootSplash.show({ fade: true })
            navigate('Drawer')
          }
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
      .catch(e =>
        ToastAndroidShort('Quá trình xảy ra lỗi! Xin vui lòng thử lại sau !'),
      )
      .finally(() => setProgess(false))
  }
  const [port, setPort] = useState(false)
  const refPort = useRef()
  const settingPort = () => {
    let strPort = refPort.current.getValue()
    if (isEmpty(strPort)) return null
    else {
      setLocalHost(strPort)
      setPort(false)
      try {
        AsyncStorage.setItem(
          '@localhost',
          JSON.stringify({
            data: strPort,
          }),
        )
      } catch (error) {
        // Error saving data
      }
    }
  }
  const setDefaultPort = () => {
    refPort.current.setValue('https://boiling-ravine-46707.herokuapp.com/')
  }
  useEffect(() => {
    RNBootSplash.hide({ fade: true })
    _retrieveData()
  }, [])
  const _retrieveData = async () => {
    try {
      const localhost = await AsyncStorage.getItem('@localhost')
      if (localhost !== null) {
        const result = JSON.parse(_result)
        setLocalHost(result.data)
      }
    } catch (error) {
      // Error retrieving data
    }
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
            onPress={() => {
              ToastAndroidShort('Liên hệ ban quản lý để lấy lại mật khẩu.')
              // navigate('Forgot')
            }}
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
        <IconCore
          name='settings'
          position='absolute'
          right={15}
          top={5}
          color='#0E95D4B4'
          size={25}
          onPress={() => setPort(true)}
        />
        <Modal animationType='none' transparent={true} visible={port}>
          <ViewCore
            width={'100%'}
            height={'100%'}
            backgroundColor='#0000006B'
            midle>
            <ViewCore
              width={'80%'}
              height={200}
              padding={10}
              backgroundColor='gray'
              borderRadius={5}>
              <TextCore color='#fff'>Nhập domain::</TextCore>
              <TextCore color='red'>
                https://boiling-ravine-46707.herokuapp.com/
              </TextCore>
              <InputBasic
                ref={refPort}
                placeholder='sadasdas'
                marginTop={10}
                valueInit={getLocalHost()}
              />
              <ViewCore
                row
                marginTop={15}
                centerHorizontal
                paddingHorizontal={10}>
                <ButtonBasic
                  title={'OK'}
                  backgroundColor='red'
                  onPress={settingPort}
                />
                <ButtonBasic
                  title={'Cancel'}
                  backgroundColor='#4B4949'
                  onPress={() => setPort(false)}
                />
              </ViewCore>
              <ButtonBasic
                width={50}
                height={20}
                title={'Default'}
                backgroundColor='#11501C'
                onPress={setDefaultPort}
                position='absolute'
                top={5}
                right={5}
              />
            </ViewCore>
          </ViewCore>
        </Modal>
      </Content>
    </TouchableWithoutFeedback>
  )
}
