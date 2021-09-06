import React, {useState, useEffect, useContext} from 'react'
import {FlatList} from 'react-native'
import {apiGoodsMainDetails, apiGoodList} from '@api'
import {AppContext, HeaderC, Layout, ViewCore} from '@component'
import {navigate} from '@navigation'
import ItemProduct from '../component/ItemProduct'
import {isEmpty} from 'underscore'
export default function ShowGoodMainDetails ({route}) {
  const {idMain, name} = route.params
  const {token} = useContext(AppContext)
  const [data, setData] = useState([])
  const [progess, setProgess] = useState(true)
  useEffect(() => {
    if (idMain === -1) {
      apiGoodList(token)
        .then(result => {
          setData(result.data)
        })
        .catch(e => console.log(e))
        .finally(() => setProgess(false))
    } else {
      apiGoodsMainDetails(token, idMain)
        .then(result => {
          setData(result.data)
        })
        .catch(e => console.log(e))
        .finally(() => setProgess(false))
    }
  }, [progess])
  return (
    <Layout>
      <HeaderC title={idMain === -1 ? 'Tất cả sản phẩm' : name} />
      <ViewCore flex1>
        <FlatList
          refreshing={progess}
          onRefresh={() => setProgess(true)}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <ItemProduct
              item={item}
              onPress={() =>
                navigate('ShowGoodDetails', {
                  idProductDetails: item.id,
                  name: item.name,
                })
              }
            />
          )}
        />
      </ViewCore>
    </Layout>
  )
}
