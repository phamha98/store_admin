import {ViewCore, TextCore} from './index'
import {isEmpty} from 'underscore'
import React from 'react'
import {isString} from 'underscore'
export default function RowInfo ({
  data = '',
  title = '',
  label = '',
  sizeL,
  styleL,
  ...rest
}) {
  if ((label, sizeL))
    return (
      <ViewCore
        row
        height={40}
        backgroundColor='#E7E3E3'
        justifyContent
        alignItems
        style={{
          borderBottomWidth: 0.3,
          borderBottomColor: 'gray',
          paddingHorizontal: 10,
          borderRadius: 5,

          ...rest,
        }}>
        <TextCore size={sizeL} style={styleL}>
          {label ? (isString(label) ? label : label.toString()) : ''}
        </TextCore>
      </ViewCore>
    )
  if (isEmpty(data.toString()) || isEmpty(title)) return null
  return (
    <ViewCore
      row
      height={40}
      backgroundColor='#E7E3E3'
      centerHorizontal
      style={{
        borderBottomWidth: 0.3,
        borderBottomColor: 'gray',
        paddingHorizontal: 10,
        borderRadius: 5,
        ...rest,
      }}>
      {title && <TextCore size={14}>{title ? title : ''}</TextCore>}
      {data && (
        <TextCore size={14}>
          {data ? (isString(data) ? data : data.toString()) : ''}
        </TextCore>
      )}
    </ViewCore>
  )
}
