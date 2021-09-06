import React, {useState, useContext, useEffect} from 'react'
import {StyleSheet, View, ActivityIndicator} from 'react-native'
import {apiBillDetails} from '@api'
import {
  AppContext,
  screen_width,
  ImageCore,
  formatVND,
  Light,
  ViewCore,
} from '@component'
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component'
import {ScrollView} from 'react-native'
export default function TableDetailState (id) {
  const {token} = useContext(AppContext)
  const [data, setData] = useState([])

  const [load, setLoad] = useState(true)
  useEffect(() => {
    apiBillDetails(token, id)
      .then(r => {
        if (r.code === 200) {
          setData(r.bills_details)
        }
      })
      .catch(e => {})
      .finally(() => setLoad(false))
  }, [])

  if (load) return <ActivityIndicator size={40} color={Light.blue_faint} />
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <ViewCore width={screen_width * 1.3} style={{minHeight:500}}>
          <Table
            borderStyle={{
              borderWidth: 2,
              borderColor: '#A5C9F5',
              width: screen_width * 2,
            }}>
            <Row
              data={['STT', 'Tên SP', 'Ảnh', 'Đơn giá', 'Số lượng', 'Tg tiền']}
              flexArr={mapFlex}
              style={styles.head}
              textStyle={styles.text}
            />
            {formatData(data).result_data.map((rowData, index) => (
              <TableWrapper
                key={index}
                style={{flexDirection: 'row', backgroundColor: '#FFFFFF'}}>
                {rowData.map((cellData, cellIndex) => (
                  <Cell
                    key={cellIndex}
                    data={
                      cellIndex === 2 ? renderCell(cellData, index) : cellData
                    }
                    textStyle={cellIndex === 2 ? {} : styles.text}
                    style={{flex: mapFlex[cellIndex]}}
                  />
                ))}
              </TableWrapper>
            ))}
            <Row
              data={[
                'Tổng',
                formatData(data).total_number,
                formatVND(formatData(data).total_money, 'đ'),
              ]}
              flexArr={[11, 2, 3]}
              style={styles.head}
              textStyle={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: Light.blue_faint,
              }}
            />
          </Table>
        </ViewCore>
      </ScrollView>
    </ScrollView>
  )
}
const formatData = data => {
  let result_data = []
  let total_money = 0
  let total_number = 0
  data.map((item, index) => {
    let row = [
      index + 1,
      item.product_details.name,
      item.product_details.img,
      formatVND(item.price, 'đ'),
      item.number,
      formatVND(Number(item.price) * Number(item.number), 'đ'),
    ]
    total_number = total_number + Number(item.number)
    total_money = total_money + Number(item.price) * Number(item.number)
    result_data.push(row)
  })

  return {
    result_data: result_data,
    total_money: total_money,
    total_number: total_number,
  }
}
const mapFlex = [1, 4, 3, 3, 2, 3]
const renderCell = (data, index) => {
  return (
    <ImageCore
      source={{uri: data}}
      width={50}
      height={50}
      resizeMode='stretch'
    />
  )
}
const styles = StyleSheet.create({
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {textAlign: 'center'},
  row: {height: 40, backgroundColor: '#FFFFFE'},
})
