import React, {useState, useEffect, useContext} from 'react'
import {
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native'
import {uriImg} from '@utils'
import {apiGoodDetails} from '@api'
import {Table, Row} from 'react-native-table-component'
import {
  AppContext,
  HeaderC,
  Layout,
  Light,
  ViewCore,
  ButtonBasic,
  RowInfo,
  screen_width,
} from '@component'
import {formatTableSize} from './utils'
import {navigate} from '@navigation'
import { isEmpty } from 'underscore'
export default function ShowGoodDetails ({route}) {
  const {idProductDetails, name} = route.params
  const {token} = useContext(AppContext)
  const [data, setData] = useState(null)
  const [arrayImage, setArrayImage] = useState([])
  const [refreshing, setRefreshing] = useState(true)

  useEffect(() => {
    apiGoodDetails(token, idProductDetails)
      .then(result => {
        if (result.code === 200) {
          setData(result.data)
          setArrayImage(result.data.array_img)
        } else setData([])
      })
      .finally(() => setRefreshing(false))
  }, [refreshing])
  // if(isEmpty(idProductDetails))return null
  return (
    <Layout>
      <HeaderC title={name ? name : 'SP'} />
      {data === null && <ActivityIndicator size={40} color='gray' />}
      {data !== null && (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => setRefreshing(true)}
            />
          }>
          <FlatList
            data={arrayImage}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <Image
                source={uriImg(item.name)}
                style={{
                  width: 200,
                  height: 200,
                  resizeMode: 'contain',
                }}
              />
            )}
            contentContainerStyle={{
              marginVertical: 10,
              backgroundColor: Light.border,
            }}
          />
          <ViewCore marginHorizontal={10}>
            <RowInfo title='Tên sản phẩm' data={data.name} />
            <RowInfo title='Giá' data={data.price} />
            <RowInfo title='Sale' data={data.sale} />
            <RowInfo title='Kiểu' data={data.new == 1 ? 'Mới' : 'Tồn'} />
            <RowInfo
              title='Phù hợp'
              data={
                data.gender === 'nu'
                  ? 'Nữ'
                  : data.gender === 'nam'
                  ? 'Nam'
                  : 'Tất cả'
              }
            />
            <RowInfo
              label={data.details}
              sizeL={14}
              height={100}
              marginBottom={10}
            />
            <Table
              borderStyle={{
                borderWidth: 2,
                borderColor: '#c8e1ff',
                width: screen_width,
              }}>
              <Row
                data={formatTableSize(data.products).name_size}
                style={styles.head}
                textStyle={styles.text}
              />
              <Row
                data={formatTableSize(data.products).number_size}
                style={styles.head}
                textStyle={styles.text}
              />
            </Table>
            <ViewCore row centerHorizontal paddingHorizontal={10} margin={10}>
              <ButtonBasic
                title='Cập nhật'
                onPress={() => navigate('InsertGoods', {dataResult: data,data:data})}
                //onPress={() => console.log(data)}
              />
              <ButtonBasic title='Xóa' backgroundColor={Light.danger} />
            </ViewCore>
          </ViewCore>
        </ScrollView>
      )}
    </Layout>
  )
}

const styles = StyleSheet.create({
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {textAlign: 'center'},
  dataWrapper: {marginTop: -1},
  row: {height: 40, backgroundColor: '#FFFFFE'},
})
