import {StyleSheet,Dimensions,} from 'react-native';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      backgroundColor: '#FFFFFFAB',
      marginHorizontal: 20,
      minHeight: 400,
      marginTop: 100,
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      paddingTop: 70,
    },
    imgAvatar: {
      backgroundColor: 'red',
      position: 'absolute',
      top: -50,
      left: (width - 40) / 2 - 50,
      borderRadius: 25,
      overflow: 'visible',
    },
    viewChildren: {
      width: '100%',
      minHeight: 20,
      borderBottomWidth: 0.2,
    },
    logout: {
      height: 40,
      width: 200,
      marginTop: 80,
      borderRadius: 10,
      backgroundColor: '#406C81',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      margin:10
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });
  export default styles;