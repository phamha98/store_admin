import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#666560'},
  viewItem: {
    marginHorizontal: 5,
    marginVertical: 5,
    minHeight: 100,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#A5B48A',
  },
  content: {
    padding: 10,
  },
  rowItem: {
    minHeight: 30,
    backgroundColor: '#fff',
    marginVertical: 2,
    flexDirection: 'row',
    padding: 5,
    borderRadius: 5,
    borderBottomWidth: 0.2,
    marginHorizontal: 0,
  },
  viewModal: {
    marginHorizontal: 20,
    height: 600,
    backgroundColor: 'gray',
    padding: 10,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#fff',
    borderTopWidth: 10,
    borderTopColor: '#0075FA',
  },
  viewChose: {
    marginHorizontal: 0,

    backgroundColor: '#FFB570',
    padding: 5,
    paddingBottom: 30,
    alignItems: 'center',
  },
  textInput: {
    width: 280,
    paddingHorizontal: 10,
    minHeight: 30,
    backgroundColor: '#fff',
  },
  rowPerson: {
    marginHorizontal: 10,
    minHeight: 60,
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
   },
  buttonAdd: {
    position: 'absolute',
    right: 3,
    top: 20,
    width: 30,
    height: 30,
    backgroundColor: 'yellow',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default styles;
