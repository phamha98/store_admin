import React from 'react'
import {FlatList, StatusBar} from 'react-native'
import {HeaderC, data_home, Layout, Light} from '@component'
import ItemHome from './ItemHome'
export default function Home ({navigation}) {
  return (
    <Layout>
      <StatusBar backgroundColor={Light.blue_faint} barStyle='light-content' />
      <HeaderC
        title='Quản lý'
        rightNameIcon='person-circle-outline'
        leftNameIcon='menu'
        onClickLeft={() => navigation.openDrawer()}
        onClickRight={() => navigation.navigate('Person')}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data_home}
        keyExtractor={(i, j) => j.toString()}
        renderItem={({item}) => <ItemHome item={item} />}
        numColumns={2}
        contentContainerStyle={{marginTop: 10}}
      />
    </Layout>
  )
}
