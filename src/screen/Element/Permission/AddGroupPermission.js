import React, {useContext, useRef} from 'react'
import {ScrollView, ToastAndroid} from 'react-native'

import {
  AppContext,
  ButtonBasic,
  HeaderC,
  InputBasic,
  Layout,
  Light,
  screen_width,
  ToastAndroidLong,
  ViewCore,
} from '@component'
import {apiInsertRole} from '@api'
import {isEmpty} from 'underscore'
export default function index () {
  const {token} = useContext(AppContext)
  const refName = useRef()
  const refNameDisplay = useRef()
  const handleSubmit = () => {
    let name = refName.current.getValue()
    let nameDisplay = refNameDisplay.current.getValue()
    if (isEmpty(name) || isEmpty(nameDisplay))
      return ToastAndroidLong('Không được để trống ô nhập')
    apiInsertRole(token, name, nameDisplay)
      .then(r => {
        if (r.code === 200&&r.msg) return ToastAndroidLong('Thêm thành công')
        else return ToastAndroidLong('Thất bại ')
      })
      .catch(err => console.log(err))
  }

  return (
    <Layout backgroundColor={Light.border}>
      <HeaderC title='Thêm nhóm người dùng mới' />
      <ScrollView>
        <ViewCore margin={10} marginTop={30}>
          <InputBasic
            ref={refName}
            placeholder='Nhập vào khóa nhóm người dùng'
          />
          <InputBasic
            marginTop={10}
            ref={refNameDisplay}
            placeholder='Nhập vào tên nhóm người dùng'
          />
          <ViewCore alignItems marginTop={10}>
            <ButtonBasic
              width={screen_width - 20}
              height={50}
              title='Thêm nhóm người dùng mới'
              onPress={handleSubmit}
            />
          </ViewCore>
        </ViewCore>
      </ScrollView>
    </Layout>
  )
}
