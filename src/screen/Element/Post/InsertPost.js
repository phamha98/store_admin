import React, {useState, useContext, useRef} from 'react'
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  ToastAndroid,
  Alert,
} from 'react-native'

import {
  ToastAndroidShort,
  ToastAndroidLong,
} from '../../../component/ToastAndroid'
import Header from '../Permission/Header'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {Fumi, Isao} from 'react-native-textinput-effects'
import Textarea from 'react-native-textarea'
import RBSheet from 'react-native-raw-bottom-sheet'
import ImagePicker from 'react-native-image-crop-picker'
import styles from './styles'
import {apiInsertPost, apiUpdatePost} from '../../../api'
import {
  AppContext,
  HeaderC,
  Layout,
  screen_width,
  TabCustom,
  ViewCore,
} from '@component'
import {navigate} from '@navigation'
export default function InsertPost ({route, navigation}) {
  const {token} = useContext(AppContext)
  const {idT, titleT, contentT, imgT} = route.params
  const [id, setId] = useState(idT)
  const [title, setTitle] = useState(titleT)
  const [content, setContent] = useState(contentT)
  const [img, setImg] = useState({path: imgT, data: ''})
  const [url, setUrl] = useState(false)
  const refRBSheet = useRef()
  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      // cropping: true,
      includeBase64: true,
    })
      .then(image => {
        setImg(image)
        setUrl(true)
      })
      .catch(err => {
        console.log('openCamera catch' + err.toString())
      })
      .finally(() => refRBSheet.current.close())
  }

  const openLibary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      //cropping: true,
      includeBase64: true,
    })
      .then(image => {
        setImg(image)
        setUrl(true)
      })
      .catch(err => {
        console.log('openCamera catch' + err.toString())
      })
      .finally(() => refRBSheet.current.close())
  }
  const send = () => {
    if (title === '' || content === '' || img.path === '')
      return ToastAndroidShort('Không được để trống!')
    if (id === '') {
      apiInsertPost(
        title,
        content,
        url ? 'data:' + img.mime + ';base64,' + img.data : img.path,
      )
        .then(r => {
          if (r.code === 200) return ToastAndroidShort(r.msg)
        })
        .catch(() => console.log(e))
    } else {
      console.log(id, title, content, img)
      apiUpdatePost(
        id,
        title,
        content,
        url ? 'data:' + img.mime + ';base64,' + img.data : img.path,
      )
        .then(r => {
          if (r.code === 200) navigation.goBack()
        })
        .catch(() => console.log(e))
    }
  }
  return (
    <Layout backgroundColor="#c7c7c7">
      <HeaderC title='Thêm bài' />
      <View style={styles.content}>
        <Textarea
          containerStyle={[
            styles.textareaContainer,
            {height: 100, marginVertical: 10},
          ]}
          style={styles.textTitle}
          maxLength={100}
          placeholder={'Tiêu đề'}
          placeholderTextColor={'#c7c7c7'}
          underlineColorAndroid={'transparent'}
          value={title}
          onChangeText={text => setTitle(text)}
        />

        <Textarea
          containerStyle={styles.textareaContainer}
          style={styles.textarea}
          maxLength={1000}
          placeholder={'Nội dung bài viết'}
          placeholderTextColor={'#c7c7c7'}
          underlineColorAndroid={'transparent'}
          value={content}
          onChangeText={text => setContent(text)}
        />
        <TouchableOpacity
          style={{marginTop: 30, marginHorizontal: 10, alignItems: 'center'}}
          onPress={() => refRBSheet.current.open()}>
          <Image
            source={{uri: img.path}}
            style={{width: 350, height: 200, resizeMode: 'contain'}}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={send}>
          <Text>{id === '' ? 'Đăng' : 'Sửa'}</Text>
        </TouchableOpacity>

        <RBSheet
          //**************  ************* */
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          height={300}
          openDuration={300}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
              backgroundColor: '#8B7878CA',
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}
          //*************************** */
        >
          <View style={styles.viewChose}>
            <TouchableOpacity onPress={openCamera} style={styles.rowSheet}>
              <Text
                style={[
                  styles.textW,
                  {color: '#FFFFFF', marginHorizontal: 10},
                ]}>
                Đi đến máy ảnh
              </Text>
              <Ionicons name='camera-outline' size={30} color='#fff' />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={openLibary}
              style={[styles.rowSheet, {backgroundColor: '#58FF0A'}]}>
              <Text
                style={[
                  styles.textW,
                  {color: '#F09494', marginHorizontal: 10},
                ]}>
                Đi đến Thư viện ảnh
              </Text>
              <Ionicons name='images-outline' size={28} color='#00CCFF' />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => refRBSheet.current.close()}
              style={[styles.rowSheet, {backgroundColor: '#B35858'}]}>
              <Text style={[styles.textW, {color: '#0B07FF'}]}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
      </View>
    </Layout>
  )
}
