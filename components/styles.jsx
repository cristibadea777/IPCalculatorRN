import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    container_principal: {
      flex: 1,
      backgroundColor: '#232B2B',
    },
  
    container_row:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  
    text:{
      fontSize: 20,
      color: 'cyan',
      textAlign: 'left',
      padding: 7
    },
  
    text_center:{
      fontSize: 20,
      color: 'white',
      textAlign: 'center',
      width: '55%',
    },
  
  
  
    text_input:{
      backgroundColor: 'white',
      width: '55%',
      fontSize: 20,
      color: 'white',
      textAlign: 'center',
      backgroundColor: '#232B2B',
      color: 'white',
      borderBottomWidth: 1,
      borderBottomColor: 'cyan',
    },
  
  
  });
  export default styles