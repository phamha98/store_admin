import React from 'react'
import {StyleSheet, Text, TouchableOpacity} from 'react-native'
import {
  ViewCore,
  TextCore,
  ImageCore,
  Layout,
  ItemTypeProduct,
  RowInfo,
  Light,
  formatVND,
  ButtonBasic,
} from '@component'
import {isEmpty} from 'underscore'

export default function ItemProduct ({item, onPress}) {
  if (isEmpty(item)) return null
  return (
    <ViewCore
      padding={10}
      backgroundColor={Light.background}
      marginBottom={10}
      borderRadius={5}>
      <RowInfo
        sizeL={16}
        label={item.name}
        styleL={{fontWeight: 'bold'}}
        backgroundColor='#fff'
      />
      <ViewCore row marginTop={10}>
        <ImageCore source={{uri: item.img}}  height={'100%'}/>
        <ViewCore flex1 marginLeft={5}>
          <RowInfo title='Giá' data={formatVND(item.price)} />
          {item.array_size && (
            <RowInfo title='Size' data={formatSize(item.array_size)} />
          )}

          {item.sale && <RowInfo title='Sale' data={item.sale + '%'} />}
          {item.gender && (
            <RowInfo title='Phù hợp' data={formatGender(item.gender)} />
          )}
        </ViewCore>
      </ViewCore>
      <RowInfo title='Loại' data={item.new == 1 ? 'Mới' : 'Kho'} />
      {item.product_type_main && (
        <RowInfo title='Kiểu' data={item.product_type_main.name} />
      )}
      {item.total_size && (
        <RowInfo
          title='Kho'
          data={item.total_size.total_number ? item.total_size.total_number : 0}
        />
      )}
      <RowInfo title='Tình trạng' data={item.type} />
      <ViewCore alignItems>
        <ButtonBasic
          title='Chi tiết'
          marginTop={10}
          onPress={onPress}
          height={30}
        />
      </ViewCore>
    </ViewCore>
  )
}

const styles = StyleSheet.create({})
const formatSize = sizes => {
  return sizes.map((item, index) => {
    return item.size + ' '
  })
}
const formatGender = type => {
  if (type === 'nu') return 'Nữ'
  if (type === 'nam') return 'Nam'
  if (type === 'tat') return 'Tất cả'
}
