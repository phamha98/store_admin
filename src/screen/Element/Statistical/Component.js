import React, {useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';
import styles from './styles';
import {listdata, listChose} from './datatemp';
import localhost from '../../../api/localhost';
import MoneyFormat from '../../../component/MoneyFormat';
import {
  ToastAndroidLong,
  ToastAndroidShort,
} from '../../../component/ToastAndroid';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Moment from 'moment';
export function Tab1() {
  const tableHead = [
    'STT',
    'Mã Hóa đơn',
    'Ngày',
    'Tổng tiền',
    'Số Lượng',
    'Trạng thái',
  ];
  const [tableData, setTableData] = useState([]);
  const [tableTitle, setTableTitle] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceComplete, setTotalPriceComplete] = useState(0);
  const [totalNumber, setTotalNumber] = useState(0);
  const [totalNumberComplete, setTotalNumberComplete] = useState(0);

  const [option, setOption] = useState('today');
  const [process, setProcess] = useState(false);
  const renderColor = name => {
    return name === option ? 'orange' : 'pink';
  };
  const renderText = () => {
    if (option === 'today') return 'Hôm nay';
    if (option === 'week') return 'Tuần này';
    if (option === 'month') return 'Tháng này';
    if (option === 'year') return 'Năm nay';
  };

  const handleSend = type => {
    console.log(type);
    setProcess(true);
    fetch(localhost + '/api/stastic/time', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type_filter: type,
      }),
    })
      .then(response => response.json())
      .then(r => {
        if (r.code === 200) {
          const _data = r.data;
          const tableData1 = [];
          const tabletitle1 = [];
          let _totalprice = 0;
          let _totalpricecomplete = 0;
          let _totalnumber = 0;
          let _totalnumbercomplete = 0;
          for (let i = 0; i < _data.length; i += 1) {
            const rowData1 = [];
            rowData1.push('HD' + _data[i].id);
            rowData1.push(_data[i].date);
            rowData1.push(MoneyFormat.MoneyFormat(_data[i].total_price));
            rowData1.push(_data[i].total_number.total_number);
            rowData1.push(_data[i].state.state);
            _totalprice = _totalprice + _data[i].total_price;
            if (_data[i].state.state === '3') {
              _totalpricecomplete = _totalpricecomplete + _data[i].total_price;
              _totalnumbercomplete =
                _totalnumbercomplete +
                Number(_data[i].total_number.total_number);
            }
            _totalnumber =
              _totalnumber + Number(_data[i].total_number.total_number);
            tableData1.push(rowData1);
            tabletitle1.push(i + 1);
          }
          setTableData(tableData1);
          setTableTitle(tabletitle1);
          setTotalPrice(_totalprice);
          setTotalPriceComplete(_totalpricecomplete);
          setTotalNumber(_totalnumber);
          setTotalNumberComplete(_totalnumbercomplete);
        } else {
          ToastAndroidLong(r.msg);
          setTableData([]);
          setTableTitle([]);
          setTotalPrice(0);
          setTotalPriceComplete(0);
          setTotalNumber(0);
          setTotalNumberComplete(0);
        }
      })
      .catch(err => console.log(err))
      .finally(() => setProcess(false));
  };
  const commentHeader = ['STT', 'Kí hiệu', 'Trạng thái'];
  const commentHeader0 = ['Chú thích Biểu đồ'];

  const commentData = [
    ['1', '1', 'Chờ xác nhận'],
    ['2', '2', 'Đang giao hàng'],
    ['3', '3', 'Giao hàng thành công'],
    ['4', '4', 'Đã hủy'],
  ];
  const handleRow = id => {
    Alert.alert('Thông tin đơn hàng', 'HD' + id, [
      {
        text: 'Hủy',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Đồng ý', onPress: () => null},
    ]);
  };
  return (
    <ScrollView style={styles.flex1}>
      <View style={styles.flex1}>
        <View style={styles.viewChoseDay}>
          {listChose.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setOption(item.key);
                handleSend(item.key);
              }}
              style={[
                styles.buttonDay,
                {backgroundColor: renderColor(item.key)},
              ]}>
              <Text style={{color: '#fff'}}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {process && (
          <ActivityIndicator size={50} color="red" style={{marginTop: 100}} />
        )}
        {!process && (
          <>
            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
              <Row
                data={tableHead}
                flexArr={[1, 2, 3, 4, 2, 2]}
                style={styles.head}
                textStyle={styles.text}
              />
              <TableWrapper style={styles.wrapper}>
                <Col
                  data={tableTitle}
                  style={styles.title}
                  textStyle={[styles.text]}
                />
                <Rows
                  data={tableData}
                  flexArr={[2, 3, 4, 2, 2]}
                  style={styles.row}
                  textStyle={styles.text}
                />
              </TableWrapper>
            </Table>
            <View style={styles.viewStatistic}>
              <View style={{marginVertical: 50}}>
                <Text style={styles.fontB}>
                  Tổng tiền dự kiến trong {renderText()}:
                </Text>
                <Text style={styles.fontA}>
                  {MoneyFormat.MoneyFormat(totalPrice)}
                </Text>
                <Text style={styles.fontB}>
                  Tổng tiền thu về {renderText()}:
                </Text>
                <Text style={styles.fontA}>
                  {MoneyFormat.MoneyFormat(totalPriceComplete)}
                </Text>
                <Text style={styles.fontB}>
                  + Tổng số lượng sản phẩm dự kiến trong {renderText()}:
                </Text>
                <Text style={styles.fontA}>{totalNumber} Sản phẩm</Text>
                <Text style={styles.fontB}>
                  + Tổng số lượng sản phẩm đã bán trong {renderText()}:
                </Text>
                <Text style={styles.fontA}>{totalNumberComplete} Sản phẩm</Text>
              </View>
              <Table
                borderStyle={{
                  borderWidth: 2,
                  borderColor: '#c8e1ff',
                }}>
                <Row
                  data={commentHeader0}
                  style={{height: 30, backgroundColor: '#EEBB8B'}}
                  textStyle={styles.text}
                />
                <Row
                  data={commentHeader}
                  style={{height: 30, backgroundColor: '#FFF0D0'}}
                  textStyle={styles.text}
                  flexArr={[1, 2, 4]}
                />
                <TableWrapper style={styles.wrapper}>
                  <Rows
                    data={commentData}
                    flexArr={[1, 2, 4]}
                    style={styles.row}
                    textStyle={styles.text}
                  />
                </TableWrapper>
              </Table>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}
export function Tab2() {
  const tableHead = [
    'STT',
    'Mã Hóa đơn',
    'Ngày',
    'Tổng tiền',
    'Số Lượng',
    'Trạng thái',
  ];
  const [tableData, setTableData] = useState([]);
  const [tableTitle, setTableTitle] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalNumber, setTotalNumber] = useState(0);
  const [totalPriceComplete, setTotalPriceComplete] = useState(0);
  const [totalNumberComplete, setTotalNumberComplete] = useState(0);
  const [process, setProcess] = useState(false);
  const [dateLeft, setDateLeft] = useState(new Date('2021-01-01'));
  const [dateRight, setDateRight] = useState(new Date('2021-12-31'));
  const handleSend = () => {
    setProcess(true);
    fetch(localhost + '/api/stastic/time', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type_filter: 'range',
        first_date: Moment(dateLeft).format('YYYY-MM-DD'),
        last_date: Moment(dateRight).format('YYYY-MM-DD'),
      }),
    })
      .then(response => response.json())
      .then(r => {
        if (r.code === 200) {
          const _data = r.data;
          const tableData1 = [];
          const tabletitle1 = [];
          let _totalprice = 0;
          let _totalpricecomplete = 0;
          let _totalnumber = 0;
          let _totalnumbercomplete = 0;
          for (let i = 0; i < _data.length; i += 1) {
            const rowData1 = [];
            rowData1.push('HD' + _data[i].id);
            rowData1.push(_data[i].date);
            rowData1.push(MoneyFormat.MoneyFormat(_data[i].total_price));
            rowData1.push(_data[i].total_number.total_number);
            rowData1.push(_data[i].state.state);
            _totalprice = _totalprice + _data[i].total_price;
            if (_data[i].state.state === '3') {
              _totalpricecomplete = _totalpricecomplete + _data[i].total_price;
              _totalnumbercomplete =
                _totalnumbercomplete +
                Number(_data[i].total_number.total_number);
            }

            _totalnumber =
              _totalnumber + Number(_data[i].total_number.total_number);
            tableData1.push(rowData1);
            tabletitle1.push(i + 1);
          }
          setTableData(tableData1);
          setTableTitle(tabletitle1);
          setTotalPrice(_totalprice);
          setTotalNumber(_totalnumber);
          setTotalPriceComplete(_totalpricecomplete);
          setTotalNumberComplete(_totalnumbercomplete);
        } else {
          ToastAndroidLong(r.msg);
          setTableData([]);
          setTableTitle([]);
          setTotalPrice(0);
          setTotalPriceComplete(0);
          setTotalNumber(0);
          setTotalNumberComplete(0);
        }
      })
      .catch(err => console.log(err))
      .finally(() => setProcess(false));
  };
  const commentHeader = ['STT', 'Kí hiệu', 'Trạng thái'];
  const commentHeader0 = ['Chú thích Biểu đồ'];
  const [isDateLeft, setIsDateLeft] = useState(false);
  const [isDateRight, setIsDateRight] = useState(false);

  const showIsDateLeft = () => {
    setIsDateLeft(true);
  };
  const showIsDateRight = () => {
    setIsDateRight(true);
  };
  const hideDateLeft = () => {
    setIsDateLeft(false);
  };
  const hideDateRight = () => {
    setIsDateRight(false);
  };
  const handleConfirm1 = date => {
    console.log('A date has been picked: ', date);
    setDateLeft(date);
    hideDateLeft();
  };
  const handleConfirm2 = date => {
    console.log('A date has been picked: ', date);
    setDateRight(date);
    hideDateRight();
  };
  const commentData = [
    ['1', '1', 'Chờ xác nhận'],
    ['2', '2', 'Đang giao hàng'],
    ['3', '3', 'Giao hàng thành công'],
    ['4', '4', 'Đã hủy'],
  ];
  return (
    <ScrollView style={styles.flex1}>
      <View style={styles.flex1}>
        <View
          style={[
            styles.viewChoseDay,
            {
              alignItems: 'center',
              paddingHorizontal: 20,
            },
          ]}>
          <View style={styles.buttonDay}>
            <Text>Từ ngày</Text>
          </View>
          <TouchableOpacity style={styles.buttonDay} onPress={showIsDateLeft}>
            <Text style={styles.fontC}>
              {Moment(dateLeft).format('DD-MM-YYYY')}
            </Text>
          </TouchableOpacity>
          <View style={styles.buttonDay}>
            <Text>Đến ngày</Text>
          </View>
          <TouchableOpacity style={styles.buttonDay} onPress={showIsDateRight}>
            <Text style={styles.fontC}>
              {Moment(dateRight).format('DD-MM-YYYY')}
            </Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDateLeft}
            mode="date"
            onConfirm={handleConfirm1}
            onCancel={hideDateLeft}
          />
          <DateTimePickerModal
            isVisible={isDateRight}
            mode="date"
            onConfirm={handleConfirm2}
            onCancel={hideDateRight}
          />
        </View>
        <View
          style={[
            styles.viewChoseDay,
            {alignItems: 'center', flexDirection: 'column'},
          ]}>
          <TouchableOpacity
            onPress={handleSend}
            style={[styles.buttonDay, {backgroundColor: '#0084FF'}]}>
            <Text style={styles.fontC}>GỬi yêu cầu</Text>
          </TouchableOpacity>
        </View>
        {process && (
          <ActivityIndicator size={50} color="red" style={{marginTop: 100}} />
        )}
        {!process && (
          <>
            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
              <Row
                data={tableHead}
                flexArr={[1, 2, 3, 4, 2, 2]}
                style={styles.head}
                textStyle={styles.text}
              />
              <TableWrapper style={styles.wrapper}>
                <Col
                  data={tableTitle}
                  style={styles.title}
                  textStyle={styles.text}
                />
                <Rows
                  data={tableData}
                  flexArr={[2, 3, 4, 2, 2]}
                  style={styles.row}
                  textStyle={styles.text}
                />
              </TableWrapper>
            </Table>
            <View style={styles.viewStatistic}>
              <View style={{marginVertical: 50}}>
                <Text style={styles.fontB}>
                  Từ {Moment(dateLeft).format('DD/MM/YYYY')}
                  {'  '}
                  Đến {Moment(dateRight).format('DD/MM/YYYY')}
                </Text>
                <Text style={styles.fontB}>Tổng tiền dự kiến:</Text>
                <Text style={styles.fontA}>
                  {MoneyFormat.MoneyFormat(totalPrice)}
                </Text>
                <Text style={styles.fontB}>Tổng tiền thu về:</Text>
                <Text style={styles.fontA}>
                  {MoneyFormat.MoneyFormat(totalPriceComplete)}
                </Text>
                <Text style={styles.fontB}>
                  + Tổng số lượng sản phẩm dự kiến:
                </Text>
                <Text style={styles.fontA}>{totalNumber} Sản phẩm</Text>
                <Text style={styles.fontB}>
                  + Tổng số lượng sản phẩm đã bán:
                </Text>
                <Text style={styles.fontA}>{totalNumberComplete} Sản phẩm</Text>
              </View>
              <Table
                borderStyle={{
                  borderWidth: 2,
                  borderColor: '#c8e1ff',
                }}>
                <Row
                  data={commentHeader0}
                  style={{height: 30, backgroundColor: '#EEBB8B'}}
                  textStyle={styles.text}
                />
                <Row
                  data={commentHeader}
                  style={{height: 30, backgroundColor: '#FFF0D0'}}
                  textStyle={styles.text}
                  flexArr={[1, 2, 4]}
                />
                <TableWrapper style={styles.wrapper}>
                  <Rows
                    data={commentData}
                    flexArr={[1, 2, 4]}
                    style={styles.row}
                    textStyle={styles.text}
                  />
                </TableWrapper>
              </Table>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}
export function Tab3() {
  return (
    <ScrollView style={styles.flex1}>
      <View style={{flex: 1, backgroundColor: 'green'}}>
        
      </View>
    </ScrollView>
  );
}
