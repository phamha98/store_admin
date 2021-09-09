import React, {useState, useEffect, useContext, useRef} from 'react'
import {ScrollView} from 'react-native'
import {apiGoodsMainList} from '@api'
import {
  AppContext,
  HeaderC,
  Layout,
  ViewCore,
  TextCore,
  InputLabel,
  Light,
  LabelPicker,
  ButtonBasic,
  ToastAndroidLong,
} from '@component'
import {navigate} from '@navigation'
import OptionImageDecription from './component/OptionImageDecription'
import OptionImageMain from './component/OptionImageMain'
import OptiontSizeProduct from './component/OptiontSizeProduct'
import {fetchInsertProduct, checkTypeSize} from './utils'
import {isEmpty} from 'underscore'
export default function index ({route}) {
  const {token} = useContext(AppContext)
  const [dataMainGood, setDataMainGood] = useState([])
  const {data} = route.params
  useEffect(() => {
    apiGoodsMainList(token)
      .then(data => {
        if (data.code == 200) {
          setDataMainGood(data.data)
        }
      })
      .catch(e => console.log(e))
  }, [])

  const refName = useRef()
  const refDecription = useRef()
  const refPrice = useRef()
  const refSale = useRef()
  const refGoodType = useRef()

  const refGender = useRef()
  const refNewProduct = useRef()
  const refArraySize = useRef()
  const refMainImage = useRef()
  const refArrayImage = useRef()

  const handleSubmit = () => {
    let name = refName.current.getValue()
    let decription = refDecription.current.getValue()
    let price = refPrice.current.getValue().replace(/\s/g, '')
    let sale = refSale.current.getValue()
    let goodType = refGoodType.current.getValue()
    let gender = refGender.current.getValue()
    let newProduct = refNewProduct.current.getValue()

    let arraySize = refArraySize.current.getValue()
    let mainImage = refMainImage.current.getValue()
    let arrayImage = refArrayImage.current.getValue()
    let type = 'insert'
    if (data) type = 'update'
    console.log(price.replace(/\s/g, ''))
    
    fetchInsertProduct(
      type,
      data ? data.id : '',
      token,
      name,
      decription,
      price,
      sale,
      goodType,
      gender,
      newProduct,
      arraySize,
      mainImage,
      arrayImage,
    )
  }
  return (
    <Layout>
      <HeaderC
        title={data ? 'Cập nhật ' + 'MH' + data.id : 'Thêm sản phẩm vào kho'}
      />
      <ScrollView>
        <ViewCore backgroundColor={Light.border} padding={10}>
          <InputLabel
            ref={refName}
            placeholder='Tên sản phẩm'
            valueInit={data ? data.name : ''}
          />
          <InputLabel
            ref={refDecription}
            placeholder='Mô tả'
            height={100}
            numberOfLines={5}
            valueInit={data ? data.details : ''}
          />
          <InputLabel
            ref={refPrice}
            placeholder='Giá VND'
            keyboardType='numeric'
            valueInit={data ? data.price.toString() : ''}
          />
          <InputLabel
            ref={refSale}
            placeholder='Sale'
            keyboardType='numeric'
            valueInit={data ? data.sale.toString() : ''}
          />
          <LabelPicker
            ref={refGoodType}
            label='Loại mặt hàng'
            valueInit={data ? data.id_type_main : ''}
            data={dataMainGood}
            height={55}
          />
          <LabelPicker
            ref={refGender}
            label='Phù hợp'
            valueInit={data ? data.gender : 'nam'}
            data={[
              {name: 'Nam', id: 'nam'},
              {name: 'Nữ', id: 'nu'},
              {name: 'Tất cả', id: 'tat'},
            ]}
            height={55}
          />
          <LabelPicker
            ref={refNewProduct}
            label='Sản phẩm mới'
            valueInit={data ? data.new : '1'}
            data={[
              {name: 'Mới', id: '1'},
              {name: 'Không', id: '0'},
            ]}
            height={55}
          />
          <OptiontSizeProduct
            ref={refArraySize}
            label='Phân loại'
            data={[
              {title: 'Quần áo', value: '1'},
              {title: 'Giầy dép', value: '0'},
            ]}
            valueInit={data ? data.products : false}
            typeInit={data ? (checkTypeSize(data.products) ? '0' : '1') : ''}
          />
          <OptionImageMain
            ref={refMainImage}
            valueInit={data ? {path: data.img} : ''}
          />
          <OptionImageDecription
            ref={refArrayImage}
            valueInit={data ? data.array_img : false}
          />
          <ViewCore alignItems marginTop={30} marginBottom={100}>
            <ButtonBasic
              backgroundColor={Light.link}
              width={'100%'}
              height={50}
              title={
                data ? 'Cập nhật sản phẩm vào kho' : 'Thêm sản phẩm vào kho'
              }
              onPress={handleSubmit}
              styleTitle={{fontSize: 20}}
            />
          </ViewCore>
        </ViewCore>
      </ScrollView>
    </Layout>
  )
}
