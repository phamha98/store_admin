import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  box1: {
    marginHorizontal: 30,
    marginVertical: 8,
    height: 100,
    backgroundColor: '#BEC0B9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  box: {
    marginHorizontal: 60,
    marginVertical: 8,
    height: 50,
    backgroundColor: '#509601',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    padding: 10,
  },
  text: {
    fontSize: 18,
    color: 'blue',
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#D0CACA',
  },
  content: {
    marginHorizontal: 10,
  },
  textInput: {
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  textareaContainer: {
    height: 180,
    padding: 5,
    backgroundColor: '#F5FCFF',
    borderRadius: 4,
    overflow: 'hidden',
  },
  textarea: {
    textAlignVertical: 'top', // hack android
    height: 170,
    fontSize: 14,
    color: '#333',
  },
  textTitle: {
    textAlignVertical: 'top', // hack android
    height: 100,
    fontSize: 20,
    color: 'blue',
    fontWeight:'bold'
  },

  button: {
    marginTop: 20,
    marginHorizontal: 50,
    minHeight: 50,
    backgroundColor: '#54AF29',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textW: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFEE00',
  },
  viewImage: {
    marginHorizontal: 50,
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: '#B6B6B6',
  },
  rowSheet: {
    marginHorizontal: 80,
    height: 50,
    backgroundColor: '#00CCFF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    flexDirection: 'row',
  },
  viewChose: {
    marginHorizontal: 0,
    minHeight: 500,
    backgroundColor: '#FFB570',
    padding: 5,
  },
})
export default styles
