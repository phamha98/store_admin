import React, {useState, useEffect, useContext} from 'react'
import {FlatList, Alert} from 'react-native'
import {AppContext, HeaderC, Layout, ItemTypeProduct} from '@component'
import {navigate} from '@navigation'
import {apiGoodsMainList} from '@api'
const tatca = {
  id: -1,
  name: 'Tất cả',
  img: 'https://toplist.vn/images/800px/doc-menwear-323919.jpg',
}
export default function index () {
  const [progess, setProgess] = useState(true)
  const {token} = useContext(AppContext)
  const [dataMainGood, setDataMainGood] = useState([])
  useEffect(() => {
    apiGoodsMainList(token)
      .then(data => {
        console.log(data);
        if (data.code == 200) {
          let temp = data.data
          temp.splice(0, 0, tatca)
          setDataMainGood(temp)
        }
      })
      .catch(e => console.log(e))
      .finally(() => setProgess(false))
  }, [progess])
  return (
    <Layout>
      <HeaderC
        title='Danh sách mặt hàng'
        rightNameIcon='cloud-download-outline'
        onClickRight={() => setProgess(true)}
      />
      <FlatList
        refreshing={progess}
        onRefresh={() => setProgess(true)}
        data={dataMainGood}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <ItemTypeProduct
            item={item}
            onPress={() =>
              navigate('ShowGoodMainDetails', {
                idMain: item.id,
                name: item.name,
              })
            }
            onUpdate={() => handleUpdate(item)}
            onRemove={handleRemove}
          />
        )}
        numColumns={2}
      />
    </Layout>
  )
}
//util
const handleUpdate = item => {
  navigate('InsertTypeGoods', {type: 'update', item: item})
}

const handleRemove = () => {
  Alert.alert('Cảnh báo', 'Bạn có chắc chắn muốn xóa', [
    {
      text: 'Quay lại',
      onPress: () => {},
      style: 'cancel',
    },
    {
      text: 'Xóa',
      onPress: () => {},
    },
  ])
}
