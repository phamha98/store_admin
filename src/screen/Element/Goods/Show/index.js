import React, {useState, useEffect, useContext} from 'react';
import {
  Button,
  StyleSheet,
  Image,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import Header from '../Header';
import Spinner from 'react-native-spinkit';
import {AppContext} from '../../../../component/AppContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {apiGoodsMainList} from '../../../../api';
export default function index({navigation}) {
  const [progess, setProgess] = useState(true);
  const {token} = useContext(AppContext);
  const [dataMainGood, setDataMainGood] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setProgess(true);
    apiGoodsMainList(token)
      .then(data => {
        console.log(data);
        if (data.code == 200) {
          setDataMainGood(data.data);
          setProgess(false);
        }
      })
      .catch(e => console.log(e));
  }, [load]);
  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        title="Xem mặt hàng"
        rightIcon={true}
        onClickLeft={() => navigation.goBack()}
        background="#0D9E00"
        rightNameIcon="cloud-download-outline"
        onClickRight={() => setLoad(!load)}
      />
      {!progess && (
        <TouchableOpacity
          onPress={() => navigation.navigate('ShowGoodAll')}
          style={styles.viewAll}>
          <Text style={{fontSize: 20, color: 'blue'}}>Tất cả</Text>
        </TouchableOpacity>
      )}
      <View
        style={{marginHorizontal: 10, marginVertical: 10, marginBottom: 110}}>
        <FlatList
          data={dataMainGood}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <ViewMain item={item} navigation={navigation} />
          )}
          numColumns={2}
        />
      </View>
      {progess && (
        <View style={{marginHorizontal: 0, alignItems: 'center'}}>
          <Spinner
            isVisible={true}
            size={100}
            type="FadingCircleAlt"
            color="green"
            style={{position: 'absolute', top: 200}}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  viewMain: {
    width: (Dimensions.get('window').width - 20 - 40) / 2,
    minHeight: 150,
    backgroundColor: '#9BFD4B',
    marginVertical: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  viewAll: {
    minHeight: 50,
    backgroundColor: '#9BFD4B',
    marginTop: 10,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  image: {width: 200, height: 100, resizeMode: 'contain'},
  viewOption: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#78C43BE8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewModal: {
    marginHorizontal: 30,
    marginVertical: 30,
    borderRadius: 20,
    backgroundColor: '#fff',
    minHeight: 200,
    padding: 30,
  },
});
const ViewMain = ({item, navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ShowGoodMainDetails', {idMain: item.id})
      }
      style={styles.viewMain}>
      <Image source={{uri: item.img}} style={styles.image}></Image>
      <Text style={{fontSize: 20, color: 'blue'}}>{item.name}</Text>
      <TouchableOpacity
        onPress={() => setModalVisible(!modalVisible)}
        style={styles.viewOption}>
        <Ionicons name="arrow-redo" size={20} color="#04880B" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.viewModal}>
          <View
            style={{
              marginHorizontal: 0,
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'blue'}}>
              Mặt Hàng {item.name}
            </Text>
          </View>
          <Button
            title="Chỉnh sửa"
            onPress={() =>
              Alert.alert(
                'Chỉ quản trị cấp cao mới được sử dụng',
                'Cảnh báo!!Khi thay đổi hệ thống dữ liệu sẽ thay đổi toàn bộ theo',
                [
                  {
                    text: 'Quay lại',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'Đi đến',
                    onPress: () => {
                      setModalVisible(false);
                      navigation.navigate('InsertTypeGoods', {
                        idT: item.id,
                        nameT: item.name,
                        imgT: item.img,
                      });
                    },
                  },
                ],
              )
            }
          />
          <Text></Text>
          <Button
            title="Xóa"
            onPress={() =>
              Alert.alert(
                'Chỉ quản trị cấp cao mới được sử dụng',
                'Cảnh báo!!Khi thay đổi hệ thống dữ liệu sẽ thay đổi toàn bộ theo',
                [
                  {
                    text: 'Quay lại',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'Đi đến',
                    onPress: () => setModalVisible(!modalVisible),
                  },
                ],
              )
            }
          />
          <Text></Text>
          <Button title="Ẩn" onPress={() => setModalVisible(!modalVisible)} />
        </View>
      </Modal>
    </TouchableOpacity>
  );
};
