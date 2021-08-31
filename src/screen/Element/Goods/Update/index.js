import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  Button,
  StyleSheet,
  Image,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  ToastAndroid,
  Alert,
} from 'react-native';
import styles from './styles';
import ImagePicker from 'react-native-image-crop-picker';
import Header from '../Header';
import {Picker} from '@react-native-picker/picker';
import Spinner from 'react-native-spinkit';
import RBSheet from 'react-native-raw-bottom-sheet';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import {AppContext} from '../../../../component/AppContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {apiGoodsMainList, apiUpdateGoods} from '../../../../api';
export default function index({route, navigation}) {
  const [progess, setProgess] = useState(true);
  ////route//
  const {dataResult} = route.params;
  console.log("Hien");
  console.log(dataResult);

  ///
  const {token} = useContext(AppContext);
  const [sizeDefault, setSizeDefault] = useState('0');
  const [typeSize, setTypeSize] = useState('0');
  const [load, setLoad] = useState(true);
  const refRBSheet = useRef();
  const sheetRef = React.useRef(null);
  const [imageTemp, setImageTemp] = useState({
    path: 'https://thailamlandscape.vn/wp-content/uploads/2017/10/no-image.png',
    base64: '',
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [dataMainGood, setDataMainGood] = useState([]);

  ////Cac thuoc tinh chen:
  const [typeProduct, setTypeProcuct] = useState(dataResult.id_type_main);
  const [name, setName] = useState(dataResult.name);
  const [details, setDetails] = useState(dataResult.details);
  const [price, setPrice] = useState(dataResult.price.toString());
  const [sale, setSale] = useState(dataResult.sale.toString());
  const [new1, setNew1] = useState(dataResult.new.toString());
  const [gender, setGender] = useState(dataResult.gender.toString());
  const [idTypeDetails, setIdTypeDetails] = useState(dataResult.id);
  const [imageMain, setImageMain] = useState({
    name: dataResult.img,
    base64: '',
  });
  const [imageArray, setImageArray] = useState(dataResult.array_img);
  const lengthImg = dataResult.array_img.length;
  const [arraySize, setArraySize] = useState(dataResult.products);
  ////////////

  ///////////

  //////////////////////////////////////
  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      // cropping: true,
      includeBase64: true,
    })
      .then(image => {
        setImageTemp({
          name: image.path,
          base64: 'data:' + image.mime + ';base64,' + image.data,
        });
      })
      .catch(err => {
        console.log('openCamera catch' + err.toString());
      });
  };
  const openLibary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      // cropping: true,
      includeBase64: true,
    })
      .then(image => {
        // console.log(image.path);
        setImageTemp({
          name: image.path,
          base64: 'data:' + image.mime + ';base64,' + image.data,
        });
      })
      .catch(err => {
        console.log('openCamera catch' + err.toString());
      });
  };
  const changeImageMain = () => {
    console.log('changeImageMain');
    setImageMain(imageTemp);
  };
  const InsertImageAlbum = () => {
    if (imageTemp.base64 === '') return null;
    console.log('InsertImageAlbum');
    imageArray.push(imageTemp);
    console.log(imageArray);
    console.log(imageArray.length);
  };
  const deleteImageAlbum = value => {
    console.log(value);
    let temp = imageArray.splice(value, 1);
    //setImageArray(imageArray);
    //console.log(temp);
    setLoad(!load);
    console.log(imageArray);
    // console.log(imageArray.length);
  };;
  useEffect(() => {
    apiGoodsMainList(token)
      .then(data => {
        if (data.code == 200) {
          // console.log(data.data)
          setDataMainGood(data.data);
        }
      })
      .catch(e => console.log(e));
  }, []);
  const handleUpdate = () => {
    console.log('update');
    //console.log(imageMain);
    console.log(imageArray);
    apiUpdateGoods(
      token,
      idTypeDetails,
      typeProduct,
      name,
      details,
      price,
      sale,
      new1,
      imageMain.base64===""?imageMain.name:imageMain.base64,
      gender,
      imageArray,
      arraySize,
    )
      .then(result => {
        console.log(result);
        if (result.code == 200) {
          ToastAndroid.showWithGravity(
            'Cập nhật thành công',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
        } else
          ToastAndroid.showWithGravity(
            'Cập nhật thất bại',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
      })
      .catch(err => console.log(err));
  };
  const handleConfirm = () => {
    Alert.alert(
      'Bạn chắc chắn cập nhật mặt hàng',
      'Nên kiểm tra kĩ trước khi cập nhật sản phẩm',
      [
        {
          text: 'Quay lại, Kiểm tra',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Tiếp tục, Cập nhật', onPress: () => handleUpdate()},
      ],
    );
  };
  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        onClickLeft={() => navigation.goBack()}
        title="Cập nhật sản phẩm vào kho"
        rightIcon={true}
        background="#0D9E00"
      />
      <ScrollView>
        <View style={styles.loaiSp}>
          <Text style={{width: 100}}>Loại mặt hàng:</Text>
          <Picker
            style={{width: 200}}
            selectedValue={typeProduct}
            onValueChange={item => setTypeProcuct(item)}>
            {dataMainGood.map((item, index) => (
              <Picker.Item key={index} label={item.name} value={item.id} />
            ))}
          </Picker>
        </View>
        <View style={styles.viewInput}>
          <Text style={{width: 100}}>Tên sản phẩm:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Nhập vào tên sản phâm"
            value={name}
            onChangeText={text => setName(text)}></TextInput>
        </View>
        <View style={styles.viewInput}>
          <Text style={{width: 100}}>Thông tin:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Nhập vào thông tin sản phâm"
            value={details}
            onChangeText={text => setDetails(text)}
          />
        </View>
        <View style={styles.loaiSp}>
          <Text style={{width: 100}}>Loại:</Text>
          <Picker
            style={{width: 200}}
            selectedValue={gender}
            onValueChange={item => setGender(item)}>
            <Picker.Item label="Dành cho nam" value="nam" />
            <Picker.Item label="Dành cho nữ" value="Nu" />
            <Picker.Item label="Dành cho tất cả" value="tat" />
          </Picker>
        </View>
        <View style={styles.viewInput}>
          <Text style={{width: 100}}>Giá:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Nhập vào giá gốc "
            value={price}
            onChangeText={text => setPrice(text)}
          />
        </View>
        <View style={styles.viewInput}>
          <Text style={{width: 100}}>Sale:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Nhập vào phần trăm sale(khuyến mãi)"
            value={sale}
            onChangeText={text => setSale(text)}
          />
        </View>
        <View style={styles.loaiSp}>
          <Text style={{width: 100}}>Loại:</Text>
          <Picker
            style={{width: 200}}
            selectedValue={new1}
            onValueChange={item => setNew1(item)}>
            <Picker.Item label="Sản phẩm mới" value="1" />
            <Picker.Item label="Không phải sản phẩm mới" value="0" />
          </Picker>
        </View>
        <View style={styles.viewInput}>
          <Text style={{width: 100}}>Chọn ảnh chính</Text>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.btnImg}>
            <Text style={styles.fontW}>Đi đến thư mục</Text>
          </TouchableOpacity>
        </View>
          <View style={styles.viewRowsImage}>
            <Image
              source={{uri: imageMain.name}}
              style={{width: 100, height: 100, resizeMode: 'stretch'}}></Image>
          </View>

        <View style={styles.viewInput}>
          <Text style={{width: 100}}>Chọn các ảnh mô tả</Text>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.btnImg}>
            <Text style={styles.fontW}>Đi đến thư mục</Text>
          </TouchableOpacity>
        </View>
        {imageArray.length != 0 && (
          <View style={styles.viewRowsImage}>
            {imageArray.map((item, index) => (
              <View key={index} style={styles.viewRow}>
                <Image source={{uri: item.name}} style={styles.itemImg100} />
                <TouchableOpacity
                  onPress={() => deleteImageAlbum(index)}
                  style={styles.itemDelete}>
                  <Text style={{color: '#fff'}}>Xoa</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Chose img</Text>
              <Button title="Camera" onPress={openCamera} />
              <Text></Text>
              <Button title="Libary" onPress={openLibary} />
              <Text></Text>
              <Image
                source={{uri: imageTemp.path}}
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: 'stretch',
                }}></Image>
              <Text></Text>
              <Button
                title="Thay đổi cho ảnh chính"
                onPress={changeImageMain}
              />
              <Text></Text>
              <Button
                title="Thêm vào album ảnh mô tả"
                onPress={InsertImageAlbum}
              />
              <Text></Text>
              <Button
                title="Hinde"
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
          </View>
        </Modal>
        <View
          style={{
            marginHorizontal: 10,
            marginVertical: 8,
            backgroundColor: '#fff',
            borderRadius: 10,
            borderWidth: 1,
          }}>
          {arraySize.map((item, index) => (
            <View
              key={index}
              style={{
                margin: 10,
                backgroundColor: 'gray',
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <Text style={styles.fontW}>
                Nhập số lượng size {item.size}:{item.number}
              </Text>
              <TextInput
                style={{marginLeft: 20, backgroundColor: '#ff0'}}
                value={item.number}
                placeholder={'number:' + item.number}
                onChangeText={text => {
                  {
                    arraySize.splice(index, 1, {
                      id: item.id,
                      number: text,
                      size: item.size,
                    });
                    setLoad(!load);
                  }
                }}></TextInput>
            </View>
          ))}
        </View>
        <TouchableOpacity
          onPress={handleConfirm}
          style={[styles.btnImg, {height: 40}]}>
          <Text style={styles.fontW}>Cập nhật sản phẩm vào kho</Text>
        </TouchableOpacity>
        <View style={{marginVertical: 50}}></View>
      </ScrollView>
    </View>
  );
}
