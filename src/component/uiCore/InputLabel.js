import React, {useState, useImperativeHandle, forwardRef, useRef} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native'
import {TextCore, ViewCore} from './index'
const InputLabel = (
  {
    hideEye,
    rightTouch,
    checkTestValidate,
    rightTouchButon,
    textTouch,
    valueInit,
    backgroundColor = '#fff',
    color = '#000',
    style,
    height = 60,
    placeholder,
    ...res
  },
  ref,
) => {
  const [value, setValue] = useState(valueInit)
  const [showPass, setShowPass] = useState(hideEye)
  const refInput = useRef()
  useImperativeHandle(ref, () => ({
    getValue () {
      if (isEmpty(value)) return ''
      return value
    },
    focus () {
      setValue('')
    },
  }))
  const handleHidePass = () => {
    return setShowPass(!showPass)
  }
  const [message, setMessage] = useState('')
  const checkValue = async e => {
    if (!checkTestValidate) return null //(typeof value === 'bool')
    return setMessage(checkTestValidate(e))
  }
  const handleChangeText = e => {
    checkValue(e)
    setValue(e)
  }
  return (
    <ViewCore marginBottom={5}>
      {!isEmpty(value) && (
        <TextCore
          style={{position: 'absolute', zIndex: 5, top: 5, left: 10}}
          color='gray'
          size={12}>
          {placeholder}
        </TextCore>
      )}
      <TextInput
        ref={refInput}
        value={value}
        style={[
          styles.rowInput,
          {
            height: height,
            borderWidth: 1,
            borderColor: '#00370091',
            backgroundColor: backgroundColor,
            color: color,
          },
          style,
        ]}
        secureTextEntry={showPass}
        onChangeText={e => handleChangeText(e)}
        placeholder={placeholder}
        {...res}
      />
    </ViewCore>
  )
}

export default forwardRef(InputLabel)
import PropTypes from 'prop-types'
import {isEmpty} from 'underscore'

InputLabel.defaultProps = {
  rightTouch: false,
  hideEye: false,
  checkTestValidate: null,
  rightTouchButon: null,
  textTouch: 'text',
  height: 60,
}
InputLabel.propTypes = {
  rightTouch: PropTypes.bool,
}
const styles = StyleSheet.create({
  rowInput: {
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: 'center',
    borderRadius: 5,
  },
  viewTooltips: {
    minWidth: 100,
    minHeight: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: 2,
    right: 2,
    paddingHorizontal: 5,
  },
  imageEye: {
    width: 30,
    height: 20,
    resizeMode: 'contain',
  },
  viewEye: {
    width: 30,
    height: 20,
    resizeMode: 'contain',
    position: 'absolute',
    right: 15,
    top: 15,
  },
  viewEye1: {
    minHeight: 15,
    resizeMode: 'contain',
    position: 'absolute',
    right: 25,
    top: 15,
  },
  textCheck: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 12,
  },
})
