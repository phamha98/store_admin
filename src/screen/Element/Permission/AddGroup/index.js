import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  Button,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  ToastAndroid,
  Alert,
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';
import Header from '../Header';
import {AppContext} from '../../../../component/AppContext';
import {apiInsertRole} from '../../../../api';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function index({navigation}) {
  const {token} = useContext(AppContext);
  const [name, setName] = useState();
  const [displayName, setDisplayName] = useState();

  const handleSubmit = () => {
    console.log(name + displayName + token);
    apiInsertRole(token, name, displayName)
      .then(result => {
        console.log(result);
        if (result.msg) {
          ToastAndroid.showWithGravity(
            'Thêm thành công',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
        } else
          ToastAndroid.showWithGravity(
            'Tên đã tồn tại',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
      })
      .catch(err => console.log(err));
  };

  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        title="Thêm nhóm người dùng mới"
        rightIcon={true}
        background="#99BFCA"
        onClickLeft={() => navigation.goBack()}
      />
      <View style={styles.viewInput}>
        <TextInput
          style={styles.textInput}
          placeholder="Nhập vào khóa nhóm người dùng"
          value={name}
          onChangeText={text => setName(text)}
        />
      </View>
      <View style={{marginHorizontal: 10, alignItems: 'center'}}>
        <Text style={{fontSize: 10, fontStyle: 'italic', color: 'red'}}>
          Tên mô ta dễ hiểu,nên viết ngắn gọn
        </Text>
      </View>
      <View style={styles.viewInput}>
        <TextInput
          style={styles.textInput}
          placeholder="Nhập vào tên nhóm người dùng"
          value={displayName}
          onChangeText={text => setDisplayName(text)}
        />
      </View>
      <TouchableOpacity
        onPress={handleSubmit}
        style={[styles.button, {backgroundColor: '#006DFC'}]}>
        <Text style={styles.textW}>Thêm nhóm người dùng mới</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#CACACA'},
  textInput: {
    paddingHorizontal: 5,
    minHeight: 30,
    fontSize: 20,
    borderBottomWidth: 0.5,
    marginHorizontal: 0,
  },
  viewInput: {
    marginHorizontal: 10,
    marginTop: 10,
    minHeight: 60,
    backgroundColor: '#fff',
    borderRadius: 5,
    justifyContent: 'center',
  },
  button: {
    marginTop: 20,
    marginHorizontal: 50,
    minHeight: 50,
    backgroundColor: '#54AF29',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textW: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  viewImage: {
    marginHorizontal: 50,
    alignItems: 'center',
    marginVertical: 20,
    padding: 20,
    backgroundColor: '#CEF4F5',
  },
  rowSheet: {
    marginHorizontal: 80,
    height: 50,
    backgroundColor: '#00CCFF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    flexDirection: 'row',
  },
  viewChose: {
    marginHorizontal: 0,
    minHeight: 500,
    backgroundColor: '#FFB570',
    padding: 5,
  },
});
