import React, {useState, useEffect, useContext} from 'react'
import {FlatList, StatusBar, StyleSheet} from 'react-native'
import {
  HeaderC,
  data_home,
  Layout,
  Light,
  AppContext,
  ViewCore,
  TextCore,
} from '@component'
import {navigate, goBack} from '@navigation'
import {apiPersonShow} from '@api'

export default function index () {
  const {token, idUser, lEP, setLEP} = useContext(AppContext)
  const [data, setData] = useState(null)
  useEffect(() => {
    apiPersonShow(token, idUser)
      .then(data => {
        console.log(data.data)
        setData(data.data)
      })
      .catch(e => console.log(e))
  }, [])
  return (
    <Layout>
      <HeaderC
        title='Thông tin cá nhân'
        onClickLeft={() => goBack()}
        onClickRight={() => {}}
      />
      {data && (
        <ViewCore alignItems>
          <TextCore size={16}>{data.name}</TextCore>
          <TextCore>{data.email}</TextCore>
          <TextCore>{data.phone}</TextCore>
          <TextCore>{data.gender}</TextCore>
          <TextCore>{data.address}</TextCore>
        </ViewCore>
      )}
    </Layout>
  )
}
let o = {
  address: null,
  birthday: null,
  created_at: null,
  email: 'm',
  email_verified_at: null,
  gender: 'nam',
  id: 1,
  img: null,
  name: 'Pham tran quang ha',
  phone: null,
  updated_at: null,
}

const styles = StyleSheet.create({})
