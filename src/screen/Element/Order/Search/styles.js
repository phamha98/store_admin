import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    filter: {
      marginHorizontal: 20,
      marginVertical: 5,
      height: 60,
      backgroundColor: '#fff',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      justifyContent: 'space-between',
    },
    textInput: {
      marginHorizontal: 10,
      marginVertical: 5,
      backgroundColor: '#C0E7C0',
      paddingHorizontal: 10,
      fontSize: 20,
      borderRadius: 10
    },
    content: {
      marginHorizontal: 10,
      backgroundColor: 'gray',
      minHeight: 100,
      borderRadius: 10,
      padding: 10
    },
    billUser: {
      marginHorizontal: 10,
      minHeight: 200,
      
      borderRadius: 10,
       
      marginBottom: 100
    },
    containerItem: {
      marginHorizontal: 20,
      marginVertical: 8,
      minHeight: 60,
      borderWidth: 0.5,
      padding: 10,
      backgroundColor: '#fff',
      borderRadius: 10
    },
    rowName: {
      flexDirection: 'row',
      marginVertical: 8,
      borderBottomWidth: 0.2,
      borderTopWidth: 0.2,
      minHeight: 40,
      alignItems: 'center',
    },
  });
  
export default styles;  