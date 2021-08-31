import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {flex: 1},
  containerItem: {
    marginHorizontal: 20,
    marginVertical: 8,
    minHeight: 60,
    borderWidth: 0.5,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  rowName: {
    flexDirection: 'row',
    marginVertical: 8,
    borderBottomWidth: 0.2,
    borderTopWidth: 0.2,
    minHeight: 40,
    alignItems: 'center',
  },
  fontW: {color: 'red', fontWeight: 'bold'},
});
export default styles;
