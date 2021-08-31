import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Login} from '../screen';
import {ShowUser} from '../screen';
import {
  HomeOrder,
  ListOrder,
  SearchOrder,
  StateOrder,
  BillDetails,
  MyOrder,
  HomeGoods,
  ShowGoods,
  SearchGoods,
  InsertGoods,
  UpdateGoods,
  InsertTypeGoods,
  ShowGoodAll,
  ShowGoodMainDetails,
  ShowGoodDetails,
  Statistical,
  StatisticBills,
  StatisticChart,
  StatisticCustomer,
  SearchCustomer,
  ListCustomer,
  HomeCustomer,
  HomeStaff,
  ListStaff,
  HomePermission,
  ListPermission,
  ShowPermission,
  ListUserRole,
  AddGroup,
  ChangePermission,
  //
  HomePost,
  ListPost,
  InsertPost,
} from '../screen';
import Drawer from './Drawer';
const Stack1 = createStackNavigator();

export default function Stack() {
  return (
    <NavigationContainer>
      <Stack1.Navigator
        initialRouteName="Login
" //*
        screenOptions={{headerShown: false}}>
        <Stack1.Screen name="Login" component={Login} />
        <Stack1.Screen name="Drawer" component={Drawer} />
        <Stack1.Screen name="HomeOrder" component={HomeOrder} />
        <Stack1.Screen name="ListOrder" component={ListOrder} />
        <Stack1.Screen name="SearchOrder" component={SearchOrder} />
        <Stack1.Screen name="StateOrder" component={StateOrder} />
        <Stack1.Screen name="MyOrder" component={MyOrder} />
        <Stack1.Screen name="HomeGoods" component={HomeGoods} />
        <Stack1.Screen name="ShowGoods" component={ShowGoods} />
        <Stack1.Screen name="ShowGoodAll" component={ShowGoodAll} />
        <Stack1.Screen
          name="ShowGoodMainDetails"
          component={ShowGoodMainDetails}
        />
        <Stack1.Screen name="ShowGoodDetails" component={ShowGoodDetails} />
        <Stack1.Screen name="SearchGoods" component={SearchGoods} />
        <Stack1.Screen name="InsertGoods" component={InsertGoods} />
        <Stack1.Screen name="UpdateGoods" component={UpdateGoods} />
        <Stack1.Screen name="InsertTypeGoods" component={InsertTypeGoods} />
        <Stack1.Screen name="ShowUser" component={ShowUser} />
        <Stack1.Screen name="BillDetails" component={BillDetails} />
        <Stack1.Screen name="Statistical" component={Statistical} />
        <Stack1.Screen name="StatisticBills" component={StatisticBills} />
        <Stack1.Screen name="StatisticCustomer" component={StatisticCustomer} />
        <Stack1.Screen name="StatisticChart" component={StatisticChart} />
        <Stack1.Screen name="HomeCustomer" component={HomeCustomer} />
        <Stack1.Screen name="ListCustomer" component={ListCustomer} />
        <Stack1.Screen name="SearchCustomer" component={SearchCustomer} />
        <Stack1.Screen name="HomeStaff" component={HomeStaff} />
        <Stack1.Screen name="ListStaff" component={ListStaff} />
        <Stack1.Screen name="HomePermission" component={HomePermission} />
        <Stack1.Screen name="ListPermission" component={ListPermission} />
        <Stack1.Screen name="ShowPermission" component={ShowPermission} />
        <Stack1.Screen name="ListUserRole" component={ListUserRole} />
        <Stack1.Screen name="AddGroup" component={AddGroup} />
        <Stack1.Screen name="ChangePermission" component={ChangePermission} />
        <Stack1.Screen name="HomePost" component={HomePost} />
        <Stack1.Screen name="ListPost" component={ListPost} />
        <Stack1.Screen name="InsertPost" component={InsertPost} />
      </Stack1.Navigator>
    </NavigationContainer>
  );
}
