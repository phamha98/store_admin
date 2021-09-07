import React, {useState, useEffect, useContext, useRef} from 'react'
import {ScrollView, RefreshControl} from 'react-native'
import {AppContext, HeaderC, Layout, ViewCore} from '@component'
import {navigate} from '@navigation'
import {HeaderSearch} from './component/HeaderSearch'
import ItemProduct from './component/ItemProduct'
import {selectApiSearchGoods} from './utils'
export default function SearchGoods () {
  const {token} = useContext(AppContext)
  const refType = useRef()
  const [data, setData] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const handleSubmit =  () => {
    setRefreshing(true)
    const type = refType.current.getType()
    const value_bolean = refType.current.getBolean()
    const text_input = refType.current.getInput()

    selectApiSearchGoods(token, type, value_bolean, text_input)
      .then(r => {
        if (r.code === 200) {
          if (r.data) setData(r.data)
        }
      })
      .finally(() => setRefreshing(false))
  }
  return (
    <Layout backgroundColor='#C7C4C4'>
      <HeaderC title='Tìm kiếm mặt hàng' />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleSubmit} />
        }>
        <HeaderSearch ref={refType} onPress={handleSubmit} />
        <ViewCore flex1>
          {data.map((item, index) => (
            <ItemProduct
              item={item}
              key={index}
              onPress={() =>
                navigate('ShowGoodDetails', {
                  idProductDetails: item.id,
                  name: item.name,
                })
              }
            />
          ))}
        </ViewCore>
      </ScrollView>
    </Layout>
  )
}
