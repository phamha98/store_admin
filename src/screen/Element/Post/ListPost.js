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
export default function ListPost ({navigation}) {
  const [data, setData] = useState([])
  const [process, setProcess] = useState(true)
  const [load, setLoad] = useState(false)

  useEffect(() => {
    apiLoadPost()
      .then(r => {
        if (r.code === 200) setData(r.data)
      })
      .catch(e => console.log(e))
      .finally(() => {
        setProcess(false)
        setLoad(false)
      })
  }, [load])
  const handleRefreshing = () => {
    setProcess(true)
    setLoad(!load)
  }
  const CardStatic = ({img, title, content, id, navigation}) => {
    const [active, setactive] = useState(false)
    const handleDelete = () => {
      apiDeletePost(id)
        .then(r => {
          console.log(r)
          if (r.code === 200) {
            setLoad(true)
          } else ToastAndroidShort(r.msg)
        })
        .catch(e => console.log(e))
    }
    const handleUpdate = () => {
      return navigation.navigate('InsertPost', {
        idT: id,
        titleT: title,
        contentT:content,
        imgT: img,
      })
    }
    return (
      <Card>
        <Card.Title>{title}</Card.Title>
        <Card.Divider />
        <Image
          source={{
            uri: img,
          }}
          style={{width: '100%', minHeight: 200, resizeMode: 'stretch'}}
        />
        <Text style={{marginBottom: 10}}>{content}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 0,
          }}>
          <Button
            icon={<Icon name='code' color='#ffffff' />}
            buttonStyle={{
              borderRadius: 5,
              backgroundColor: 'pink',
            }}
            title='Sửa'
            onPress={handleUpdate}
          />
          <Button
            icon={<Icon name='code' color='#ffffff' />}
            buttonStyle={{
              borderRadius: 5,
              backgroundColor: 'pink',
            }}
            title='Xóa'
            onPress={handleDelete}
          />
        </View>

        <Fab
          active={active}
          direction='up'
          containerStyle={{
            backgroundColor: null,
            position: 'absolute',
            bottom: 100,
            right: 5,
            zIndex: 10,
          }}
          style={{backgroundColor: 'pink'}}
          position='bottomRight'
          onPress={() => setactive(!active)}>
          <Ionicons name='cog-outline' size={25} />
          <Button
            style={{backgroundColor: '#34A34F', zIndex: 30}}
            onPress={() => alert('sadas')}>
            <Ionicons name='cut-outline' size={25} color='#fff' />
          </Button>
          <Button style={{backgroundColor: '#DD5144'}}>
            <Ionicons
              onPress={() => alert('sadas')}
              name='trash-outline'
              size={25}
              color='#fff'
            />
          </Button>
        </Fab>
      </Card>
    )
  }

  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        title='Danh sách'
        rightIcon={true}
        background='#85827A'
        rightNameIcon='person-circle-outline'
        onClickLeft={() => navigation.goBack()}
        onClickRight={() => navigation.navigate('Person')}
      />
      {process === true && !load === true && (
        <ActivityIndicator color='red' size={30} />
      )}

      <FlatList
        data={data}
        refreshing={load}
        onRefresh={handleRefreshing}
        keyExtractor={item => item.id}
   
        renderItem={({item}) => (
          <CardStatic
            id={item.id}
            img={item.img}
            title={item.title}
            content={item.content}
            navigation={navigation}
          />
        )}
      />
    </View>
  )
}
