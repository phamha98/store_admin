import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react'
import {
  ViewCore,
  ButtonBasic,
  InputBasic,
  screen_width,
  Light,
} from '@component'
import {Picker} from '@react-native-picker/picker'
import {isEmpty} from 'underscore'

export const HeaderSearch = forwardRef(({onPress}, ref) => {
  const [type, setType] = useState('searchCode')
  const [valueB, setValueB] = useState(true)

  const refInput = useRef()
  useImperativeHandle(ref, () => ({
    getType () {
      return type
    },
    getInput () {
      if (isEmpty(refInput.current)) return ''
      return refInput.current.getValue()
    },
    getBolean () {
      return valueB
    },
   
  }))

  return (
    <ViewCore margin={5}>
      <ViewCore
        row
        backgroundColor='#fff'
        centerHorizontal
        paddingHorizontal={5}
        marginBottom={5}
        borderRadius={5}>
        <ButtonBasic width={120} title='Tìm kiếm/ Sắp xếp' onPress={onPress} />
        <Picker
          selectedValue={type}
          style={{height: 50, flex: 1}}
          onValueChange={setType}>
          <Picker.Item label='Theo mã sản phẩm' value='searchCode' />
          <Picker.Item label='Theo tên sản phẩm' value='searchName' />

          <Picker.Item label='Lọc theo sản phẩm mới ' value='filterNew' />
          <Picker.Item label='Lọc theo sale' value='filterSale' />
          <Picker.Item label='Lọc theo giới tính' value='filterGender' />

          <Picker.Item label='Lọc theo giá sản phẩm' value='filterPrice' />
          <Picker.Item label='Lọc theo số lượng hàng' value='filterNumber' />
        </Picker>
      </ViewCore>
      <ViewCore>
        {(type === 'searchCode' || type === 'searchName') && (
          <InputBasic ref={refInput} placeholder={renderLabelInput(type)} />
        )}
      </ViewCore>

      {(type !== 'searchCode' && type !== 'searchName') && (
        <ViewCore>
          <ViewCore row centerHorizontal>
            <ButtonBasic
              onPress={() => setValueB(true)}
              title={renderTypeName(type, true)}
              width={screen_width / 2 - 10}
              backgroundColor={valueB ? Light.blue_faint : Light.border}
            />

            <ButtonBasic
              onPress={() => setValueB(false)}
              title={renderTypeName(type, false)}
              width={screen_width / 2 - 10}
              backgroundColor={!valueB ? Light.blue_faint : Light.border}
            />
          </ViewCore>
        </ViewCore>
      )}
    </ViewCore>
  )
})
const renderLabelInput = type => {
  if (type === 'searchCode') return 'Nhập mã sản phẩm'
  if (type === 'searchName') return 'Nhâp tên sản phẩm'
}
const renderTypeName = (type, bolen) => {
  switch (type) {
    case 'filterNew':
      if (bolen) return 'Sản phẩm mới'
      else return 'Kho'
    case 'filterSale':
      if (bolen) return 'Sale'
      else return 'Kho'
    case 'filterGender':
      if (bolen) return 'Dành cho nam'
      else return 'Dành cho nữ'
    case 'filterPrice':
      if (bolen) return 'Tăng '
      else return 'Giảm'
    case 'filterNumber':
      if (bolen) return 'Tăng '
      else return 'Giảm'
    default:
      break
  }
}
