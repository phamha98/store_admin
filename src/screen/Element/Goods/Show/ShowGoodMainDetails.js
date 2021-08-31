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
} from 'react-native';
import Header from '../Header';
import {AppContext} from '../../../../component/AppContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {apiGoodsMainDetails} from '../../../../api';
import Spinner from 'react-native-spinkit';

export default function ShowGoodMainDetails({route, navigation}) {
  const {idMain} = route.params;
  const {token} = useContext(AppContext);
  const [data, setData] = useState([]);
  const [progess, setProgess] = useState(true);
  const [load, setLoad] = useState(true);
  const [sumNumber, setSumNumber] = useState(0);
  //const [typeMain, setTypeMain] = useState({name: '', total_number: 0});
  useEffect(() => {
    setProgess(true);
    apiGoodsMainDetails(token, idMain).then(result => {
      setProgess(false);
      console.log(result.data);
      setData(result.data);
    });
  }, [load]);
  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        onClickLeft={() => navigation.goBack()}
        title="Loai hàng"
        rightIcon={true}
        background="#0D9E00"
        rightNameIcon="cloud-download-outline"
        onClickRight={() => setLoad(!load)}
      />
      {!progess && (
        <View
          style={{marginHorizontal: 10, marginVertical: 10, marginBottom: 50}}>
          <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <ViewMain item={item} navigation={navigation} />
            )}
          />
        </View>
      )}
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
  container: {flex: 1, backgroundColor: '#02AFFF'},
  viewMain: {
    marginVertical: 5,
    backgroundColor: '#FFF',
    borderWidth: 0.5,
    borderColor: '#CFCFCF',
    borderRadius: 5,
    minHeight: 130,
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-between',
  },
  image: {width: 100, height: 130, resizeMode: 'contain'},
  chose: {
    width: 80,
    height: 20,
    backgroundColor: '#0077FF',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 3,
  },
  font: {fontSize: 15, color: '#000', fontWeight: 'normal'},
  fontWeight: {fontSize: 15, color: '#000', fontWeight: 'bold'},
});
const ViewMain = ({item, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ShowGoodDetails', {idProductDetails: item.id})
      }
      style={styles.viewMain}>
      <Image source={{uri: item.img}} style={styles.image}></Image>
      <View
        style={{
          minHeight: 130,
          width: 200,

          justifyContent: 'space-between',
        }}>
        <Text style={[styles.font, {fontWeight: 'bold'}]}>{item.name}</Text>
        <Text style={styles.fontWeight}>
          Price:<Text style={styles.font}>{item.price}</Text>
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.fontWeight}>Size: </Text>
          {item.array_size.map((item, index) => (
            <View key={index}>
              <Text>{item.size}, </Text>
            </View>
          ))}
        </View>
        <Text style={styles.fontWeight}>
          Tổng sản phẩm:
          <Text style={styles.font}>
            {item.total_size != null ? item.total_size.total_number : 0}
          </Text>
        </Text>
        <Text style={styles.fontWeight}>
          Tình trạng:
          <Text style={styles.font}>
            {item.type != null ? item.type : 'no'}
          </Text>
        </Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ShowGoodDetails', {
                idProductDetails: item.id,
              })
            }
            style={styles.chose}>
            <Text style={[styles.font, {color: '#fff', fontSize: 13}]}>
              Chi tiết
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => setModalVisible(!modalVisible)}
            style={[styles.chose, {backgroundColor: 'red'}]}>
            <Text style={[styles.font, {color: '#fff', fontSize: 13}]}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          minWidth: 80,
          minHeight: 130,
          padding: 10,
          backgroundColor: 'pink',
          justifyContent: 'space-between',
        }}>
        <Text style={[styles.fontWeight, {color: 'red'}]}>
          {item.new == 1 ? 'new' : 'no new'}
        </Text>
        <Text style={styles.fontWeight}>
          Loại:
          {item.product_type_main.name ? item.product_type_main.name : typeMain}
        </Text>
        <Text style={styles.fontWeight}>Sale:{item.sale}%</Text>
        <Text style={styles.fontWeight}>Giới:{item.gender}</Text>
        <Text style={styles.fontWeight}>
          Kho:
          {item.total_size != null ? item.total_size.total_number : '0'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
