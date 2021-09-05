import React, {useState, useEffect} from 'react'
import {
  AppContext,
  HeaderC,
  Layout,
  screen_width,
  TabCustom,
  ViewCore,
  formatVND,
} from '@component'
import {Table, TableWrapper, Row, Rows} from 'react-native-table-component'
import StaticDetailCustomer from './component/StaticDetailCustomer'
import styles from './styles'
import {navigate} from '@navigation'
import {apiStaticGetCustomer} from '@api'
import {ScrollView} from 'react-native'
export default function StatisticCustomer () {
  const [data, setData] = useState([])
  const [data2, setData2] = useState([])
  useEffect(() => {
    apiStaticGetCustomer()
      .then(r => {
        if (r.code === 200) {
          if (r.data.length !== 0) {
            let fdata = r.data
            let ldata = []
            let ldata2 = []
            fdata.map((item, index) => {
              let temdata = [
                index + 1,
                'KH' + item.id,
                item.name,
                item.email,
                item.quantity_price,
                item.quantity_bill,
                item.quantity_product,
                item.quantity_cancel,
              ]
              let temdata2 = [
                index + 1,
                'KH' + item.id,
                item.name,
                item.email,
                formatVND(item.quantity_price),
                item.quantity_bill,
                item.quantity_product,
                item.quantity_cancel,
              ]
              ldata.push(temdata)
              ldata2.push(temdata2)
            })
            setData(ldata)
            setData2(ldata2)
          }
        }
      })
      .catch(e => console.log(e))
  }, [])
  return (
    <Layout>
      <HeaderC title='Thống kê khách hàng' />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <ViewCore width={screen_width * 1.5}>
            <Table
              borderStyle={{
                borderWidth: 2,
                borderColor: '#c8e1ff',
                width: screen_width * 2,
              }}>
              <Row
                data={[
                  'STT',
                  'MKH',
                  'Họ tên',
                  'Email',
                  'Tổng tiền',
                  ,
                  'HĐ',
                  'SL',
                  'Hủy',
                ]}
                flexArr={[1, 2, 4, 3, 3]}
                style={styles.head}
                textStyle={styles.text}
              />
              {data2.map((item, index) => (
                <Row
                  key={index}
                  data={item}
                  flexArr={[1, 2, 4, 3, 3]}
                  style={styles.row}
                  textStyle={styles.text}
                />
              ))}
            </Table>
            <ViewCore width={screen_width}>
              <StaticDetailCustomer data={data} marginTop={10} />
            </ViewCore>
          </ViewCore>
        </ScrollView>
      </ScrollView>
    </Layout>
  )
}
