import React, {useState, useEffect, useContext} from 'react'
import {FlatList, Alert} from 'react-native'
import {AppContext, HeaderC, Layout, ItemTypeProduct} from '@component'
import {navigate} from '@navigation'
import {apiGoodsMainList} from '@api'
export default function index ({navigation}) {
  const [progess, setProgess] = useState(true)
  const {token} = useContext(AppContext)
  const [dataMainGood, setDataMainGood] = useState([])
  const [load, setLoad] = useState(true)
  useEffect(() => {
    apiGoodsMainList(token)
      .then(data => {
        if (data.code == 200) {
          let temp = data.data
          let ptx = {
            id: -1,
            name: 'Tất cả',
            img:
              'https://media3.scdn.vn/img3/2019/4_5/WZVc0y_simg_de2fe0_500x500_maxb.jpg',
          }
          temp.splice(0, 0, ptx)
          setDataMainGood(temp)
        }
      })
      .catch(e => console.log(e))
      .finally(() => setProgess(false))
  }, [progess])

  return (
    <Layout>
      <HeaderC
        title='Xem mặt hàng'
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
              navigation.navigate('ShowGoodMainDetails', {idMain: item.id})
            }
            onUpdate={() => handleUpdate(item)}
            onRemove={handleRemove}
            onSeen={() => handleSeen(item)}
          />
        )}
        numColumns={2}
      />
    </Layout>
  )
}
//util
const handleUpdate = item => {
  navigate('InsertTypeGoods', {
    idT: item.id,
    nameT: item.name,
    imgT: item.img,
  })
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
const handleSeen = item => {
  navigate('InsertTypeGoods', {
    idT: item.id,
    nameT: item.name,
    imgT: item.img,
  })
}
