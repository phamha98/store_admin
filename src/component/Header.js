import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function Header({
  navigation,
  colorIcon,
  background,
  title,
  rightIcon,
  rightNameIcon,
  leftIcon,
  leftNameIcon,
  onClickLeft,
  onClickRight,
}) {
  return (
    <View style={[styles.container, {backgroundColor: background}]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          alignItems: 'center',
        }}>
        {leftIcon && (
          <TouchableOpacity onPress={onClickLeft}>
            <Ionicons name={leftNameIcon} size={30} color={colorIcon} />
          </TouchableOpacity>
        )}
        <Text style={{fontSize: 18, position: 'absolute', left: 50,color:'#fff'}}>
          {title}
        </Text>
        {rightIcon && (
          <TouchableOpacity onPress={onClickRight}>
            <Ionicons name={rightNameIcon} size={25} color={colorIcon} />
          </TouchableOpacity>
        )}
      </View>
    </View>              
  );
}
Header.defaultProps = {
  colorIcon: '#fff',
  background: '#fff',
  title: 'Title',
  rightIcon: false,
  leftIcon: true,
  rightNameIcon: 'chatbubble-ellipses',
  leftNameIcon: 'chevron-back-outline',
};
const styles = StyleSheet.create({
  container: {
    height: 50,
    marginHorizontal:2,
    flexDirection: 'column',
    justifyContent: 'center',

    borderBottomRightRadius:5,
    borderBottomLeftRadius:5,

  },
});
