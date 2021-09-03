import React, {useState, useContext} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ToastAndroid,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import {Picker} from '@react-native-picker/picker'
import Header from '../Header'
import Spinner from 'react-native-spinkit'
import {AppContext, HeaderC, Layout, ViewCore, TextCore} from '@component'
import {navigate, goBack} from '@navigation'
import {
  apiSearchCodeBill,
  apiSearchBillUser,
  apiSearchBillProduct,
  apiSearchBillDate,
  apiSortBillDate,
  apiSortBillNumber,
  apiSortBillPrice,
} from '@api'
import styles from './styles'
import {ScrollView} from 'react-native-gesture-handler'
import DatePicker from 'react-native-date-picker'
export default function index ({navigation}) {
  const {token} = useContext(AppContext)
  const [sort, setSort] = useState('sortPrice')
  const [search, setSearch] = useState('searchCode')
  const [value, setValue] = useState()
  const [data, setData] = useState({
    bill_details: '',
    user_order: '',
    user_confirm: '',
    user_transport: '',
  })
  const [dataBillUser, setDataBillUser] = useState([
    {
      id: 1,
      bill_details: '',
      user_order: '',
      user_confirm: '',
      user_transport: '',
    },
  ])
  const [dataBillProduct, setDataBillProduct] = useState([
    {
      id: 1,
      bill_details: '',
      user_order: '',
      user_confirm: '',
      user_transport: '',
    },
  ])
  const [dataBillDate, setDataBillDate] = useState([
    {
      id: 1,
      bill_details: '',
      user_order: '',
      user_confirm: '',
      user_transport: '',
    },
  ])
  const [dataSort, setDataSort] = useState([
    {
      id: 1,
      bill_details: '',
      user_order: '',
      user_confirm: '',
      user_transport: '',
    },
  ])
  const [dataSortNumber, setDataSortNumber] = useState([
    {
      id: 1,
      bill_details: '',
      user_order: '',
      user_confirm: '',
      user_transport: '',
      total_number: 0,
    },
  ])
  const [typeSort, setTypeSort] = useState('desc')
  const [dateLeft, setDateLeft] = useState(new Date('2021-05-25'))
  const [dateRight, setDateRight] = useState(new Date('2021-05-28'))
  const [progess, setProgess] = useState(false)

  const searchCodeBill = () => {
    setProgess(true)
    if (search == 'searchCode') {
      apiSearchCodeBill(value, token)
        .then(data => {
          setProgess(false)
          if (data.code == 200) {
            setData(data.staterow)
          } else
            ToastAndroid.showWithGravity(
              'Không tìm thấy đơn hàng',
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
            )
        })
        .catch(e => console.log(e))
    }
    if (search == 'searchUser') {
      apiSearchBillUser(value, token).then(data => {
        setProgess(false)
        if (data.code == 200) {
          setDataBillUser(data.data)
          //console.log(data);
        } else
          ToastAndroid.showWithGravity(
            'Không tìm thấy đơn hàng',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          )
      })
    }
    if (search == 'searchProduct') {
      apiSearchBillProduct(value, token).then(data => {
        setProgess(false)
        if (data.code == 200) {
          setDataBillProduct(data.data)
        } else
          ToastAndroid.showWithGravity(
            'Không tìm thấy đơn hàng',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          )
      })
    }
    if (search == 'searchDate') {
      setDataBillDate([
        {
          id: 1,
          bill_details: '',
          user_order: '',
          user_confirm: '',
          user_transport: '',
        },
      ])

      apiSearchBillDate(token, dateLeft, dateRight).then(data => {
        setProgess(false)
        if (data.code == 200) {
          if (data.data.length === 0)
            ToastAndroid.showWithGravity(
              'Không tìm thấy ',
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
            )
          else setDataBillDate(data.data)
        } else
          ToastAndroid.showWithGravity(
            'Không tìm thấy đơn hàng',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          )
      })
    }
    if (search == 'sortPrice') {
      setDataSort([
        {
          id: 1,
          bill_details: '',
          user_order: '',
          user_confirm: '',
          user_transport: '',
        },
      ])
      apiSortBillPrice(token, typeSort).then(data => {
        setProgess(false)
        if (data.code == 200) {
          if (data.data.length === 0)
            ToastAndroid.showWithGravity(
              'Không có đơn hàng ',
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
            )
          else {
            console.log(data)
            setDataSort(data.data)
          }
        } else
          ToastAndroid.showWithGravity(
            'Sự cố',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          )
      })
    }
    if (search == 'sortDate') {
      setDataSort([
        {
          id: 1,
          bill_details: '',
          user_order: '',
          user_confirm: '',
          user_transport: '',
        },
      ])
      apiSortBillDate(token, typeSort).then(data => {
        setProgess(false)
        if (data.code == 200) {
          if (data.data.length === 0)
            ToastAndroid.showWithGravity(
              'Không có đơn hàng ',
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
            )
          else setDataSort(data.data)
        } else
          ToastAndroid.showWithGravity(
            'Sự cố',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          )
      })
    }
    if (search == 'sortNumber') {
      setDataSortNumber([
        {
          id: 1,
          bill_details: '',
          user_order: '',
          user_confirm: '',
          user_transport: '',
          total_number: 0,
        },
      ])
      apiSortBillNumber(token, typeSort).then(data => {
        setProgess(false)
        if (data.code == 200) {
          if (data.data.length === 0)
            ToastAndroid.showWithGravity(
              'Không có đơn hàng ',
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
            )
          else setDataSortNumber(data.data)
        } else
          ToastAndroid.showWithGravity(
            'Sự cố',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          )
      })
    }
  }
  return (
    <Layout backgroundColor="#C7C4C4">
      <HeaderC title='Tìm kiếm đơn hàng' />
      <ScrollView>
        <View style={styles.filter}>
          <TouchableOpacity
            onPress={searchCodeBill}
            style={{
              backgroundColor: 'green',
              width: 120,
              height: 40,
              justifyContent: 'center',
              borderRadius: 5,
            }}>
            <Text style={{color: '#fff'}}> Tìm kiếm/ Sắp xếp</Text>
          </TouchableOpacity>
          <Picker
            selectedValue={search}
            style={{height: 50, width: 250}}
            onValueChange={(itemValue, itemIndex) => setSearch(itemValue)}>
            <Picker.Item label='Theo mã đơn hàng' value='searchCode' />
            <Picker.Item label='Theo mã khách hàng' value='searchUser' />
            <Picker.Item label='Theo mã sản phẩm' value='searchProduct' />
            <Picker.Item label='Theo ngày đặt hàng' value='searchDate' />
            <Picker.Item label='Sắp sếp theo giá ' value='sortPrice' />
            <Picker.Item label='Sắp xếp theo ngày ' value='sortDate' />
            <Picker.Item label='Sắp xếp theo số lượng ' value='sortNumber' />
          </Picker>
        </View>
        {(search === 'searchCode' ||
          search === 'searchUser' ||
          search === 'searchProduct') && (
          <TextInput
            style={styles.textInput}
            placeholder='Tìm kiếm.....'
            value={value}
            onChangeText={text => setValue(text)}></TextInput>
        )}
        {search == 'searchDate' && (
          <View style={{marginHorizontal: 10, alignItems: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'blue'}}>
              Từ ngày
            </Text>
            <DatePicker
              date={dateLeft}
              onDateChange={setDateLeft}
              mode='date'
            />
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'green'}}>
              Đến ngày
            </Text>
            <DatePicker
              date={dateRight}
              onDateChange={setDateRight}
              mode='date'
            />
          </View>
        )}
        {(search == 'sortDate' ||
          search == 'sortPrice' ||
          search == 'sortNumber') && (
          <View
            style={{
              backgroundColor: '#FFDCFA',
              height: 40,
              marginVertical: 4,
              marginHorizontal: 20,
              justifyContent: 'center',
            }}>
            <Picker
              selectedValue={typeSort}
              onValueChange={(itemValue, itemIndex) => setTypeSort(itemValue)}>
              <Picker.Item label='Sắp xếp giảm dần' value='desc' />
              <Picker.Item label='Sắp xếp tăng dần' value='asc' />
            </Picker>
          </View>
        )}
        {search === 'searchCode' && (
          <ItemBill key={index} item={data} navigation={navigation} />
        )}

        {search === 'searchUser' && (
          <View style={styles.billUser}>
            {dataBillUser.map((item, index) => (
              <ItemBill key={index} item={item} navigation={navigation} />
            ))}
          </View>
        )}
        {search === 'searchProduct' && (
          <View style={styles.billUser}>
            {dataBillProduct.map((item, index) => (
              <ItemBill key={index} item={item} navigation={navigation} />
            ))}
          </View>
        )}
        {search === 'searchDate' && (
          <View style={styles.billUser}>
            {dataBillDate.map((item, index) => (
              <ItemBill key={index} item={item} navigation={navigation} />
            ))}
          </View>
        )}
        {(search == 'sortDate' || search == 'sortPrice') && (
          <View style={styles.billUser}>
            {dataSort.map((item, index) => (
              <ItemBill key={index} item={item} navigation={navigation} />
            ))}
          </View>
        )}
        {search == 'sortNumber' && (
          <View style={styles.billUser}>
            {dataSortNumber.map((item, index) => (
              <ItemBill key={index} item={item} navigation={navigation} />
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
              color='blue'
            />
          </View>
        )}
      </ScrollView>
    </Layout>
  )
}

function ItemBill ({item, navigation}) {
  return (
    <View style={styles.containerItem}>
      <View style={{flexDirection: 'row'}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
          Mã Hóa Đơn:HD{item.id_bill}---
        </Text>
        <Text style={{backgroundColor: 'yellow'}}>
          Trạng thái:{item.state == 1 ? 'Chờ xác nhận' : ''}
          {item.state == 2 ? 'Đang giao hàng' : ''}
          {item.state == 3 ? 'Thành công' : ''}
          {item.state == 4 ? 'Đã hủy' : ''}
        </Text>
      </View>
      <ViewName
        title='Tên khách hàng'
        name={item.user_order.name}
        data={item.user_order}
        navigation={navigation}
      />
      {(item.state === '2' || item.state === '3') && (
        <ViewName
          title='Nhân viên xác nhận'
          name={item.user_confirm.name}
          data={item.user_confirm}
          navigation={navigation}
        />
      )}
      {item.state === '3' && (
        <ViewName
          title='Nhân viên vận chuyển'
          name={item.user_transport.name}
          data={item.user_transport}
          navigation={navigation}
        />
      )}
      <View style={styles.rowName}>
        <Text>Ngày đặt hàng:{item.bill_details.date}</Text>
      </View>
      <View style={styles.rowName}>
        <Text>Tổng tiền:{item.bill_details.total_price}</Text>
      </View>
      {item.total_number && (
        <View style={styles.rowName}>
          <Text>Tổng sản phẩm:{item.total_number}</Text>
        </View>
      )}
      <View style={styles.rowName}>
        <TouchableOpacity
          onPress={() => navigation.navigate('BillDetails', {data: item})}
          style={{
            backgroundColor: '#EE7E14',
            borderRadius: 5,
            paddingHorizontal: 10,
            marginHorizontal: 10,
          }}>
          <Text>Chi tiết</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const ViewName = ({name, data, navigation, title}) => {
  return (
    <View style={styles.rowName}>
      <Text>
        {title}: {name}
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('ShowUser', {data: data})}
        style={{
          backgroundColor: '#FF09F3',
          borderRadius: 5,
          paddingHorizontal: 10,
          marginHorizontal: 10,
        }}>
        <Text>Chi tiết</Text>
      </TouchableOpacity>
    </View>
  )
}
{
  /* <View style={styles.filter}>
        <Text>Sắp xếp</Text>
        <Picker
          selectedValue={sort}
          style={{height: 50, width: 250}}
          onValueChange={(itemValue, itemIndex) => setSort(itemValue)}>
          <Picker.Item label="Sắp sếp theo giá " value="sortPrice" />
          <Picker.Item label="Sắp xếp theo ngày " value="sortDate" />
          <Picker.Item label="Sắp xếp theo số lượng " value="sortNumber" />
        </Picker>
      </View> */
}
