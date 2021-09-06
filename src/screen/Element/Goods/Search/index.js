import React, {useState, useEffect, useContext} from 'react'
import {
  Button,
  StyleSheet,
  Image,
  Text,
  View,
  FlatList,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
} from 'react-native'
import styles from './styles'

import {Picker} from '@react-native-picker/picker'
import Spinner from 'react-native-spinkit'
import {AppContext, HeaderC, Layout, ItemTypeProduct} from '@component'
import {navigate} from '@navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {
  apiGoodDetails,
  apiSearchGoodName,
  apiSortGoodGender,
  apiSortGoodNew,
  apiSortGoodPrice,
  apiSortGoodSale,
  apiSortGoodTotalNumber,
} from '../../../../api'
export default function index ({navigation}) {
  console.log('hello search goods')
  const {token} = useContext(AppContext)
  const [search, setSearch] = useState('searchCode')
  const [progess, setProgess] = useState(false)
  const [value, setValue] = useState()
  const [gender, setGender] = useState('nam')
  const [new1, setNew1] = useState('1')
  const [sale, setSale] = useState()
  const [sort, setSort] = useState('asc')

  const [type, setType] = useState('')

  const [dataSearch, setDataSearch] = useState({
    product: [{id: 0}],
    arraySize: [{id: 0}],
    products: [{id: 0}],
  })
  const [dataSearchName, setDataSearchName] = useState([])

  const searchGoods = () => {
    setProgess(true)
    if (search == 'searchCode') {
      apiGoodDetails(token, value)
        .then(data => {
          // console.log(data);
          setProgess(false)
          if (data.code == 200) {
            setDataSearch(data.data)
          } else
            ToastAndroid.showWithGravity(
              'Không tìm thấy đơn hàng',
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
            )
        })
        .catch(e => console.log(e))
    }
    if (search == 'searchName') {
      apiSearchGoodName(token, value)
        .then(data => {
          setProgess(false)
          if (data.code == 200) {
            setDataSearchName(data.data)
          } else
            ToastAndroid.showWithGravity(
              'Không tìm thấy đơn hàng',
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
            )
        })
        .catch(e => console.log(e))
    }
    if (search == 'filterGender') {
      apiSortGoodGender(token, gender)
        .then(data => {
          setProgess(false)
          if (data.code == 200) {
            setDataSearchName(data.data)
          } else
            ToastAndroid.showWithGravity(
              'Không tìm thấy đơn hàng',
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
            )
        })
        .catch(e => console.log(e))
    }
    if (search == 'filterNew') {
      apiSortGoodNew(token, new1)
        .then(data => {
          setProgess(false)
          if (data.code == 200) {
            setDataSearchName(data.data)
          } else
            ToastAndroid.showWithGravity(
              'Không tìm thấy đơn hàng',
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
            )
        })
        .catch(e => console.log(e))
    }
    if (search == 'filterSale') {
      if (sale == '0') {
        setType('=')
      }
      if (sale == '1') {
        setType('<>')
      }
      apiSortGoodSale(token, type, '0')
        .then(data => {
          setProgess(false)
          if (data.code == 200) {
            setDataSearchName(data.data)
          } else
            ToastAndroid.showWithGravity(
              'Không tìm thấy đơn hàng',
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
            )
        })
        .catch(e => console.log(e))
    }
    if (search == 'filterNumber') {
      apiSortGoodTotalNumber(token, sort)
        .then(data => {
          setProgess(false)
          if (data.code == 200) {
            setDataSearchName(data.data)
          } else
            ToastAndroid.showWithGravity(
              'Không tìm thấy đơn hàng',
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
            )
        })
        .catch(e => console.log(e))
    }
    if (search == 'filterPrice') {
      apiSortGoodPrice(token, sort)
        .then(data => {
          setProgess(false)
          if (data.code == 200) {
            setDataSearchName(data.data)
          } else
            ToastAndroid.showWithGravity(
              'Không tìm thấy đơn hàng',
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
            )
        })
        .catch(e => console.log(e))
    }
  }
  return (
    <Layout>
      <HeaderC title='Tìm kiếm mặt hàng' />
      <ScrollView>
        <View style={styles.filter}>
          <TouchableOpacity onPress={searchGoods} style={styles.buttonFilter}>
            <Text style={{color: '#fff'}}>Tìm kiếm/Lọc</Text>
          </TouchableOpacity>
          <Picker
            selectedValue={search}
            style={{height: 50, width: 250}}
            onValueChange={(itemValue, itemIndex) => {
              setSearch(itemValue)
            }}>
            <Picker.Item label='Theo mã sản phẩm' value='searchCode' />
            <Picker.Item label='Theo tên sản phẩm' value='searchName' />
            <Picker.Item label='Lọc theo sản phẩm mới ' value='filterNew' />
            <Picker.Item label='Lọc theo sale' value='filterSale' />
            <Picker.Item label='Lọc theo giá sản phẩm' value='filterPrice' />
            <Picker.Item label='Lọc theo giới tính' value='filterGender' />
            <Picker.Item label='Lọc theo số lượng hàng' value='filterNumber' />
          </Picker>
        </View>
        {(search === 'searchCode' || search === 'searchName') && (
          <TextInput
            style={styles.textInput}
            placeholder='Tìm kiếm.....'
            value={value}
            onChangeText={text => setValue(text)}></TextInput>
        )}
        {search === 'filterGender' && (
          <View style={styles.pickerGender}>
            <Picker
              selectedValue={gender}
              style={{height: 40, color: '#fff'}}
              onValueChange={(itemValue, itemIndex) => setGender(itemValue)}>
              <Picker.Item label='Nam' value='nam' />
              <Picker.Item label='Nu' value='nu' />
              <Picker.Item label='Tất cả' value='tat' />
            </Picker>
          </View>
        )}
        {search === 'filterNew' && (
          <View style={styles.pickerGender}>
            <Picker
              selectedValue={new1}
              style={{height: 40, color: '#fff'}}
              onValueChange={(itemValue, itemIndex) => setNew1(itemValue)}>
              <Picker.Item label='New' value='1' />
              <Picker.Item label='Old' value='0' />
            </Picker>
          </View>
        )}
        {search === 'filterSale' && (
          <View style={styles.pickerGender}>
            <Picker
              selectedValue={sale}
              style={{height: 40, color: '#fff'}}
              onValueChange={(itemValue, itemIndex) => setSale(itemValue)}>
              <Picker.Item label='Không sale' value='0' />
              <Picker.Item label='Sale' value='1' />
            </Picker>
          </View>
        )}
        {(search === 'filterPrice' || search === 'filterNumber') && (
          <View style={styles.pickerGender}>
            <Picker
              selectedValue={sort}
              style={{height: 40, color: '#fff'}}
              onValueChange={(itemValue, itemIndex) => setSort(itemValue)}>
              <Picker.Item label='Tăng' value='asc' />
              <Picker.Item label='Giảm' value='desc' />
            </Picker>
          </View>
        )}
        {search === 'searchCode' && <ViewSearchCoder dataSearch={dataSearch} />}
        {search !== 'searchCode' && (
          <View
            style={{marginHorizontal: 10, marginVertical: 10, marginBottom: 0}}>
            {dataSearchName.map((item, index) => (
              <View key={index}>
                <ViewMain item={item} navigation={navigation} />
              </View>
            ))}
          </View>
        )}
        {progess && (
          <View
            style={{
              width: 400,
              alignItems: 'center',
              position: 'absolute',
              top: 200,
            }}>
            <Spinner
              isVisible={progess}
              size={100}
              type='ChasingDots'
              F
              color='blue'
            />
          </View>
        )}
      </ScrollView>
    </Layout>
  )
}
function ViewSearchCoder ({dataSearch}) {
  return (
    <View style={styles.viewMain}>
      <Image source={{uri: dataSearch.img}} style={styles.image}></Image>
      <View
        style={{
          minHeight: 130,
          width: 200,

          justifyContent: 'space-between',
        }}>
        <Text style={[styles.font, {fontWeight: 'bold'}]}>
          {dataSearch.name}
        </Text>
        <Text style={styles.fontWeight}>
          Price:<Text style={styles.font}>{dataSearch.price}</Text>
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.fontWeight}>Size: </Text>

          {dataSearch.products.map((item, index) => (
            <View key={index}>
              <Text>{item.size} </Text>
            </View>
          ))}
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ShowGoodDetails', {
                idProductDetails: dataSearch.id,
              })
            }
            style={styles.chose}>
            <Text style={[styles.font, {color: '#fff', fontSize: 13}]}>
              Chi tiết
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => setModalVisible(!modalVisible)}
            style={[styles.chose, {backgroundColor: 'red'}]}>
            <Text style={[styles.font, {color: '#fff', fontSize: 13}]}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          minWidth: 80,
          minHeight: 130,
          padding: 10,
          backgroundColor: 'pink',
          justifyContent: 'space-between',
        }}>
        <Text style={[styles.fontWeight, {color: 'red'}]}>
          {dataSearch.new == 1 ? 'new' : 'no new'}
        </Text>
        <Text style={styles.fontWeight}>Sale:{dataSearch.sale}%</Text>
        <Text style={styles.fontWeight}>Giới:{dataSearch.gender}</Text>
      </View>
    </View>
  )
}
const ViewMain = ({item, navigation}) => {
  return (
    <View style={styles.viewMain}>
      <Image source={{uri: item.img}} style={styles.image}></Image>
      <View
        style={{
          minHeight: 130,
          width: 200,

          justifyContent: 'space-between',
        }}>
        <Text style={[styles.font, {fontWeight: 'bold'}]}>{item.name}</Text>
        <Text style={styles.fontWeight}>
          Price:<Text style={styles.font}>{item.price}</Text>
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.fontWeight}>Size: </Text>
          {item.array_size.map((item, index) => (
            <View key={index}>
              <Text>{item.size}, </Text>
            </View>
          ))}
        </View>
        <Text style={styles.fontWeight}>
          Tổng sản phẩm:
          <Text style={styles.font}>
            {item.total_size != null ? item.total_size.total_number : 0}
          </Text>
        </Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ShowGoodDetails', {
                idProductDetails: item.id,
              })
            }
            style={styles.chose}>
            <Text style={[styles.font, {color: '#fff', fontSize: 13}]}>
              Chi tiết
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => setModalVisible(!modalVisible)}
            style={[styles.chose, {backgroundColor: 'red'}]}>
            <Text style={[styles.font, {color: '#fff', fontSize: 13}]}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          minWidth: 80,
          minHeight: 130,
          padding: 10,
          backgroundColor: 'pink',
          justifyContent: 'space-between',
        }}>
        <Text style={[styles.fontWeight, {color: 'red'}]}>
          {item.new == 1 ? 'new' : 'no new'}
        </Text>
        <Text style={styles.fontWeight}>
          Loại:
          {item.product_type_main.name ? item.product_type_main.name : typeMain}
        </Text>
        <Text style={styles.fontWeight}>Sale:{item.sale}%</Text>
        <Text style={styles.fontWeight}>Giới:{item.gender}</Text>
      </View>
    </View>
  )
}
