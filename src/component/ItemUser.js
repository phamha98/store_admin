import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import {
  ViewCore,
  TextCore,
  Light,
  ImageCore,
  ButtonBasic,
  IconCore,
} from '@component'
import {uriImg} from '@utils'
import {navigate} from '@navigation'
export function ItemUser ({item, onPress}) {
  const handleRemove = () => {}
  const handleMove = () => {
    navigate('ShowUser', {data: item})
  }
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <ViewCore
        row
        style={{
          backgroundColor: Light.card,
          marginVertical: 10,
          borderRadius: 6,
          padding: 10,
        }}>
        <ImageCore width={100} height={100} source={uriImg(item.img)} />
        <ViewCore marginLeft={10} style={{flex: 1}}>
          <TextCore>🆔 {item.id}</TextCore>
          <TextCore>👤 {item.name}</TextCore>
          <TextCore>✉️ {item.email}</TextCore>
          {item.phone && <TextCore>📞 {item.phone}</TextCore>}
          {item.address && <TextCore>🗺️ {item.address}</TextCore>}
          {item.birthday && <TextCore>📅 {item.birthday}</TextCore>}
          {item.gender && <TextCore>♂️ {item.gender}</TextCore>}
          {item.role && <TextCore>Chức vụ: </TextCore>}
          {item.role
            ? item.role.map((item, index) => (
                <ViewCore key={index}>
                  <TextCore>{item.display_name}</TextCore>
                </ViewCore>
              ))
            : null}
        </ViewCore>
        <ViewCore spaceBetween>
          {
            <IconCore
              name='close-circle-outline'
              color='red'
              size={30}
              onPress={handleRemove}
            />
          }
          <IconCore
            name='move-outline'
            color='green'
            size={30}
            onPress={handleMove}
          />
        </ViewCore>
      </ViewCore>
    </TouchableOpacity>
  )
}

export function ItemUserPermission ({item, onPress, onRemove}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        backgroundColor: Light.card,
        marginVertical: 10,
        borderRadius: 6,
        padding: 10,
      }}>
      <ViewCore row>
        <ImageCore
          width={100}
          height={100}
          source={item.img ? item.img : require('@image/avatar.jpeg')}
        />
        <ViewCore marginLeft={10} style={{flex: 1}}>
          <TextCore>🆔 {item.id}</TextCore>
          <TextCore>👤 {item.name}</TextCore>
          <TextCore>✉️ {item.email}</TextCore>
          {item.phone && <TextCore>📞 {item.phone}</TextCore>}
          {item.address && <TextCore>🗺️ {item.address}</TextCore>}
          {item.birthday && <TextCore>📅 {item.birthday}</TextCore>}
          {item.gender && <TextCore>♂️ {item.gender}</TextCore>}
          {item.role && <TextCore>Chức vụ: </TextCore>}
          {item.role
            ? item.role.map((item, index) => (
                <ViewCore key={index}>
                  <TextCore>{item.display_name}</TextCore>
                </ViewCore>
              ))
            : null}
        </ViewCore>
      </ViewCore>
      <ViewCore row centerHorizontal>
        <ButtonBasic
          title='Chi tiết'
          height={30}
          backgroundColor={Light.primary}
          onPress={onPress}
        />
        <ButtonBasic
          title='Xóa khỏi nhóm'
          height={30}
          backgroundColor={Light.danger}
          onPress={onRemove}
        />
      </ViewCore>
    </TouchableOpacity>
  )
}
export function ItemUserGroup ({item, onPress}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        backgroundColor: Light.card,
        marginVertical: 10,
        borderRadius: 6,
        padding: 10,
      }}>
      <ViewCore row>
        <ImageCore
          width={100}
          height={100}
          source={item.img ? item.img : require('@image/avatar.jpeg')}
        />
        <ViewCore marginLeft={10} style={{flex: 1}}>
          <TextCore>🆔 ID {item.id}</TextCore>
          <TextCore>👤 {item.name}</TextCore>
          <TextCore>✉️ {item.email}</TextCore>
          {item.phone && <TextCore>📞 {item.phone}</TextCore>}
          {item.address && <TextCore>🗺️ {item.address}</TextCore>}
          {item.birthday && <TextCore>📅 {item.birthday}</TextCore>}
          {item.gender && <TextCore>♂️ {item.gender}</TextCore>}
          {item.role && <TextCore>Chức vụ: </TextCore>}
          {item.role
            ? item.role.map((item, index) => (
                <ViewCore key={index}>
                  <TextCore>{item.display_name}</TextCore>
                </ViewCore>
              ))
            : null}
        </ViewCore>
      </ViewCore>
      <ViewCore row centerHorizontal>
        <ButtonBasic
          title='Thêm'
          height={30}
          backgroundColor={Light.primary}
          onPress={onPress}
        />
      </ViewCore>
    </TouchableOpacity>
  )
}
