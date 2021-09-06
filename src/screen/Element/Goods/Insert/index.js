import React, {useState, useEffect, useContext} from 'react'
import {
  Button,
  Image,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  ToastAndroid,
  Alert,
} from 'react-native'
import styles from './styles'
import ImagePicker from 'react-native-image-crop-picker'
import Header from '../Header'
import {Picker} from '@react-native-picker/picker'
import {apiGoodsMainList, apiInsertGoods} from '@api'
import {AppContext, HeaderC, Layout, ItemTypeProduct} from '@component'
import {navigate} from '@navigation'
export default function index ({navigation}) {
  const {token} = useContext(AppContext)
  const [typeSize, setTypeSize] = useState('')
  const [load, setLoad] = useState(true)
  const [imageTemp, setImageTemp] = useState({
    path: 'https://thailamlandscape.vn/wp-content/uploads/2017/10/no-image.png',
    base64: '',
  })
  const [modalVisible, setModalVisible] = useState(false)
  const [dataMainGood, setDataMainGood] = useState([])

  ////Cac thuoc tinh chen:
  const [typeProduct, setTypeProcuct] = useState()
  const [name, setName] = useState('fdhdfh')
  const [details, setDetails] = useState('gsdg')
  const [price, setPrice] = useState('45235')
  const [sale, setSale] = useState('56')
  const [new1, setNew1] = useState('1')
  const [gender, setGender] = useState('nam')
  const [imageMain, setImageMain] = useState({
    path: '',
    base64: '',
  })
  const [imageArray, setImageArray] = useState([])
  const [arraySize, setArraySize] = useState([])
  ///////////
  const [sizeAlpha, setSizeAlpha] = useState({
    S: '0',
    M: '0',
    L: '0',
    XL: '0',
    XXL: '0',
  })
  const [sizeNumber, setSizeNumber] = useState({
    S40: '0',
    S41: '0',
    S42: '0',
    S43: '0',
    S44: '0',
    S45: '0',
  })

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
          path: image.path,
          base64: 'data:' + image.mime + ';base64,' + image.data,
        })
      })
      .catch(err => {
        console.log('openCamera catch' + err.toString())
      })
  }
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
          path: image.path,
          base64: 'data:' + image.mime + ';base64,' + image.data,
        })
      })
      .catch(err => {
        console.log('openCamera catch' + err.toString())
      })
  }
  const changeImageMain = () => {
    if (imageTemp.base64 === '') return null
    console.log('changeImageMain')
    setImageMain(imageTemp)
  }
  const InsertImageAlbum = () => {
    if (imageTemp.base64 === '') return null
    console.log('InsertImageAlbum')
    imageArray.push(imageTemp)
    console.log(imageArray)
    console.log(imageArray.length)
  }
  const deleteImageAlbum = value => {
    console.log(value)
    let temp = imageArray.splice(value, 1)
    //setImageArray(imageArray);
    //console.log(temp);
    setLoad(!load)
    console.log(imageArray)
    // console.log(imageArray.length);
  }
  useEffect(() => {
    apiGoodsMainList(token)
      .then(data => {
        if (data.code == 200) {
          // console.log(data.data)
          setDataMainGood(data.data)
        }
      })
      .catch(e => console.log(e))
  }, [])
  const handleInsert = () => {
    console.log('insert')
    //console.log(imageMain);
    if (typeSize === '0') {
      setArraySize([
        {
          size: 'S',
          number: sizeAlpha.S,
        },
        {
          size: 'M',
          number: sizeAlpha.M,
        },
        {
          size: 'L',
          number: sizeAlpha.L,
        },
        {
          size: 'XL',
          number: sizeAlpha.XL,
        },
        {
          size: 'XXL',
          number: sizeAlpha.XXL,
        },
      ])
    } else {
      setArraySize([
        {
          size: '40',
          number: sizeNumber.S40,
        },
        {
          size: '41',
          number: sizeNumber.S41,
        },
        {
          size: '42',
          number: sizeNumber.S42,
        },
        {
          size: '43',
          number: sizeNumber.S43,
        },
        {
          size: '44',
          number: sizeNumber.S44,
        },
        {
          size: '45',
          number: sizeNumber.S45,
        },
      ])
    }
    console.log(arraySize)
    apiInsertGoods(
      token,
      typeProduct,
      name,
      details,
      price,
      sale,
      new1,
      imageMain.base64,
      gender,
      imageArray,
      arraySize,
    )
      .then(result => {
        console.log(result)
        if (result.code == 200) {
          ToastAndroid.showWithGravity(
            'Chèn thành công',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          )
        } else
          ToastAndroid.showWithGravity(
            'Không chèn thành công',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          )
      })
      .catch(err => console.log(err))
  }
  const handleConfirm = () => {
    Alert.alert(
      'Bạn chắc chắn thêm mặt hàng',
      'Nên kiểm tra kĩ trước khi chèn sản phẩm',
      [
        {
          text: 'Quay lại, Kiểm tra',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Tiếp tục, Thêm', onPress: () => handleInsert()},
      ],
    )
  }
  return (
    <Layout>
      <HeaderC title='Thêm sản phẩm vào kho' />
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
            placeholder='Nhập vào tên sản phâm'
            value={name}
            onChangeText={text => setName(text)}></TextInput>
        </View>
        <View style={styles.viewInput}>
          <Text style={{width: 100}}>Thông tin:</Text>
          <TextInput
            style={styles.textInput}
            placeholder='Nhập vào thông tin sản phâm'
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
            <Picker.Item label='Dành cho nam' value='nam' />
            <Picker.Item label='Dành cho nữ' value='nu' />
            <Picker.Item label='Dành cho tất cả' value='tat' />
          </Picker>
        </View>
        <View style={styles.viewInput}>
          <Text style={{width: 100}}>Giá:</Text>
          <TextInput
            style={styles.textInput}
            placeholder='Nhập vào giá gốc '
            value={price}
            onChangeText={text => setPrice(text)}
          />
        </View>
        <View style={styles.viewInput}>
          <Text style={{width: 100}}>Sale:</Text>
          <TextInput
            style={styles.textInput}
            placeholder='Nhập vào phần trăm sale(khuyến mãi)'
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
            <Picker.Item label='Sản phẩm mới' value='1' />
            <Picker.Item label='Không phải sản phẩm mới' value='0' />
          </Picker>
        </View>
        <View style={styles.viewInput}>
          <Text style={{width: 100}}>Chọn ảnh chính</Text>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.btnImg}>
            <Text>Đi đến thư mục</Text>
          </TouchableOpacity>
        </View>
        {imageMain.path !== '' && (
          <View style={styles.viewRowsImage}>
            <Image
              source={{uri: imageMain.path}}
              style={{width: 100, height: 100, resizeMode: 'stretch'}}></Image>
          </View>
        )}

        <View style={styles.viewInput}>
          <Text style={{width: 100}}>Chọn các ảnh mô tả</Text>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.btnImg}>
            <Text>Đi đến thư mục</Text>
          </TouchableOpacity>
        </View>
        {imageArray.length != 0 && (
          <View style={styles.viewRowsImage}>
            {imageArray.map((item, index) => (
              <View key={index} style={styles.viewRow}>
                <Image source={{uri: item.path}} style={styles.itemImg100} />
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
          animationType='slide'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.')
            setModalVisible(!modalVisible)
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Chose img</Text>
              <Button title='Camera' onPress={openCamera} />
              <Text></Text>
              <Button title='Libary' onPress={openLibary} />
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
                title='Thay đổi cho ảnh chính'
                onPress={changeImageMain}
              />
              <Text></Text>
              <Button
                title='Thêm vào album ảnh mô tả'
                onPress={InsertImageAlbum}
              />
              <Text></Text>
              <Button
                title='Hinde'
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
          </View>
        </Modal>
        <View style={styles.loaiSp}>
          <Text>Loại</Text>
          <Picker
            style={{width: 200}}
            selectedValue={typeSize}
            onValueChange={item => setTypeSize(item)}>
            <Picker.Item label='Quần áo' value='0' />
            <Picker.Item label='Giầy dép' value='1' />
          </Picker>
        </View>
        {typeSize === '0' && (
          <View
            style={{
              marginHorizontal: 10,
              marginVertical: 10,
              minHeight: 50,
              borderBottomWidth: 1,
            }}>
            <View style={styles.rowSize}>
              <Text style={{fontSize: 20, minWidth: 180}}>S={sizeAlpha.S}</Text>
              <TextInput
                style={{
                  backgroundColor: '#D6C8C8',
                  minWidth: 180,
                }}
                value={sizeAlpha.S}
                onChangeText={text =>
                  setSizeAlpha(state => {
                    return {
                      ...state,
                      S: text,
                    }
                  })
                }
                placeholder='Nhập số lượng size S'
              />
            </View>
            <View style={styles.rowSize}>
              <Text style={{fontSize: 20, minWidth: 180}}>M={sizeAlpha.M}</Text>
              <TextInput
                style={{
                  backgroundColor: '#D6C8C8',
                  minWidth: 180,
                }}
                value={sizeAlpha.M}
                onChangeText={text =>
                  setSizeAlpha(state => {
                    return {
                      ...state,
                      M: text,
                    }
                  })
                }
                placeholder='Nhập số lượng size M'
              />
            </View>
            <View style={styles.rowSize}>
              <Text style={{fontSize: 20, minWidth: 180}}>L={sizeAlpha.L}</Text>
              <TextInput
                style={{
                  backgroundColor: '#D6C8C8',
                  minWidth: 180,
                }}
                value={sizeAlpha.L}
                onChangeText={text =>
                  setSizeAlpha(state => {
                    return {
                      ...state,
                      L: text,
                    }
                  })
                }
                placeholder='Nhập số lượng size L'
              />
            </View>
            <View style={styles.rowSize}>
              <Text style={{fontSize: 20, minWidth: 180}}>
                XL={sizeAlpha.XL}
              </Text>
              <TextInput
                style={{
                  backgroundColor: '#D6C8C8',
                  minWidth: 180,
                }}
                value={sizeAlpha.XL}
                onChangeText={text =>
                  setSizeAlpha(state => {
                    return {
                      ...state,
                      XL: text,
                    }
                  })
                }
                placeholder='Nhập số lượng size XL'
              />
            </View>
            <View style={styles.rowSize}>
              <Text style={{fontSize: 20, minWidth: 180}}>
                XXL={sizeAlpha.XXL}
              </Text>
              <TextInput
                style={{
                  backgroundColor: '#D6C8C8',
                  minWidth: 180,
                }}
                value={sizeAlpha.XXL}
                onChangeText={text =>
                  setSizeAlpha(state => {
                    return {
                      ...state,
                      XXL: text,
                    }
                  })
                }
                placeholder='Nhập số lượng size XXL'
              />
            </View>
          </View>
        )}
        {typeSize == '1' && (
          <View
            style={{
              marginHorizontal: 10,
              marginVertical: 10,
              minHeight: 50,
              borderBottomWidth: 1,
            }}>
            <View style={styles.rowSize}>
              <Text style={{fontSize: 20, minWidth: 180}}>
                40={sizeNumber.S40}
              </Text>
              <TextInput
                style={{
                  backgroundColor: '#D6C8C8',
                  minWidth: 180,
                }}
                value={sizeNumber.S40}
                onChangeText={text =>
                  setSizeNumber(state => {
                    return {
                      ...state,
                      S40: text,
                    }
                  })
                }
                placeholder='Nhập số lượng size 40'
              />
            </View>
            <View style={styles.rowSize}>
              <Text style={{fontSize: 20, minWidth: 180}}>41</Text>
              <TextInput
                style={{
                  backgroundColor: '#D6C8C8',
                  minWidth: 180,
                }}
                value={sizeNumber.S41}
                onChangeText={text =>
                  setSizeNumber(state => {
                    return {
                      ...state,
                      S41: text,
                    }
                  })
                }
                placeholder='Nhập số lượng size 41'
              />
            </View>
            <View style={styles.rowSize}>
              <Text style={{fontSize: 20, minWidth: 180}}>42</Text>
              <TextInput
                style={{
                  backgroundColor: '#D6C8C8',
                  minWidth: 180,
                }}
                value={sizeNumber.S42}
                onChangeText={text =>
                  setSizeNumber(state => {
                    return {
                      ...state,
                      S42: text,
                    }
                  })
                }
                placeholder='Nhập số lượng size 42'
              />
            </View>
            <View style={styles.rowSize}>
              <Text style={{fontSize: 20, minWidth: 180}}>43</Text>
              <TextInput
                style={{
                  backgroundColor: '#D6C8C8',
                  minWidth: 180,
                }}
                value={sizeNumber.S43}
                onChangeText={text =>
                  setSizeNumber(state => {
                    return {
                      ...state,
                      S43: text,
                    }
                  })
                }
                placeholder='Nhập số lượng size 43'
              />
            </View>
            <View style={styles.rowSize}>
              <Text style={{fontSize: 20, minWidth: 180}}>44</Text>
              <TextInput
                style={{
                  backgroundColor: '#D6C8C8',
                  minWidth: 180,
                }}
                value={sizeNumber.S44}
                onChangeText={text =>
                  setSizeNumber(state => {
                    return {
                      ...state,
                      S44: text,
                    }
                  })
                }
                placeholder='Nhập số lượng size 44'
              />
            </View>
            <View style={styles.rowSize}>
              <Text style={{fontSize: 20, minWidth: 180}}>45</Text>
              <TextInput
                style={{
                  backgroundColor: '#D6C8C8',
                  minWidth: 180,
                }}
                value={sizeNumber.S45}
                onChangeText={text =>
                  setSizeNumber(state => {
                    return {
                      ...state,
                      S45: text,
                    }
                  })
                }
                placeholder='Nhập số lượng size 45'
              />
            </View>
          </View>
        )}
        <TouchableOpacity
          onPress={handleConfirm}
          style={[styles.btnImg, {height: 40}]}>
          <Text>Thêm sản phẩm vào kho</Text>
        </TouchableOpacity>
        <View style={{marginVertical: 50}}></View>
      </ScrollView>
    </Layout>
  )
}
