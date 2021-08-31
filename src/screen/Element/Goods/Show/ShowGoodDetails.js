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
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Header from '../Header';
import {AppContext} from '../../../../component/AppContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {apiGoodDetails} from '../../../../api';
import Spinner from 'react-native-spinkit';
export default function ShowGoodDetails({route, navigation}) {
  const {token} = useContext(AppContext);
  const [data, setData] = useState([]);
  const [arrayImage, setArrayImage] = useState([]);
  const [arraySize, setArraySize] = useState([]);
  const [progess, setProgess] = useState(true);
  const [load, setLoad] = useState(true);
  const {idProductDetails} = route.params;
  useEffect(() => {
    setProgess(true);
    apiGoodDetails(token, idProductDetails).then(result => {
      console.log(result);
      setData(result.data);
      setArrayImage(result.data.array_img);
      setArraySize(result.data.products);
      setProgess(false);
    });
  }, [load]);
  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        onClickLeft={() => navigation.goBack()}
        title="Mặt hàng"
        rightIcon={true}
        background="#0D9E00"
        rightNameIcon="cloud-download"
        onClickRight={() => setLoad(!load)}
      />
      <ScrollView>
        {progess && <ActivityIndicator size="large" color="#F700FF" />}
        {!progess && (
          <>
            <View style={styles.viewImg}>
              <FlatList
                data={arrayImage}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  <View>
                    <Image
                      source={{uri: item.name}}
                      style={{
                        width: 100,
                        height: 100,
                        resizeMode: 'contain',
                      }}></Image>
                  </View>
                )}></FlatList>
            </View>
            <View style={styles.viewInfo}>
              <Text style={styles.fontW}>{data.name}</Text>
              <Text style={styles.fontA}>{data.details}</Text>
              <Text style={styles.fontW}>Price:{data.price}</Text>
              <Text style={styles.fontW}>Sale:{data.sale}%</Text>
              <Text style={styles.fontW}>
                New:{data.new == 1 ? 'Mới' : 'Không'}
              </Text>
              <Text style={styles.fontW}>Giới tính:{data.gender}</Text>
            </View>
            <View style={styles.viewSize}>
              {arraySize.map((item, index) => (
                <View key={index}>
                  <View style={styles.viewItemSize}>
                    <Text style={styles.fontW}>Size:{item.size}</Text>
                    <Text style={styles.fontW}>Number:{item.number}</Text>
                  </View>
                </View>
              ))}
            </View>
            <View style={styles.viewFix}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('UpdateGoods', {dataResult: data})
                }
                style={styles.button}>
                <Text style={[styles.fontW, {color: '#fff'}]}>Chỉnh sửa</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: 'red'}]}>
                <Text style={[styles.fontW, {color: '#fff'}]}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#02AFFF'},
  viewImg: {
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: '#fff',
  },
  viewInfo: {
    marginHorizontal: 10,
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 10,
  },
  viewSize: {
    //marginHorizontal: 10,
    padding: 10,
    //flexDirection: 'row',
  },
  viewItemSize: {
    flexDirection: 'row',
    marginVertical: 5,
    minHeight: 40,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingRight: 50,
  },
  viewFix: {
    marginHorizontal: 10,
    minHeight: 50,
    backgroundColor: '#fff',
    marginBottom: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  button: {
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'blue',
  },
  fontW: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  fontA: {
    fontSize: 14,
  },
});
