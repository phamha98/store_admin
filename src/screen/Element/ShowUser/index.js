import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Header from '../Order/Header';
import {Avatar} from 'react-native-elements';

export default function index({route, navigation}) {
  const {data} = route.params;
  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        title="Hồ sơ"
        onClickLeft={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <Avatar
          size="xlarge"
          rounded
          source={{
            uri: data.img,
          }}
        />
        <Text>Họ và tên:{data.name}</Text>
        <Text>Email:{data.email}</Text>
        <Text>Địa chỉ:{data.address}</Text>
        <Text>Số điện thoại:{data.phone}</Text>
        <Text>Ngày sinh:{data.birthday}</Text>
        <Text>Giới tính:{data.gender}</Text>
        <Text>{data.img}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  content: {
    marginHorizontal: 10,
    marginVertical: 10,
    minHeight: 100,
    backgroundColor: 'red',
    borderRadius: 3,
    padding: 10,
  },
});
