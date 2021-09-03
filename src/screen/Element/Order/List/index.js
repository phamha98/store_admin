import React, {useState, useEffect, useContext} from 'react'
import {FlatList} from 'react-native'
import {apiListFullBills} from '@api'
import {AppContext, HeaderC, Layout, ViewCore, ContainBill} from '@component'
import {navigate} from '@navigation'
export default function index () {
  const {token} = useContext(AppContext)
  const [datafull, setDatafull] = useState([])
  useEffect(() => {
    apiListFullBills(token)
      .then(data => {
        if (data.code === 200) {
          setDatafull(data.bill_state_display)
          console.log('1.10', data)
        }
      })
      .catch(e => console.log(e))
  }, [])
  return (
    <Layout backgroundColor='#C2C2C2'>
      <HeaderC title='Danh sách đơn hàng' onClickRight={() => {}} />
      <FlatList
        data={datafull}
        keyExtractor={(i, j) => j.toString()}
        renderItem={({item}) => (
          <ContainBill
            item={item}
            onPress={() => navigate('BillDetails', {data: item})}
          />
        )}
        contentContainerStyle={{margin: 10}}
        ListFooterComponent={() => <ViewCore height={400} />}
        showsVerticalScrollIndicator={false}
      />
    </Layout>
  )
}
