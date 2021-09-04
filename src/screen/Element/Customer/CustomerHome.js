import React, {useContext, useState, useEffect} from 'react'
import {Text, View, FlatList} from 'react-native'
import {Layout, HeaderC, TabCustom, ViewCore,ItemUser,AppContext} from '@component'
import {Dimensions} from 'react-native'
import {apiListUserRole} from '@api'
export default function index () {
  const mv = [<ListSt />, <SearchSt />]
  const mt = ['Danh sách', 'Tìm kiếm']
  return (
    <Layout>
      <HeaderC title='Quản lý khách hàng' />
      <TabCustom mapView={mv} mapTitle={mt} styleButton={{width: width / 2}} />
    </Layout>
  )
}
const {width} = Dimensions.get('window')
const SearchSt = () => {
  return (
    <View style={{height: 500, backgroundColor: 'pink', flex: 1}}>
      <Text>SearchSt</Text>
    </View>
  )
}
const ListSt = () => {
  const {token} = useContext(AppContext)
  const [data, setData] = useState([])
  useEffect(() => {
    apiListUserRole(token, '4').then(result => {
      console.log('1.15',result.data);
      setData(result.data)
    })
  }, [])
  return (
    <ViewCore margin={5}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <ItemUser item={item} />}
      />
    </ViewCore>
  )
}