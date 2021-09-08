import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  createRef,
  useRef,
} from 'react'
import {
  ButtonBasic,
  screen_width,
  Light,
  ViewCore,
  TextCore,
  InputLabel,
  RowInfo,
} from '@component'
import {isArray, isEmpty, isNumber} from 'underscore'
const OptiontSizeProduct = ({label, valueInit = false, typeInit}, ref) => {
  const mapSizeClother = [
    {size: 'S', number: 0},
    {size: 'M', number: 0},
    {size: 'L', number: 0},
    {size: 'XL', number: 0},
    {size: 'XXL', number: 0},
  ]
  const mapSizeShoes = [
    {size: '41', number: 0},
    {size: '42', number: 0},
    {size: '43', number: 0},
    {size: '44', number: 0},
    {size: '45', number: 0},
  ]

  const dataGender = [
    {title: 'Quần áo', value: '0'},
    {title: 'Giầy dép', value: '1'},
  ]
  const [type, setType] = useState(typeInit ? typeInit : dataGender[0].value)
  useImperativeHandle(ref, () => ({
    getValue: () => {
      let mapdata = []
      if (valueInit) mapdata = valueInit
      if (type === '0') {
        if (isEmpty(valueInit)) mapdata = mapSizeClother

        return mapdata.map((item, index) => {
          let value = refClother.current[index].current.getValue()
          return {
            size: item.size,
            number: Number(value) ? Number(value) : 0,
          }
        })
      }
      if (type === '1') {
        if (isEmpty(valueInit)) mapdata = mapSizeShoes
        return mapdata.map((item, index) => {
          let value = refShoes.current[index].current.getValue()
          return {
            size: item.size,
            number: Number(value) ? Number(value) : 0,
          }
        })
      }
    },
  }))
  const refClother = useRef()
  const refShoes = useRef()
  refClother.current = mapSizeClother.map((item, index) => {
    return createRef()
  })
  refShoes.current = mapSizeShoes.map((item, index) => {
    return createRef()
  })
  return (
    <ViewCore>
      <RowInfo
        label={label}
        sizeL={20}
        backgroundColor='#AFAFAF'
        styleL={{color: '#fff'}}
        borderRadius={0}
        marginBottom={5}
      />
      <ViewCore row centerHorizontal marginBottom={5}>
        {dataGender.map((item, index) => (
          <ButtonBasic
            key={index}
            onPress={() => setType(item.value ? item.value : '')}
            title={item.title ? item.title : ''}
            width={screen_width / dataGender.length - 20}
            backgroundColor={
              item.value === type ? Light.blue_faint : Light.primary
            }
          />
        ))}
      </ViewCore>
      {type === '0' &&
        isEmpty(valueInit) &&
        mapSizeClother.map((item, index) => (
          <InputLabel
            ref={refClother.current[index]}
            key={index}
            placeholder={'Số lượng size ' + item.size}
            keyboardType='numeric'
            valueInit={item.number}
          />
        ))}
      {type === '1' &&
        isEmpty(valueInit) &&
        mapSizeShoes.map((item, index) => (
          <InputLabel
            ref={refShoes.current[index]}
            key={index}
            placeholder={'Số lượng size ' + item.size}
            keyboardType='numeric'
            valueInit={item.number}
          />
        ))}
      {valueInit &&
        valueInit.map((item, index) => (
          <InputLabel
            ref={
              typeInit === '0'
                ? refClother.current[index]
                : refShoes.current[index]
            }
            key={index}
            placeholder={'Số lượng size ' + item.size}
            keyboardType='numeric'
            valueInit={item.number.toString()}
          />
        ))}
    </ViewCore>
  )
}

export default forwardRef(OptiontSizeProduct)
