import React, {useState, useEffect} from 'react'
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import Header from '../Permission/Header'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {Fab} from 'native-base'
import {Card, Button, Icon, Image} from 'react-native-elements'
import styles from './styles'
import {apiLoadPost, apiDeletePost} from '../../../api'
import {ToastAndroidShort} from '../../../component/ToastAndroid'
import {
  AppContext,
  HeaderC,
  Layout,
  Light,
  screen_width,
  TabCustom,
  TextCore,
  ViewCore,
} from '@component'
import ItemPost from './component/ItemPost'
import {navigate} from '@navigation'
export default function ListPost () {
  const [data, setData] = useState([])
  const [process, setProcess] = useState(true)
  useEffect(() => {
    apiLoadPost()
      .then(r => {
        if (r.code === 200) setData(r.data)
      })
      .catch(e => console.log(e))
      .finally(() => {
        setProcess(false)
      })
  }, [process])
  const handleUpdate = item => {
    return navigate('InsertPost', {
      idT: item.id,
      titleT: item.title,
      contentT: item.content,
      imgT: item.img,
    })
  }
  const handleDelete = async item => {
  await  apiDeletePost(item.id)
      .then(r => {
        if (r.code === 200) {
          setProcess(true)
        }
      })
      .catch(e => {})
  }
  return (
    <Layout backgroundColor={Light.background}>
      <HeaderC title='Danh sách' />
      <FlatList
        data={data}
        refreshing={process}
        onRefresh={() => setProcess(true)}
        keyExtractor={item => item.id}
        ListEmptyComponent={() => (
          <ViewCore alignItems>
            <TextCore color={Light.blue_faint}>Không có dữ liệu</TextCore>
          </ViewCore>
        )}
        renderItem={({item}) => (
          <ItemPost
            item={item}
            onUpdate={() => handleUpdate(item)}
            onRemove={() => handleDelete(item)}
          />
        )}
        contentContainerStyle={{padding: 10}}
      />
    </Layout>
  )
}
