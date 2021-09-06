import {ToastAndroid, Alert} from 'react-native';
export const ToastAndroidShort = msg => {
  ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
};
export function ToastAndroidLong(msg) {
  ToastAndroid.showWithGravity(msg, ToastAndroid.LONG, ToastAndroid.CENTER);
}
export const alertMsg = message => {
  Alert.alert(
    '',
    message,
    [
      {
        text: 'Ok',
        style: 'cancel',
      },
    ],
    {cancelable: false},
  );
};
export const AlertFull = (msg1, msg2, onClick) => {
  Alert.alert(msg1, msg2, [
    {
      text: 'Hủy',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'Đồng ý', onPress: () => onClick},
  ]);
};
export const AlertBasic = (msg1, msg2, onClick) => {
  Alert.alert(msg1, msg2, [
    {
      text: 'Hủy',
      onPress: () =>{},
      style: 'cancel',
    },
    {text: 'Đồng ý', onPress: onClick},
  ]);
};
