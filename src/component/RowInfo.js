import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import {Button, ListItem, Icon, Left, Body, Right, Fab} from 'native-base'
import {Avatar} from 'react-native-elements'
import { IconCore } from '@component'
export default function RowInfo2 ({
  title,
  titleRight,
  onPress,
  iconRight,
  backgroundColor,
  iconLeft,
  type,
  left,
  sourceAvatar,
  ...rest
}) {
  const CPMLeft = () => {
    if (!left)
      return (
        <Button onPress={onPress} style={{backgroundColor: backgroundColor}}>
          <Icon active type={type} name={iconLeft} />
        </Button>
      )
    return (
      <Avatar
        size='small'
        title='LW'
        activeOpacity={0.7}
        rounded
        source={sourceAvatar}
      />
    )
  }
  return (
    <View style={{...rest}}>
      <ListItem icon>
        <Left>
          <CPMLeft />
        </Left>
        <Body>
          <TouchableOpacity onPress={onPress}>
            <Text>{title}</Text>
          </TouchableOpacity>
        </Body>
        <Right>
          <Text>{titleRight}</Text>
          <Icon onPress={onPress} active name={iconRight} />
        </Right>
      </ListItem>
    </View>
  )
}
RowInfo2.defaultProps = {
  type: 'FontAwesome5',
  left: false,
  sourceAvatar: require('@image/avatar.jpeg'),
}
const styles = StyleSheet.create({})
