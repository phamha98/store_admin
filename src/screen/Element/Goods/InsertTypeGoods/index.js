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

import RBSheet from 'react-native-raw-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import Header from '../Header';
import {AppContext} from '../../../../component/AppContext';
import {apiInsertTypeMain, apiUpdateTypeMain} from '../../../../api';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function index({route, navigation}) {
  const {idT, nameT, imgT} = route.params;
  const {token} = useContext(AppContext);
  const refRBSheet = useRef();
  const [imageTemp, setImageTemp] = useState(imgT);
  const [name, setName] = useState(nameT);
  const [base64, setBase64] = useState('');
  const [urlImage, setUrlImage] = useState('');
  const [post, setPost] = useState(false);
  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      //cropping: true,
      includeBase64: true,
    })
      .then(image => {
        //console.log(image);
        setImageTemp(image.path);
        setBase64('data:' + image.mime + ';base64,' + image.data);
        setPost(true);
        setUrlImage('');
        refRBSheet.current.close();
      })
      .catch(err => {
        console.log('openCamera catch' + err.toString());
      });
  };

  const openLibary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      //cropping: true,
      includeBase64: true,
    })
      .then(image => {
        //console.log(image);
        setImageTemp(image.path);
        setBase64('data:' + image.mime + ';base64,' + image.data);
        setPost(true);
        setUrlImage('');
        refRBSheet.current.close();
      })
      .catch(err => {
        console.log('openCamera catch' + err.toString());
      });
  };
  const openPicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      multiple: true,
      includeBase64: true,
    }).then(image => {
      console.log(image);
    });
  };

  const send = () => {
    console.log("show post : "+post);
    console.log(urlImage);
    if (idT === '') {
      apiInsertTypeMain(token, name, base64, imageTemp, post)
        .then(result => {
          console.log(result);
          if (result.code == 200) {
            console.log(result);
            ToastAndroid.showWithGravity(
              result.message,
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
            );
          } else
            ToastAndroid.showWithGravity(
              result.message,
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
            );
        })
        .catch(err => console.log(err));
    } else {
      apiUpdateTypeMain(token, idT, name, base64, imageTemp, post)
        .then(result => {
          if (result.code == 200) {
            console.log(result);
            ToastAndroid.showWithGravity(
              result.message,
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
            );
          } else
            ToastAndroid.showWithGravity(
              result.message,
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
            );
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        title={idT === '' ? 'Thêm Loại hàng mới' : 'Cập nhật Loại Hàng'}
        rightIcon={true}
        background="#0D9E00"
        onClickLeft={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={styles.viewInput}>
          <TextInput
            style={styles.textInput}
            placeholder="Nhập vào tên loại hàng"
            value={name}
            onChangeText={text => setName(text)}
          />
        </View>
        <View style={{marginHorizontal: 10, alignItems: 'center'}}>
          <Text style={{fontSize: 10, fontStyle: 'italic', color: 'red'}}>
            Tên mô ta dễ hiểu,nên viết ngắn gọn
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => refRBSheet.current.open()}
          style={styles.button}>
          <Text style={[styles.textW, {marginHorizontal: 10}]}>
            {idT === '' ? 'Chọn ảnh' : 'Chỉnh sửa ảnh'}
          </Text>
          <Ionicons name="image-outline" size={30} color="#BBFF00" />
        </TouchableOpacity>

        <View style={styles.viewImage}>
          <Image
            source={{uri: imageTemp}}
            style={{width: 200, height: 250, resizeMode: 'contain'}}
          />
        </View>
        <RBSheet
          //*************************** */
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          height={500}
          openDuration={300}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
              backgroundColor: '#8B7878CA',
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}
          //*************************** */
        >
          <View style={styles.viewChose}>
            <View style={{marginHorizontal: 0, alignItems: 'center'}}>
              <Text style={{fontStyle: 'italic', color: '#fff'}}>
                Sử dụng hình ảnh bằng đường dẫn
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#777675',
                marginHorizontal: 0,
                height: 50,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: 5,
                flexDirection: 'row',
                paddingHorizontal: 10,
              }}>
              <TextInput
                style={[styles.textInput, {maxWidth: 280}]}
                placeholder="Nhập đường dẫn ảnh"
                value={urlImage}
                onChangeText={text => setUrlImage(text)}
              />
              <TouchableOpacity
                onPress={() => setUrlImage('')}
                style={[styles.buttonUrl, {right: 45}]}>
                <Ionicons name="close-outline" size={30} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setImageTemp(urlImage);
                  setPost(false);
                  refRBSheet.current.close();
                }}
                style={styles.buttonUrl}>
                <Ionicons name="paper-plane-outline" size={30} color="#fff" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={openCamera} style={styles.rowSheet}>
              <Text
                style={[
                  styles.textW,
                  {color: '#FFFFFF', marginHorizontal: 10},
                ]}>
                Đi đến máy ảnh
              </Text>
              <Ionicons name="camera-outline" size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={openLibary}
              style={[styles.rowSheet, {backgroundColor: '#58FF0A'}]}>
              <Text
                style={[
                  styles.textW,
                  {color: '#F09494', marginHorizontal: 10},
                ]}>
                Đi đến Thư viện ảnh
              </Text>
              <Ionicons name="images-outline" size={28} color="#00CCFF" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => refRBSheet.current.close()}
              style={[styles.rowSheet, {backgroundColor: '#B35858'}]}>
              <Text style={[styles.textW, {color: '#0B07FF'}]}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
        <TouchableOpacity
          onPress={send}
          style={[styles.button, {backgroundColor: '#FC0000'}]}>
          <Text style={styles.textW}>
            {idT === '' ? 'Thêm Loại hàng mới' : 'Cập nhật Loại Hàng'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  textInput: {
    paddingHorizontal: 5,
    minHeight: 30,
    fontSize: 20,
    marginHorizontal: 0,
  },
  viewInput: {
    marginHorizontal: 10,
    marginTop: 10,
    minHeight: 80,
    backgroundColor: '#fff',
    borderRadius: 10,
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
    color: '#FFEE00',
  },
  viewImage: {
    marginHorizontal: 50,
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: '#B6B6B6',
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
  buttonUrl: {
    position: 'absolute',
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B1B1B',
  },
});
// const handleSubmit=()=>{
//   if(idT===""){
//     apiInsertTypeMain(token, name, imageTemp)
//       .then(result => {
//         console.log(result);
//         if (result.code == 200) {
//           ToastAndroid.showWithGravity(
//             'Chèn thành công',
//             ToastAndroid.LONG,
//             ToastAndroid.CENTER,
//           );
//         } else
//           ToastAndroid.showWithGravity(
//             'Chèn thất bại',
//             ToastAndroid.LONG,
//             ToastAndroid.CENTER,
//           );
//       })
//       .catch(err => console.log(err));
//   }
//   else{
//     apiUpdateTypeMain(token,idT, name, imageTemp)
//       .then(result => {
//         console.log(result);
//         if (result.code == 200) {
//           ToastAndroid.showWithGravity(
//             'Chèn thành công',
//             ToastAndroid.LONG,
//             ToastAndroid.CENTER,
//           );
//         } else
//           ToastAndroid.showWithGravity(
//             'Chèn thất bại',
//             ToastAndroid.LONG,
//             ToastAndroid.CENTER,
//           );
//       })
//       .catch(err => console.log(err));
//   }
// }
// const handleConfirm = () => {
//   Alert.alert(
//     'Bạn chắc chắn Không?',
//     'Nên kiểm tra kĩ trước khi gửi',
//     [
//       {
//         text: 'Quay lại, Kiểm tra',
//         onPress: () => console.log('Cancel Pressed'),
//         style: 'cancel',
//       },
//       {text: 'Tiếp tục, Gửi', onPress: () => handleSubmit()},
//     ],
//   );
// };
