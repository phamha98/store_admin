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
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import {Picker} from '@react-native-picker/picker'
import Moment from 'moment'
import { isEmpty } from 'underscore'

export const HeaderSearch = forwardRef(({onPress}, ref) => {
  const [type, setType] = useState('searchCode')
  const [isDateLeft, setIsDateLeft] = useState(false)
  const [isDateRight, setIsDateRight] = useState(false)
  const [dateLeft, setDateLeft] = useState(false)
  const [dateRight, setDateRight] = useState(false)
  const [sort, setSort] = useState('desc')
  const refInput = useRef()
  useImperativeHandle(ref, () => ({
    getType () {
      return type
    },
    getInput () {
      if(isEmpty(refInput.current))return ''
      return refInput.current.getValue()
    },
    getDateLeft () {
      return dateLeft
    },
    getDateRight () {
      return dateRight
    },
    getSort () {
      return sort
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
          <Picker.Item label='Theo mã đơn hàng' value='searchCode' />
          <Picker.Item label='Theo mã khách hàng' value='searchUser' />
          <Picker.Item label='Theo mã sản phẩm' value='searchProduct' />
          <Picker.Item label='Theo ngày đặt hàng' value='searchDate' />
          <Picker.Item label='Sắp sếp theo giá ' value='sortPrice' />
          <Picker.Item label='Sắp xếp theo ngày ' value='sortDate' />
          <Picker.Item label='Sắp xếp theo số lượng ' value='sortNumber' />
        </Picker>
      </ViewCore>
      <ViewCore>
        {type !== 'sortPrice' &&
          type !== 'sortDate' &&
          type !== 'sortNumber' &&
          type !== 'searchDate' && (
            <InputBasic
              ref={refInput}
              placeholder={renderLabelInput(type)}
             
            />
          )}
      </ViewCore>
      {(type === 'sortPrice' ||
        type === 'sortDate' ||
        type === 'sortNumber') && (
        <ViewCore row centerHorizontal paddingHorizontal={20}>
          <ButtonBasic
            title='Tăng'
            onPress={() => setSort('asc')}
            backgroundColor={sort === 'asc' ? Light.blue_faint : Light.border}
          />
          <ButtonBasic
            title='Giảm'
            onPress={() => setSort('desc')}
            backgroundColor={sort === 'desc' ? Light.blue_faint : Light.border}
          />
        </ViewCore>
      )}
      {type === 'searchDate' && (
        <ViewCore>
          <ViewCore row centerHorizontal>
            <ButtonBasic
              onPress={() => setIsDateLeft(true)}
              title={
                !dateLeft ? 'Từ ngày' : Moment(dateLeft).format('DD-MM-YYYY')
              }
              width={screen_width / 2 - 10}
              backgroundColor={Light.primary}
            />

            <ButtonBasic
              onPress={() => setIsDateRight(true)}
              title={
                !dateRight
                  ? 'Đến ngày '
                  : Moment(dateRight).format('DD-MM-YYYY')
              }
              width={screen_width / 2 - 10}
              backgroundColor={Light.primary}
            />
          </ViewCore>
          <DateTimePickerModal
            isVisible={isDateLeft}
            mode='date'
            onConfirm={date => {
              setIsDateLeft(false)
              setDateLeft(date)
            }}
            onCancel={() => setIsDateLeft(false)}
          />
          <DateTimePickerModal
            isVisible={isDateRight}
            mode='date'
            onConfirm={date => {
              setIsDateRight(false)
              setDateRight(date)
            }}
            onCancel={() => setIsDateRight(false)}
          />
        </ViewCore>
      )}
    </ViewCore>
  )
})
const renderLabelInput = type => {
  if (type === 'searchCode') return 'Nhập mã hóa đơn'
  if (type === 'searchUser') return 'Nhâp mã Khách hàng'
  if (type === 'searchProduct') return 'Nhập mã sản phẩm'
}
