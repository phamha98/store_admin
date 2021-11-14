import React, {useEffect} from 'react'
import {Button, View} from 'react-native'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {Home, Person, EditPerson} from '../screen'

const Drawer1 = createDrawerNavigator()
import RNBootSplash from 'react-native-bootsplash'

export default function Drawer ({navigation}) {
  useEffect(() => {
    RNBootSplash.hide({fade: true})
  }, [])
  return (
    <Drawer1.Navigator initialRouteName='Home'>
      <Drawer1.Screen name='Home' component={Home} />
      <Drawer1.Screen name='Person' component={Person} />
      <Drawer1.Screen name='EditPerson' component={EditPerson} />
    </Drawer1.Navigator>
  )
}
