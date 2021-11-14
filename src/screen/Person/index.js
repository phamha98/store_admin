import React, {useState, useEffect, useContext} from 'react'
import {ScrollView, RefreshControl} from 'react-native'
import {
  HeaderC,
  Layout,
  AppContext,
  ViewCore,
  ImageCore,
  ButtonBasic,
  RowInfo,
} from '@component'
import {navigate, goBack, replace} from '@navigation'
import {apiPersonShow} from '@api'
import {formatGender, uriImg} from '@utils'

export default function index () {
  const {token, idUser} = useContext(AppContext)
  const [data, setData] = useState(null)
  const [render, setRender] = useState(false)
  useEffect(() => {
    apiPersonShow(token, idUser)
      .then(data => {
        console.log(data.data)
        setData(data.data)
      })
      .catch(e => console.log(e))
      .finally(() => setRender(false))
  }, [render])
  return (
    <Layout>
      <HeaderC
        title='Thông tin cá nhân'
        onClickRight={() => setRender(!render)}
      />
      {data && (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={render}
              onRefresh={() => setRender(true)}
            />
          }>
          <ViewCore marginTop={10} alignItems>
            <ViewCore alignItems>
              <ViewCore
                activeOpacity={0.8}
                borderWidth={2}
                borderColor='#fff'
                width={200}
                height={200}
                style={{borderRadius: 100, overflow: 'hidden'}}>
                <ImageCore
                  source={uriImg(data ? data.img : null)}
                  width={200}
                  height={200}
                />
              </ViewCore>
            </ViewCore>
            <ViewCore width={'90%'}>
              <RowInfo label={data.name ? data.name : ''} sizeL={20} />
              <RowInfo data={data.email ? data.email : ''} title='✉️ Email ' />
              <RowInfo data={data.phone ? data.phone : ''} title='📞Phone' />
              <RowInfo
                data={data.gender ? formatGender(data.gender) : ''}
                title='♂️Gender'
              />
              <RowInfo
                data={data.address ? data.address : ''}
                title='🗺️Address'
              />
              <ButtonBasic
                title='Chỉnh sửa'
                onPress={() => navigate('EditPerson')}
                width={'100%'}
              />
              <ButtonBasic
                marginTop={10}
                title='Đăng xuất khỏi hệ thống'
                backgroundColor='gray'
                width={'100%'}
              />
            </ViewCore>
          </ViewCore>
        </ScrollView>
      )}
    </Layout>
  )
}
