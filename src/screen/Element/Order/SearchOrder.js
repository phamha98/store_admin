import React, {useState, useEffect, useRef, useContext} from 'react'
import {StyleSheet, ScrollView, RefreshControl} from 'react-native'
import {AppContext, HeaderC, Layout, ViewCore, ContainBill} from '@component'
import {navigate} from '@navigation'
import {
  apiSearchCodeBill,
  apiSearchBillUser,
  apiSearchBillProduct,
  apiSearchBillDate,
  apiSortBillDate,
  apiSortBillNumber,
  apiSortBillPrice,
} from '@api'
import {HeaderSearch} from './component/HeaderSearch'
export default function index () {
  const {token} = useContext(AppContext)
  const refType = useRef()
  const [data, setData] = useState([])
  const [refreshing, setRefreshing] = useState(true)
  const handleSubmit = () => {
    setRefreshing(true)
    let type = refType.current.getType()
    let dateLeft = refType.current.getDateLeft()
    let dateRight = refType.current.getDateRight()
    let input = refType.current.getInput()
    let sort = refType.current.getSort()
    if (type === 'searchCode')
      return apiSearchCodeBill(input, token)
        .then(r => {
          if (r.code === 200) {
            if (r.staterow) setData([r.staterow])
            else {
              setData([])
            }
          }
        })
        .finally(() => setRefreshing(false))
    selectApi(token, type, sort, dateLeft, dateRight, input)
      .then(r => {
        if (r.code === 200) {
          if (r.data) setData(r.data)
          else {
            setData([])
          }
        }
      })
      .finally(() => setRefreshing(false))
  }
  useEffect(() => {
    handleSubmit()
    setRefreshing(false)
  }, [])
  return (
    <Layout backgroundColor='#C7C4C4'>
      <HeaderC title='Tìm kiếm đơn hàng' />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleSubmit} />
        }>
        <HeaderSearch ref={refType} onPress={handleSubmit} />
        <ViewCore margin={5}>
          {data.map((item, index) => (
            <ContainBill
              item={item}
              key={index}
              onPress={() => navigate('BillDetails', {data: item})}
            />
          ))}
        </ViewCore>
      </ScrollView>
    </Layout>
  )
}

const styles = StyleSheet.create({})
const selectApi = (token, type, sort, dateLeft, dateRight, input) => {
  if (type === 'searchCode') return apiSearchCodeBill(input, token)
  if (type === 'searchUser') return apiSearchBillUser(input, token)
  if (type === 'searchProduct') return apiSearchBillProduct(input, token)
  if (type === 'searchDate')
    return apiSearchBillDate(token, dateLeft, dateRight)
  if (type === 'sortPrice') return apiSortBillPrice(token, sort)
  if (type === 'sortDate') return apiSortBillDate(token, sort)
  if (type === 'sortNumber') return apiSortBillNumber(token, sort)
}
