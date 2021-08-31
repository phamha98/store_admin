import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Header from '../../../component/Header';

import {TabView, SceneMap} from 'react-native-tab-view';
import styles from './styles';
import {Tab1,Tab2,Tab3} from './Component';
export default function StatisticBills({navigation}) {
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    {key: 'tab1', title: 'Hôm nay', Ionicons: 'home'},
    {key: 'tab2', title: 'Tùy chọn', icon: 'home'},
    {key: 'tab3', title: 'Option', icon: 'home'},
  ]);

  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        title="Thống kê Hóa đơn"
        rightIcon={true}
        onClickLeft={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <TabView
          navigationState={{index, routes}}
          renderScene={SceneMap({
            tab1: () => <Tab1 />,
            tab2: () => <Tab2 />,
            tab3: () => <Tab3 />,
          })}
          onIndexChange={setIndex}
          initialLayout={{width: Dimensions.get('window').width}}
        />
      </View>
    </View>
  );
}

