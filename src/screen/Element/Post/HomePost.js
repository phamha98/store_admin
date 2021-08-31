import React from 'react'
import {Button, StyleSheet, Text, View} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import Header from '../Permission/Header'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from './styles'
export default function index ({navigation}) {
  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        title='Quản lý đăng bài'
        rightIcon={true}
        background='#85827A'
        rightNameIcon='person-circle-outline'
        onClickLeft={() => navigation.goBack()}
        onClickRight={() => navigation.navigate('Person')}
      />
      <View
        style={{marginHorizontal: 0, height: '80%', justifyContent: 'center'}}>
        <TouchableOpacity
          style={styles.box1}
          onPress={() => navigation.navigate('ListPost')}>
          <Ionicons name='reader-outline' size={30} color='#FF0000F8' />
          <Text style={styles.text}>DANH SÁCH BÀI VIẾT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box1}
          onPress={() =>
            navigation.navigate('InsertPost', {
              idT: '',
              titleT: '',
              contentT: '',
              imgT:
                'https://thailamlandscape.vn/wp-content/uploads/2017/10/no-image.png',
            })
          }>
          <Ionicons name='add' size={30} color='#FF00EA' />
          <Text style={styles.text}>THÊM BÀI VIÊT</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

// import React, {useState, useRef} from 'react';
// import Header from '../Permission/Header';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { Image } from 'react-native';
// import styles from './styles';
// import {
//   Container,
//   View,
//   DeckSwiper,
//   Card,
//   CardItem,
//   Thumbnail,
//   Text,
//   Left,
//   Body,
//   Icon,
//   Button,
// } from 'native-base';

// export default function HomePost({navigation}) {
//   const cards = [
//     {
//       text: 'Card One',
//       name: 'One',
//       image: require ('../../../img/aodep.png'),
//     },
//     {
//       text: 'Card One',
//       name: 'two',
//       image: require ('../../../img/aodep.png'),
//     },
//     {
//       text: 'Card One',
//       name: 'three',
//       image: require ('../../../img/aodep.png'),
//     },
//   ];
//   return (
//     <View style={styles.container}>
//       <Header
//         navigation={navigation}
//         title="Quản lý đăng bài"
//         rightIcon={true}
//         background="#85827A"
//         rightNameIcon="person-circle-outline"
//         //onClickLeft={() => navigation.goBack ()}
//         //onClickRight={() => navigation.navigate ('Person')}
//       />
//       <Container style={{backgroundColor:'gray'}}>
//         <View>
//           <DeckSwiper
//             dataSource={cards}
//             renderItem={item => (
//               <Card>
//                 <CardItem>
//                   <Left>
//                     <Thumbnail source={item.image} />
//                     <Body>
//                       <Text>{item.text}</Text>
//                       <Text note>NativeBase</Text>
//                     </Body>
//                   </Left>
//                 </CardItem>
//                 <CardItem>
//                   <Image
//                     style={{width: 300, height: 300, resizeMode: 'stretch'}}
//                     source={item.image}
//                   />
//                 </CardItem>
//                 <CardItem>
//                   <Icon name="heart" style={{color: '#ED4A6A'}} />
//                   <Text>{item.name}</Text>
//                 </CardItem>
//               </Card>
//             )}
//           />
//         </View>
//       </Container>

//     </View>
//   );
// }
