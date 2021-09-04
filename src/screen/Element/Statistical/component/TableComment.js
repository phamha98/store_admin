import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Table, TableWrapper, Row, Rows} from 'react-native-table-component'
export default function TableComment () {
  return (
    <Table
      borderStyle={{
        borderWidth: 2,
        borderColor: '#c8e1ff',
        marginBottom:20
      }}>
      <Row
        data={['Chú thích Biểu đồ']}
        style={{height: 30, backgroundColor: '#EEBB8B'}}
        textStyle={styles.text}
      />
      <Row
        data={['STT', 'Kí hiệu', 'Trạng thái']}
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
  )
}
const commentData = [
  ['1', '1', 'Chờ xác nhận'],
  ['2', '2', 'Đang giao hàng'],
  ['3', '3', 'Giao hàng thành công'],
  ['4', '4', 'Đã hủy'],
]
const styles = StyleSheet.create({
  text: {textAlign: 'center'},
  wrapper: {flexDirection: 'row'},
  row: {height: 40, backgroundColor: '#E7E6E1'},
})
