import {StyleSheet, Dimensions} from 'react-native';
import {scale} from 'react-native-size-matters';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: '#D6D3D3',
  },
  head: {height: 60, backgroundColor: '#f1f8ff'},
  text: { textAlign: 'center'},
  dataWrapper: {marginTop: -1},
  row: {height: 40, backgroundColor: '#E7E6E1'},
  row1: {height: 40, flexDirection: 'row', backgroundColor: '#FFF1C1'},
  btn: {width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2},
  btnText: {textAlign: 'center', color: '#fff'},
  title: {flex: 1, backgroundColor: '#f6f8fa'},
  wrapper: {flexDirection: 'row'},
  buttonDay: {
    minWidth: scale(50),
    minHeight: scale(30),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
    paddingHorizontal: 5,
    borderRadius: 10,
    paddingVertical: 10,
  },
  viewChoseDay: {
    marginHorizontal: 0,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: scale(5),
    paddingHorizontal: 10,
  },
  viewStatistic: {
    marginHorizontal: 10,
    minHeight: 300,
    backgroundColor: '#fff',
    marginVertical: 50,
    padding: 30,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  fontA: {fontSize: 26, fontWeight: 'bold', color: 'red'},
  fontB: {fontSize: 20, fontWeight: 'bold'},
  fontC: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#0084FF',
    color: '#fff',
  },
  flex1: {
    flex: 1,
  },
});
export default styles;
