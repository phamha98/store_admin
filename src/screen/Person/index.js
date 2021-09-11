import React, {useState, useEffect, useContext} from 'react'
import {StyleSheet, RefreshControl} from 'react-native'
import {
  HeaderC,
  Layout,
  Light,
  AppContext,
  ViewCore,
  TextCore,
  ImageCore,
  screen_width,
  ButtonBasic,
  screen_height,
  RowInfo,
} from '@component'
import {navigate, goBack, replace} from '@navigation'
import {apiPersonShow} from '@api'
import {formatGender, uriImg} from '@utils'
import {ScrollView} from 'react-native'

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
              <RowInfo label={data ? data.name : ''} sizeL={20} />
              <RowInfo data={data ? data.email : ''} title='✉️ Email ' />
              <RowInfo data={data ? data.phone : ''} title='📞Phone' />
              <RowInfo data={data ? formatGender(data.gender) : ''} title='♂️Gender' />
              <RowInfo data={data ? data.address : ''} title='🗺️Address' />
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

const styles = StyleSheet.create({
  content: {
    backgroundColor: Light.background,
    marginHorizontal: 30,
    paddingVertical: 30,
    borderRadius: 5,
    justifyContent: 'space-between',
    height: 0.8 * screen_height,
  },
  text: {
    color: '#05B9E6',
    fontSize: 16,
    marginVertical: 2,
  },
})
