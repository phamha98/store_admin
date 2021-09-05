import React, {useState, useEffect} from 'react'
import {ScrollView, ActivityIndicator} from 'react-native'
import {Table, Row} from 'react-native-table-component'
import styles from '../styles'
import localhost from '@api/localhost'
import {
  ViewCore,
  screen_width,
  Light,
  TextCore,
  ButtonBasic,
} from '@component'
import Moment from 'moment'
import StaticDetail from './StaticDetail'
import TableComment from './TableComment'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import {isEmpty} from 'underscore'

export default function StaticTabBillOption () {
  const [isDateLeft, setIsDateLeft] = useState(false)
  const [isDateRight, setIsDateRight] = useState(false)
  const [dateLeft, setDateLeft] = useState(false)
  const [dateRight, setDateRight] = useState(false)
  console.log('1.15', 'render')
  return (
    <ViewCore style={{flex: 1}}>
      <ViewCore row marginVertical={2} centerHorizontal>
        <ButtonBasic
          onPress={() => setIsDateLeft(true)}
          title={!dateLeft ? 'chọn' : Moment(dateLeft).format('DD-MM-YYYY')}
          width={screen_width / 3 - 5}
          backgroundColor={Light.primary}
        />

        <ButtonBasic
          onPress={() => setIsDateRight(true)}
          title={!dateRight ? 'chọn' : Moment(dateRight).format('DD-MM-YYYY')}
          width={screen_width / 3 - 5}
          backgroundColor={Light.primary}
        />
        <ButtonBasic title='Tìm kiếm' width={screen_width / 3 - 5} />
      </ViewCore>
      <DateTimePickerModal
        isVisible={isDateLeft}
        mode='date'
        onConfirm={date => {
          setIsDateLeft(false)
          setDateLeft(date)
        }}
        onCancel={() => setIsDateLeft(false)}
      />
      <DateTimePickerModal
        isVisible={isDateRight}
        mode='date'
        onConfirm={date => {
          setIsDateRight(false)
          setDateRight(date)
        }}
        onCancel={() => setIsDateRight(false)}
      />
      <TabDayOption dateLeft={dateLeft} dateRight={dateRight} />
      {(!dateLeft || !dateRight) && (
        <ViewCore>
          <TextCore color={Light.blue_faint}>Không có dữ liệu</TextCore>
        </ViewCore>
      )}
    </ViewCore>
  )
}
const TabDayOption = ({dateLeft, dateRight}) => {
  console.log('1.16', 'render')
  if (!dateLeft || !dateRight) return null
  const [data, setData] = useState(null)
  console.log('1.14', 'render')
  useEffect(() => {
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
          let map_data = r.data
          let las_data = []
          map_data.map((item, index) => {
            console.log('1.10', item)
            let row = []
            row = [
              index + 1,
              item.id,
              item.date,
              item.total_price,
              item.total_number.total_number,
              item.state.state,
            ]
            las_data.push(row)
          })
          setData(las_data)
          console.log('1.9', las_data)
        } else {
          setData([])
        }
      })
  }, [])
  if (data === null)
    return <ActivityIndicator size={40} color={Light.blue_faint} />
  if (data.length === 0)
    return <TextCore color={Light.blue_faint}>Không có dữ liệu</TextCore>
  return (
    <ViewCore style={{flex: 1}}>
      <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
        <Row
          data={['STT', 'HĐ', 'Ngày', 'Tổng tiền', 'SL', 'Trạng thái']}
          flexArr={[1, 2, 3, 4, 2, 2]}
          style={styles.head}
          textStyle={styles.text}
        />
        {data.map((item, index) => (
          <Row
            key={index}
            data={item}
            flexArr={[1, 2, 3, 4, 2, 2]}
            style={styles.row}
            textStyle={styles.text}
          />
        ))}
      </Table>
      <StaticDetail data={data} marginTop={10} />
      <TableComment />
    </ViewCore>
  )
}
