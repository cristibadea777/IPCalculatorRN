import React, { useEffect, useRef } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TextInput, View} from 'react-native';
import { RadioButton } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';

export default function App() {


  const [checked, setChecked] = React.useState('DEC');
  //checked facut in if intr-un useEffect cand se schimba checked si cand se apasa pe butonu de calcul

  const [adresaIP, setAdresaIP] = React.useState('192.168.0.0')

  const [culoareAdresaValida, setCuloareAdresaValida] = React.useState('yellow')

  const [bitiHost, setBitiHost] = React.useState('24')



  const handleChangeInputAdresaIP = (valoare) => {
    setAdresaIP(valoare)
  }

  const [selectedSMcidr, setSelectedSMcidr] = React.useState("8");
  const [selectedSM, setSelectedSM] = React.useState("255.255.255.255");

  const dataSM = 
  [ 
    '255.0.0.0','255.128.0.0','255.192.0.0','255.224.0.0','255.240.0.0','255.248.0.0','255.252.0.0','255.254.0.0','255.255.0.0',
    '255.255.128.0','255.255.192.0','255.255.224.0','255.255.240.0','255.255.248.0','255.255.252.0','255.255.254.0',
    '255.255.255.0','255.255.255.128','255.255.255.192','255.255.255.224','255.255.255.240','255.255.255.248','255.255.255.252',
  ]

  const dataCIDR = 
  [
    '/8', '/9', '/10', '/11', '/12', '/13', '/14', '/15', '/16', '/17', '/18', '/19', '/20', '/21', '/22', '/23', '/24', '/25', '/26', '/27', '/28', '/29', '/30'
  ]

  //host bits =  (32 - nr de biti ai SM)
  //nr_hosturi = (2 la puterea  host bits) - 2 //-2 pt ca nu utilizam prima si ultima adresa care e broadcastul


  /* Check if string is IP */
  function checkIfValidIP(str) {
    //expresie regex pt a determina daca string-ul este o adresa IP valida
    //string de format nr.nr.nr.nr unde fiecare numar poate fi intre 0 si 255
    const regexExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
    return regexExp.test(str);
  }

  useEffect( () => 
    {

      if(checkIfValidIP(adresaIP)){
        setCuloareAdresaValida('cyan')
        //setare valori ptr restul textelor bazat pe adresa IP primita
      }
      else{
        setCuloareAdresaValida('red')
        //setare goale
      }


    }, [adresaIP] //adaugat si subnetmask

  )

  useEffect( ()=>
    {

      console.log(bitiHost)
    }, [bitiHost]
  )


  const dropdownSMRef = useRef()
  const dropdownCIDR = useRef()

  return (    

    <View style={styles.container_principal}>

      <StatusBar style="auto"> </StatusBar>

      <View style={ [ styles.container_row, {backgroundColor: '#1e1e1e'} ]}>
        <Text style={ [ styles.text, {fontSize: 33} ] }>Input</Text>
      </View>
      <View style={ [ styles.container_row, {} ]}>
        <Text style={ [ styles.text, {} ] }>IP Adress</Text>
        <TextInput 
          keyboardType='numeric' 
          style={ [ styles.text_input, {borderBottomColor: culoareAdresaValida } ] }
          onChangeText={handleChangeInputAdresaIP}
          value={adresaIP}
        >
        </TextInput>
      </View>
      <View style={ [ styles.container_row, {marginTop: 7} ]}>
        <Text style={ [ styles.text, {} ] }>Subnet Mask</Text>
        <SelectDropdown
          data={dataSM}
          ref={dropdownSMRef}
          defaultValueByIndex={0}
          onSelect=
          { (selectedItem, index) => 
              {
                //console.log(selectedItem, index)
                dropdownCIDR.current.selectIndex(index) 
                setBitiHost(dataCIDR[index].replace(/^./, ""))
              }
          }
          buttonStyle={[styles.text_input, {}]}
          buttonTextStyle={{ fontSize: 20, color: 'white'}}
          rowStyle={{backgroundColor: '#1e1e1e'}}
          rowTextStyle={{color: 'white', fontSize: 20}}
        />
      </View>
      <View style={ [ styles.container_row, {marginTop: 7} ]}>
        <Text style={ [ styles.text, {} ] }>CIDR</Text>
        <SelectDropdown
          ref={dropdownCIDR}
          data={dataCIDR}
          defaultValueByIndex={0}
          onSelect=
          { (selectedItem, index) => 
              {
                dropdownSMRef.current.selectIndex(index) 
                setBitiHost(dataCIDR[index].replace(/^./, ""))
              }
          }
          buttonStyle={[styles.text_input, {}]}
          buttonTextStyle={{ fontSize: 20, color: 'white'}}
          rowStyle={{backgroundColor: '#1e1e1e'}}
          rowTextStyle={{color: 'white', fontSize: 20}}
        />
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
            <Text style={styles.text}>Hosts</Text>
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
      <View style={[styles.container_row, {padding: 8}]}>
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
    color: 'white',
    textAlign: 'center',
    backgroundColor: '#232B2B',
    color: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'cyan',
  },

});
