import React,{useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from '../screen';
import { ShowUser } from '../screen';
import {
  HomeOrder,
  ListOrder,
  SearchOrder,
  StateOrder,
  BillDetails,
  HomeGoods,
  ShowGoods,
  SearchGoods,
  InsertGoods,
  UpdateGoods,
  InsertTypeGoods,
  ShowGoodAll,
  ShowGoodMainDetails,
  ShowGoodDetails,
  Statistical_home,
  StatisticBills,
  StatisticProduct,
  StatisticCustomer,
  CustomerHome,
  Staff,
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
  SettingInfo
} from '../screen';
import Drawer from './Drawer';
const Stack1 = createStackNavigator();
import { navigationRef ,isReadyRef} from './rootNavigation';
export default function Stack() {

  return (
    <NavigationContainer
      ref={navigationRef}
    >
      <Stack1.Navigator
        initialRouteName="Login" //*
        screenOptions={{ headerShown: false }}>
        <Stack1.Screen name="Login" component={Login} />
        <Stack1.Screen name="Drawer" component={Drawer} />
        <Stack1.Screen name="HomeOrder" component={HomeOrder} />
        <Stack1.Screen name="ListOrder" component={ListOrder} />
        <Stack1.Screen name="SearchOrder" component={SearchOrder} />
        <Stack1.Screen name="StateOrder" component={StateOrder} />
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
        <Stack1.Screen name="Statistical" component={Statistical_home} />
        <Stack1.Screen name="StatisticBills" component={StatisticBills} />
        <Stack1.Screen name="StatisticCustomer" component={StatisticCustomer} />
        <Stack1.Screen name="StatisticProduct" component={StatisticProduct} />
        <Stack1.Screen name="CustomerHome" component={CustomerHome} />
        <Stack1.Screen name="Staff" component={Staff} />
        <Stack1.Screen name="HomePermission" component={HomePermission} />
        <Stack1.Screen name="ListPermission" component={ListPermission} />
        <Stack1.Screen name="ShowPermission" component={ShowPermission} />
        <Stack1.Screen name="ListUserRole" component={ListUserRole} />
        <Stack1.Screen name="AddGroup" component={AddGroup} />
        <Stack1.Screen name="ChangePermission" component={ChangePermission} />
        <Stack1.Screen name="HomePost" component={HomePost} />
        <Stack1.Screen name="ListPost" component={ListPost} />
        <Stack1.Screen name="InsertPost" component={InsertPost} />
        <Stack1.Screen name="SettingInfo" component={SettingInfo} />
      </Stack1.Navigator>
    </NavigationContainer>
  );
}
