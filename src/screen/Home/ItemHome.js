import React, {useContext} from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {AppContext, Light, ViewCore} from '@component'
import {navigate} from '@navigation'
export default function ItemHome ({item}) {
  const {permission} = useContext(AppContext)
  const handleClick = () => {
    const isObject = v => {
      return !!v && v.constructor === Object
    }
    let find = permission.find(key => key.name == item.permision)
    if (isObject(find)) navigate(item.navigation)
    else
      ToastAndroid.showWithGravity(
        'Bạn không có quyền truy cập',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      )
  }
  return (
    <TouchableOpacity
      onPress={handleClick}
      style={[
        {
          width: 0.5 * width - 10,
          height: 150,
          backgroundColor: Light.blue_faint,
        },
        styles.container,
      ]}>
      <Ionicons name={item.icon} color={item.colorText} size={40} />
      <ViewCore height={50} position="absolute" bottom={10}>
        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
          {item.name}
        </Text>
      </ViewCore>
    </TouchableOpacity>
  )
}
import {Dimensions} from 'react-native'
const {width} = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 5,
   
    paddingTop:30,
    alignItems: 'center',
  },
})
