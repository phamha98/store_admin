import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Modal,
  Alert,
  ToastAndroid,
} from 'react-native';
import Header from '../Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Avatar} from 'react-native-elements';
import {Button} from 'react-native-elements';
import {
  apiListPermissionRole,
  apiListPermission,
  apiDeleteRolePermission,
  apiInsertRolePermission,
} from '../../../../api';
import {AppContext} from '../../../../component/AppContext';
import RBSheet from 'react-native-raw-bottom-sheet';

export default function index({route, navigation}) {
  const refRBSheet = useRef();
  const {token} = useContext(AppContext);
  const [data, setData] = useState([]);
  const [value, setValue] = useState([]);
  const {idRole, displayName} = route.params;
  const [load,setLoad]=useState(true)
  useEffect(() => {
    apiListPermissionRole(token, idRole).then(result => {
      if (result.code == 200) {
        //console.log(result.data);
        setData(result.data);
      }
    });
    apiListPermission(token).then(result => {
      if (result.code == 200) {
        //console.log(result);
        setValue(result.data);
      }
    });
  }, [load]);
  const check = id => {
    const isObject = v => {
      return !!v && v.constructor === Object;
    };
    let temp = data.find(item => item.id == id);
    return isObject(temp);
  };
  const deleteRolePermission = idPermission => {
    apiDeleteRolePermission(token,idRole, idPermission)
      .then(result => {
        setLoad(!load);
        if (result.data == 1)
          ToastAndroid.showWithGravity(
            'Xóa thành công',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          else 
          ToastAndroid.showWithGravity(
            'Xóa thất bại',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
      })
      .catch(e => console.log(e));
  };
  const insertRolePermission = idPermission => {
    apiInsertRolePermission(token,idRole, idPermission)
      .then(result => {
          setLoad(!load);
        if (result.code== 200)
          ToastAndroid.showWithGravity(
            'Chèn thành công',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        else
          ToastAndroid.showWithGravity(
            'Chèn thất bại',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
      })
      .catch(e => console.log(e));
   // console.log((idPermission));
  };
  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        title={'Quyền ' + displayName}
        rightIcon={true}
        background="#FFFFFF"
        rightNameIcon="person-circle-outline"
        onClickLeft={() => navigation.goBack()}
        onClickRight={() => navigation.navigate('Person')}
      />
      <TouchableOpacity
        onPress={() => refRBSheet.current.open()}
        style={[
          styles.rowItem,
          {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#04BBE9',
          },
        ]}>
        <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>
          Thêm quyền
        </Text>
      </TouchableOpacity>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
            backgroundColor: '#8B7878CA',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <View style={styles.viewChose}>
          <FlatList
            data={value}
            keyExtractor={item => item.id}
            renderItem={({item}) =>
              !check(item.id) && (
                <View
                  //onPress={openCamera}
                  style={styles.rowSheet}>
                  <Text
                    style={[
                      styles.textW,
                      {color: '#FFFFFF', marginHorizontal: 10},
                    ]}>
                    {item.display_name}
                  </Text>
                  <Ionicons
                    onPress={() => insertRolePermission(item.id)}
                    name="add-circle-outline"
                    size={30}
                    color="#fff"
                  />
                </View>
              )
            }></FlatList>
        </View>
      </RBSheet>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.rowItem}>
            <Text>{item.display_name}</Text>
            <Button
              onPress={() => deleteRolePermission(item.id)}
              title="Xóa"></Button>
          </View>
        )}
      />
    </View>
  );
}
const ViewItem = ({item, idRole}) => {
  return (
    <View style={styles.rowItem}>
      <Text>{item.display_name}</Text>
      <Button onPress={() => deletRolePermission(item.id)} title="Xoa"></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#666560'},

  content: {
    width: 250,
    padding: 10,
  },
  rowItem: {
    minHeight: 50,
    backgroundColor: '#fff',
    marginVertical: 2,
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-between',
    marginHorizontal: 5,
    paddingHorizontal: 10,
  },
  textW: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFEE00',
  },
  rowSheet: {
    marginHorizontal: 20,
    height: 35,
    backgroundColor: '#00CCFF',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  viewChose: {
    marginHorizontal: 0,

    backgroundColor: '#FFB570',
    padding: 5,
    paddingBottom: 30,
  },
});
