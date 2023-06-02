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
      margin: 2,
    },

    container_row_titlu:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: '#1e1e1e'
    },

    text_titlu:{
      fontSize: 25,
      color: 'cyan',
      textAlign: 'center',
      margin: 7,
      padding: 7
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
      width: '70%',
    },

    text_input:{
      backgroundColor: 'white',
      width: '70%',
      fontSize: 20,
      color: 'white',
      textAlign: 'center',
      backgroundColor: '#232B2B',
      color: 'white',
      borderBottomColor: 'black',
    },
  
  
  });
  export default styles