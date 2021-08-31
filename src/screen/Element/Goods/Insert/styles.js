import {StyleSheet} from 'react-native'
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    viewInput: {
      marginHorizontal: 10,
      marginVertical: 5,
      minHeight: 30,
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    textInput: {
      paddingHorizontal: 5,
      maxWidth: 270,
      minHeight: 30,
    },
    btnImg: {
      height: 30,
      backgroundColor: 'red',
      margin: 5,
      padding: 5,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      backgroundColor: '#4C94E7',
    },
  
    rowSize: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
      borderBottomWidth: 1,
      backgroundColor: '#fff',
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    viewRowsImage:{
        marginHorizontal: 10,
        minHeight: 50,
        backgroundColor: 'gray',
        marginVertical: 10,
        borderRadius: 10,
        padding: 10,
      },
      viewRow:{
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      itemDelete:{
        width: 100,
        height: 40,
        margin: 10,
        padding: 5,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
      },
      itemImg100:{
        width: 100,
        height: 100,
        resizeMode: 'stretch',
      },
      loaiSp:{
            marginHorizontal: 10,
            marginVertical: 10,
            minHeight: 50,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ff0',
            borderBottomWidth: 1,
          }
  });
  export default styles;