import React, {useState, useEffect, useContext} from 'react';
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
} from 'react-native';
import Header from '../Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Avatar} from 'react-native-elements';
import {Button} from 'react-native-elements';
import {apiListAcount} from '../../../../api';
import {SearchBar} from 'react-native-elements';
import {AppContext} from '../../../../component/AppContext';
export default function index({navigation}) {
  const {token} = useContext(AppContext);
  const [data, setData] = useState([]);
  const [search,setSearch]=useState();
    return (
      <View style={{flex: 1}}>
        <Header
          navigation={navigation}
          title="Danh sách khách hàng"
          rightIcon={true}
          background="#FAE902"
          rightNameIcon="person-circle-outline"
          onClickLeft={() => navigation.goBack()}
          onClickRight={() => navigation.navigate('Person')}
        />
        <SearchBar
          placeholder="Type Here..."
          onChangeText={text => setSearch(text)}
          value={search}
          lightTheme="#fff"
          searchIcon={()=>alert("asadad")}
        />
        <Text></Text>
      </View>
    );
}

const styles = StyleSheet.create({})
