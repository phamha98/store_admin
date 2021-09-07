import React, {useState, useEffect, useContext} from 'react'
import {
  Button,
  StyleSheet,
  Image,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Modal,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import {uriImg} from '@utils'
import {apiGoodDetails} from '@api'
import {
  AppContext,
  HeaderC,
  Layout,
  TextCore,
  Light,
  ViewCore,
  ButtonBasic,
} from '@component'
import {navigate} from '@navigation'
export default function ShowGoodDetails ({route}) {
  const {token} = useContext(AppContext)
  const [data, setData] = useState([])
  const [arrayImage, setArrayImage] = useState([])
  const [arraySize, setArraySize] = useState([])
  const [progess, setProgess] = useState(true)
  const [load, setLoad] = useState(true)
  const {idProductDetails, name} = route.params
  useEffect(() => {
    setProgess(true)
    apiGoodDetails(token, idProductDetails).then(result => {
      console.log(result)
      setData(result.data)
      setArrayImage(result.data.array_img)
      setArraySize(result.data.products)
      setProgess(false)
    })
  }, [load])
  return (
    <Layout>
      <HeaderC title={name ? name : 'SP'} />
      <ScrollView>
        <FlatList
          data={arrayImage}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <Image
              source={uriImg(item.name)}
              style={{
                width: 200,
                height: 200,
                resizeMode: 'contain',
              }}
            />
          )}
          contentContainerStyle={{
            marginVertical: 10,
            backgroundColor: Light.border,
          }}
        />
        <ViewCore paddingHorizontal={5} backgroundColor={Light.background}>
          <ViewCore>
            <TextCore bold size={20}>
              {data.name}
            </TextCore>
            <TextCore size={16}>Giá:{data.price}</TextCore>
            <TextCore size={16}>Sale:{data.sale}%</TextCore>
            <TextCore size={16}>Kiểu:{data.new == 1 ? 'Mới' : 'Không'}</TextCore>
            <TextCore size={16}>Phù hợp:{data.gender}</TextCore>
            <TextCore>{data.details}</TextCore>
          </ViewCore>
          <View style={styles.viewSize}>
            {arraySize.map((item, index) => (
              <View key={index}>
                <View style={styles.viewItemSize}>
                  <Text style={styles.fontW}>Size:{item.size}</Text>
                  <Text style={styles.fontW}>Number:{item.number}</Text>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.viewFix}>
            <TouchableOpacity
              onPress={() => navigate('UpdateGoods', {dataResult: data})}
              style={styles.button}>
              <Text style={[styles.fontW, {color: '#fff'}]}>Chỉnh sửa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: 'red'}]}>
              <Text style={[styles.fontW, {color: '#fff'}]}>Xóa</Text>
            </TouchableOpacity>
          </View>
        </ViewCore>
      </ScrollView>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#02AFFF'},
  viewImg: {
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: '#fff',
  },
  viewInfo: {
    marginHorizontal: 10,
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 10,
  },
  viewSize: {
    //marginHorizontal: 10,
    padding: 10,
    //flexDirection: 'row',
  },
  viewItemSize: {
    flexDirection: 'row',
    marginVertical: 5,
    minHeight: 40,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingRight: 50,
  },
  viewFix: {
    marginHorizontal: 10,
    minHeight: 50,
    backgroundColor: '#fff',
    marginBottom: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  button: {
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'blue',
  },
  fontW: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  fontA: {
    fontSize: 14,
  },
})
