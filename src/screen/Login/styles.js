import {StyleSheet} from 'react-native'
const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    backgroundColor: '#0B193F',
  },
  img: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginVertical: 5,
    marginTop: 30,
  },
  textInput: {
    height: 50,
    width: 300,
    color: 'gray',
    fontSize: 20,
    paddingLeft: 30,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#05A3FF',
    marginVertical: 8,
  },
  buttonLogin: {
    height: 50,
    width: 300,
    marginVertical: 15,
    borderRadius: 25,
    backgroundColor: '#0E95D4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textForgot: {
    paddingLeft: 180,
  },
  signup: {
    marginVertical: 5,
  },
  textInput1: {
    height: 50,
    width: 300,
    color: 'gray',
    fontSize: 20,
    paddingLeft: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#05A3FF',
    marginVertical: 8,
    backgroundColor: '#0B193F',
  },
  buttonLogin1: {
    height: 60,
    width: 300,
    marginVertical: 15,
    borderRadius: 10,
    backgroundColor: '#0E95D4',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default styles;