import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TextInput, View} from 'react-native';
import { RadioButton } from 'react-native-paper';

export default function App() {


  const [checked, setChecked] = React.useState('DEC');
  //checked facut in if intr-un useEffect cand se schimba checked si cand se apasa pe butonu de calcul

  return (    

    <View style={styles.container_principal}>

      <StatusBar style="auto"> </StatusBar>

      <View style={ [ styles.container_row, {backgroundColor: '#1e1e1e'} ]}>
        <Text style={ [ styles.text, {fontSize: 33} ] }>Input</Text>
      </View>
      <View style={ [ styles.container_row, {} ]}>
        <Text style={ [ styles.text, {} ] }>IP Adress</Text>
        <TextInput keyboardType='numeric' style={ [ styles.text_input, {} ] }>192.168.0.0</TextInput>
      </View>
      <View style={ [ styles.container_row, {marginTop: 7} ]}>
        <Text style={ [ styles.text, {} ] }>SM Bits</Text>
        <TextInput style={ [ styles.text_input, {} ] }>DDL sm bits</TextInput>
      </View>
      <View style={ [ styles.container_row, {marginTop: 7} ]}>
        <Text style={ [ styles.text, {} ] }>Subnet Mask </Text>
        <TextInput style={ [ styles.text_input, {} ] }>DDL subnetmask</TextInput>
      </View>


      <View style={ [ styles.container_row, {backgroundColor: '#1e1e1e'} ]}>
        <Text style={ [ styles.text, {fontSize: 33} ] }>Details</Text>
      </View>      
      <View style={ [ styles.container_row, {} ] }>
        <View style={{flexDirection: 'column', width: '40%'}}>
          <View style={ [ styles.container_row, {} ]}>
            <Text style={styles.text}>IP Class     </Text>
            <Text style={ [ styles.text_center, {} ] }>ABC</Text>
          </View>
          <View style={ [ styles.container_row, {} ]}>
            <Text style={styles.text}>Subnets    </Text>
            <Text style={ [ styles.text_center, {} ] }>000</Text>
          </View>
          <View style={ [ styles.container_row, {} ]}>
            <Text style={styles.text}>Hosts/SN</Text>
            <Text style={ [ styles.text_center, {} ] }>16,777,214</Text>
          </View>
        </View>
        <View style={{flexDirection: 'column', width: '60%' }}>
          <View style={ [ styles.container_row, {} ]}>
            <Text style={styles.text}> Host Min </Text>
            <Text style={ [ styles.text_center, {} ] }>192.192.192.192</Text>
          </View>
          <View style={ [ styles.container_row, {} ]}>
            <Text style={styles.text}> Host Max </Text>
            <Text style={ [ styles.text_center, {} ] }>192.192.192.192</Text>
          </View>
          <View style={{flex: 1}}></View>
        </View>
      </View>

      <View style={ [ styles.container_row, {backgroundColor: '#1e1e1e'} ]}>
            <Text style={ [ styles.text, {fontSize: 33} ] }>Notations</Text>
      </View>
      <View style={[styles.container_row, {}]}>
        <View style={{flexDirection: 'row'}}>
          <RadioButton
            value="DEC"
            status={ checked === 'DEC' ? 'checked' : 'unchecked' }
            onPress={() => setChecked('DEC')}
            color='white'
          />
          <Text style={styles.text}>DEC</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <RadioButton
            value="HEX"
            status={ checked === 'HEX' ? 'checked' : 'unchecked' }
            onPress={() => setChecked('HEX')}
            color='white'
          />
          <Text style={styles.text}>HEX</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <RadioButton
            value="BIN"
            status={ checked === 'BIN' ? 'checked' : 'unchecked' }
            onPress={() => setChecked('BIN')}
            color='white'
          />
          <Text style={styles.text}>BIN</Text>
        </View>
      </View>
      <View style={ [ styles.container_row, {} ]}>
        <Text style={styles.text}> Adresa IPv4 </Text>
        <Text style={ [ styles.text_center, {} ] }>...</Text>
      </View>
      <View style={ [ styles.container_row, {} ]}>
        <Text style={styles.text}> Subnet Mask </Text>
        <Text style={ [ styles.text_center, {} ] }>...</Text>
      </View>
      <View style={ [ styles.container_row, {} ]}>
        <Text style={styles.text}> IP Range </Text>
        <Text style={ [ styles.text_center, {} ] }>...</Text>
      </View>
      <View style={ [ styles.container_row, {} ]}>
        <Text style={styles.text}> Broadcast </Text>
        <Text style={ [ styles.text_center, {} ] }>...</Text>
      </View>

      <View style={ [ styles.container_row, {backgroundColor: '#1e1e1e'} ]}>
        <Text style={ [ styles.text, {fontSize: 33} ] }>Subnets table</Text>
      </View>
      
      <View style={ [ styles.container_row, {backgroundColor: '#1e1e1e', justifyContent: 'space-around'} ]}>
        <Text style={ [ styles.text, {fontSize: 24} ] }>Network</Text>
        <Text style={ [ styles.text, {fontSize: 24} ] }>First Host</Text>
        <Text style={ [ styles.text, {fontSize: 24} ] }>Last Host</Text>
        <Text style={ [ styles.text, {fontSize: 24} ] }>Broadcast</Text>
      </View>

      <ScrollView>
        <View style={ [ styles.container_row, {backgroundColor: '#1e1e1e', justifyContent: 'space-around'} ]}>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
        </View>
        <View style={ [ styles.container_row, {backgroundColor: '#1e1e1e', justifyContent: 'space-around'} ]}>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
        </View>
        <View style={ [ styles.container_row, {backgroundColor: '#1e1e1e', justifyContent: 'space-around'} ]}>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
        </View>
        <View style={ [ styles.container_row, {backgroundColor: '#1e1e1e', justifyContent: 'space-around'} ]}>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
        </View>
        <View style={ [ styles.container_row, {backgroundColor: '#1e1e1e', justifyContent: 'space-around'} ]}>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
        </View>
        <View style={ [ styles.container_row, {backgroundColor: '#1e1e1e', justifyContent: 'space-around'} ]}>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
        </View>
        <View style={ [ styles.container_row, {backgroundColor: '#1e1e1e', justifyContent: 'space-around'} ]}>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
        </View>
        <View style={ [ styles.container_row, {backgroundColor: '#1e1e1e', justifyContent: 'space-around'} ]}>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
        </View>
        <View style={ [ styles.container_row, {backgroundColor: '#1e1e1e', justifyContent: 'space-around'} ]}>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
        </View>
        <View style={ [ styles.container_row, {backgroundColor: '#1e1e1e', justifyContent: 'space-around'} ]}>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
        </View>
        <View style={ [ styles.container_row, {backgroundColor: '#1e1e1e', justifyContent: 'space-around'} ]}>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
        </View>
        <View style={ [ styles.container_row, {backgroundColor: '#1e1e1e', justifyContent: 'space-around'} ]}>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
        </View>
        <View style={ [ styles.container_row, {backgroundColor: '#1e1e1e', justifyContent: 'space-around'} ]}>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
        </View>
        <View style={ [ styles.container_row, {backgroundColor: '#1e1e1e', justifyContent: 'space-around'} ]}>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
        </View>
        <View style={ [ styles.container_row, {backgroundColor: '#1e1e1e', justifyContent: 'space-around'} ]}>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
          <Text style={ [ styles.text_center, {fontSize: 12} ] }>192.192.192.192</Text>
        </View>
      </ScrollView>

      
      

    </View>     
       
  );

}

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
    color: 'black',
    textAlign: 'center',
    backgroundColor: '#232B2B',
    color: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'cyan',
  },

});
