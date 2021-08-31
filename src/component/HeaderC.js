import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableHighlight,
} from 'react-native'
import {Badge, withBadge} from 'react-native-elements'
import {IconCore, ViewCore, Light} from '@component'
import {useNavigation} from '@react-navigation/native'
import {navigate, goBack} from '@navigation'
export default function HeaderC ({
  colorLeftIcon,
  colorRightIcon,
  background,
  title,
  rightIcon,
  rightNameIcon,
  leftIcon,
  leftNameIcon,
  onClickLeft,
  onClickRight,
  badge,
  typeIconRight,
  ...rest
}) {
  return (
    <View style={[styles.container, {backgroundColor: background, ...rest}]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          alignItems: 'center',
          paddingRight: 20,
        }}>
        {leftIcon && (
          <TouchableOpacity
            onPress={onClickLeft ? onClickLeft : () => goBack()}>
            <IconCore name={leftNameIcon} size={30} color={colorLeftIcon} />
          </TouchableOpacity>
        )}
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            maxWidth: 300,
            color: '#fff',
          }}
          numberOfLines={1}>
          {title}
        </Text>
        {rightIcon && (
          <TouchableOpacity onPress={onClickRight ? onClickRight : () => {}}>
            <IconCore
              type={typeIconRight}
              name={rightNameIcon}
              size={30}
              color={colorRightIcon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
HeaderC.defaultProps = {
  colorRightIcon: '#fff',
  colorLeftIcon: '#fff',
  background: '#3887ff',
  title: 'Title',
  rightIcon: true,
  leftIcon: true,
  rightNameIcon: 'sync-outline',
  leftNameIcon: 'arrow-back-outline',
  badge: true,
  typeIconRight: 'ION',
}
const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: 'center',
    borderColor: '#9E9D9D',
  },
})
