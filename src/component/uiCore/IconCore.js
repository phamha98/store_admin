import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Feather from 'react-native-vector-icons/Feather'
export default function IconCore ({
  name,
  size,
  color,
  type,
  onPress,
  style,
  ...rest
}) {
  if (type === 'FEA')
    return (
      <Feather
        name={name}
        size={size}
        color={color}
        onPress={onPress}
        style={[style, {...rest}]}
      />
    )
  if (type === 'ION')
    return (
      <Ionicons
        name={name}
        size={size}
        color={color}
        onPress={onPress}
        style={[style, {...rest}]}
      />
    )
  if (type === 'EVI')
    return (
      <EvilIcons
        name={name}
        size={size}
        color={color}
        onPress={onPress}
        style={[style, {...rest}]}
      />
    )
  if (type === 'FON')
    return (
      <FontAwesome
        name={name}
        size={size}
        color={color}
        onPress={onPress}
        style={[style, {...rest}]}
      />
    )
  if (type === 'FON5')
    return (
      <FontAwesome5
        name={name}
        size={size}
        color={color}
        onPress={onPress}
        style={[style, {...rest}]}
      />
    )

  if (type === 'MATC')
    return (
      <MaterialCommunityIcons
        name={name}
        size={size}
        color={color}
        onPress={onPress}
        style={[style, {...rest}]}
      />
    )
  if (type === 'MAT')
    return (
      <MaterialIcons
        name={name}
        size={size}
        color={color}
        onPress={onPress}
        style={[style, {...rest}]}
      />
    )
  if (type === 'ENT')
    return (
      <Entypo
        name={name}
        size={size}
        color={color}
        onPress={onPress}
        style={[style, {...rest}]}
      />
    )
  if (type === 'ANT')
    return (
      <AntDesign
        name={name}
        size={size}
        color={color}
        onPress={onPress}
        style={[style, {...rest}]}
      />
    )
  if (type === 'SIM')
    return (
      <SimpleLineIcons
        name={name}
        size={size}
        color={color}
        onPress={onPress}
        style={[style, {...rest}]}
      />
    )
}

IconCore.defaultProps = {
  type: 'ION',
  size: 14,
  name: 'home',
  color: '#000',
  onPress: null,
}
const styles = StyleSheet.create({})
