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
        title={data ? 'C???p nh???t ' + 'MH' + data.id : 'Th??m s???n ph???m v??o kho'}
      />
      <ScrollView>
        <ViewCore backgroundColor={Light.border} padding={10}>
          <InputLabel
            ref={refName}
            placeholder='T??n s???n ph???m'
            valueInit={data ? data.name : ''}
          />
          <InputLabel
            ref={refDecription}
            placeholder='M?? t???'
            height={100}
            numberOfLines={5}
            valueInit={data ? data.details : ''}
          />
          <InputLabel
            ref={refPrice}
            placeholder='Gi?? VND'
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
            label='Lo???i m???t h??ng'
            valueInit={data ? data.id_type_main : ''}
            data={dataMainGood}
            height={55}
          />
          <LabelPicker
            ref={refGender}
            label='Ph?? h???p'
            valueInit={data ? data.gender : 'nam'}
            data={[
              {name: 'Nam', id: 'nam'},
              {name: 'N???', id: 'nu'},
              {name: 'T???t c???', id: 'tat'},
            ]}
            height={55}
          />
          <LabelPicker
            ref={refNewProduct}
            label='S???n ph???m m???i'
            valueInit={data ? data.new : '1'}
            data={[
              {name: 'M???i', id: '1'},
              {name: 'Kh??ng', id: '0'},
            ]}
            height={55}
          />
          <OptiontSizeProduct
            ref={refArraySize}
            label='Ph??n lo???i'
            data={[
              {title: 'Qu???n ??o', value: '1'},
              {title: 'Gi???y d??p', value: '0'},
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
                data ? 'C???p nh???t s???n ph???m v??o kho' : 'Th??m s???n ph???m v??o kho'
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
