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

import ImagePicker, {openCamera} from 'react-native-image-crop-picker';
import Header from '../Header';
import {AppContext} from '../../../../component/AppContext';
import {apiInsertTypeMain, apiUpdateTypeMain} from '../../../../api';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'react-native-fetch-blob';
//import {NativeModules} from 'react-native';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
export default function index({route, navigation}) {
  const {idT, nameT, imgT} = route.params;
  const {token} = useContext(AppContext);

  const [imageTemp, setImageTemp] = useState('');
  const [base, setBase] = useState();
  //const RNFetchBlob = NativeModules.RNFetchBlob;
  // const handleConfirm = () => {
  //   var data = new FormData();
  //   data.append('file', {
  //     uri: imageTemp,
  //     name: imageTemp,
  //     type: 'image/jpg',
  //   });
  //   console.log(data);
  //   fetch('http://192.168.0.103:8000/api/permission_admin/test_img', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'multipart/form-data',
  //     },
  //     body: JSON.stringify({
  //       data: data,
  //       name2: 'text',
  //     }),
  //   })
  //     .then(response => response.json())
  //     .then(s => console.log(s))
  //     .catch(err => console.log(err));
  // };

  // const submit = () => {
  //   console.log("submit");
  //   RNFetchBlob.fetch(
  //     'POST',
  //     'http://192.168.0.103:8000/api/permission_admin/upload',
  //     {
  //       Authorization: 'Bearer access-token',
  //       otherHeader: 'foo',
  //       'Content-Type': 'multipart/form-data',
  //     },
  //     [
  //       {
  //         name: 'title',
  //         data: 'phamha',
  //       },
  //       {
  //         name: 'base64',
  //         filename: 'avatar.jpg',
  //         data: base,
  //       },
  //     ],
  //   )
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(err => console.log(err));
  // };
  // const openCamera = () => {
  //   let options = {
  //     storageOptions: {
  //       path: 'images',
  //       mediaType: 'photo',
  //     },
  //     includeBase64: true,
  //   };
  //   launchCamera(options, response => {
  //     console.log('Response=', response);
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error:', response.error);
  //     } else if (response.customButton) {
  //       console.log('User tapped custom button:', response.customButton);
  //     } else {
  //       const source = {uri: 'data:image/jpeg;base64,' + response.base64};
  //       setImageTemp(source);
  //       //console.log(response);
  //       //setImageTemp(response.assets[0].uri);
  //     }
  //   });
  // };
  // const openLibrary = () => {
  //   let options = {
  //     storageOptions: {
  //       path: 'images',
  //       mediaType: 'photo',
  //     },
  //     includeBase64: true,
  //   };
  //   launchImageLibrary(options, response => {
  //     console.log('Response=', response);
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error:', response.error);
  //     } else if (response.customButton) {
  //       console.log('User tapped custom button:', response.customButton);
  //     } else {
  //       const source = {uri: 'data:image/jpeg;base64,' + response.base64};
  //       setImageTemp(source);
  //       //console.log(response);
  //       //setImageTemp(response.assets[0].uri);
  //     }
  //   });
  // };
  const send = () => {
    console.log('send');
    fetch('http://192.168.0.103:8000/api/permission_admin/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'ao moi',
        base64: 'data:image/png;base64,' + base,
      }),
    })
      .then(response => response.json())
      .then(s => console.log(s))
      .catch(err => console.log(err));
  };
  const give = () => {
    console.log('give');
    fetch('http://192.168.0.103:8000/api/permission_admin/test_img', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(s => {
        console.log(s);
        setanh2(s.data);
      })
      .catch(err => console.log(err));
  };
  const [anh2, setanh2] = useState('');
  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        title="insert"
        background="#00CCFF"
        onClickLeft={() => navigation.goBack()}
      />
      <ScrollView>
        <Button
          title="Open camera"
          onPress={async () => {
            await launchCamera(
              {
                mediaType: 'photo',
                quality: 1,
                includeBase64: true,
                saveToPhotos: true,
                maxWidth: 600,
                maxHeight: 600,
              },
              res => {
                setImageTemp(res.assets[0].uri);
                setBase(res.assets[0].base64);

                console.log(res);
              },
            );
          }}></Button>
        <Text></Text>
        <Button
          title="Open Library"
          onPress={async () => {
            await launchImageLibrary(
              {
                mediaType: 'photo',
                quality: 1,
                includeBase64: true,
                saveToPhotos: true,
                maxWidth: 600,
                maxHeight: 600,
              },
              res => {
                setImageTemp(res.assets[0].uri);
                setBase(res.assets[0].base64);
                console.log(res);
              },
            );
          }}></Button>
        <Text></Text>
        <Button title="gửi lên" onPress={send}></Button>

        <Image
          source={{uri: imageTemp}}
          style={{width: 200, height: 250, resizeMode: 'contain'}}
        />
        <Button title="load anh" onPress={give}></Button>
        <Image
          source={{uri: anh2}}
          style={{width: 200, height: 250, resizeMode: 'contain'}}
        />
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
    borderBottomWidth: 0.5,
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
