import React, {useState, useEffect} from 'react'
import {ScrollView, ActivityIndicator} from 'react-native'
import {Table, Row} from 'react-native-table-component'
import styles from '../styles'
import localhost from '@api/localhost'
import {
  TabCustom,
  Layout,
  ViewCore,
  screen_width,
  Light,
  TextCore,
} from '@component'
import Moment from 'moment'
import StaticDetail from './StaticDetail'
import TableComment from './TableComment'
export default function StaticTabBillDay () {
  return (
    <ViewCore style={{flex:1,}}marginTop={2}>
      <TabCustom
        mapTitle={['Hôm nay', 'Tuần này', 'Tháng này', 'Năm nay']}
        mapView={[
          <TabDayOption type='today' />,
          <TabDayOption type='week' />,
          <TabDayOption type='month' />,
          <TabDayOption type='year' />,
        ]}
        styleButton={{width: screen_width / 4}}
      />
    </ViewCore>
  )
}
const TabDayOption = ({type}) => {
  const [data, setData] = useState(null)
  useEffect(() => {
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
