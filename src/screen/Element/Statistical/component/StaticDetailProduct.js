import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {ViewCore, Light, formatVND, screen_width} from '@component'
import {Table, TableWrapper, Row, Rows} from 'react-native-table-component'
import {formatStaticDetailProduct} from '../utils'
import {isArray, isEmpty} from 'underscore'
export default function StaticDetail ({data, ...rest}) {
  if (isEmpty(data) || !isArray(data)) return null
  let l_data = formatStaticDetailProduct(data)
  const table_data = [
    ['Tổng loại mặt hàng', data.length],
    ['Tổng số lượng sản phẩm đã bán', l_data.total_sell],
    ['Tổng số lượng sản phẩm còn lại',l_data.total_rest],
    ['Mặt hàng đắt nhất', l_data.money.id, l_data.money.name,formatVND(l_data.money.max)],
    ['Mặt hàng tồn nhiều nhất', l_data.rest.id, l_data.rest.name, l_data.rest.max],
    ['Mặt hàng bán nhiều nhất', l_data.sale.id, l_data.sale.name,l_data.sale.max],
  ]
  return (
    <ViewCore {...rest}>
      <Table
        borderStyle={{
          borderWidth: 2,
          borderColor: '#fff'
        }}>
        {table_data.map((item, index) => (
          <Row
            key={index}
            data={item}
            flexArr={[4, 2, 3,3]}
            style={styles.row}
            textStyle={styles.text}
          />
        ))}
      </Table>
    </ViewCore>
  )
}

const styles = StyleSheet.create({
  row: {height: 40, backgroundColor: Light.border},
  text: {textAlign: 'center', color: '#fff'},
})
