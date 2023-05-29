import React, { useEffect, useRef } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TextInput, View} from 'react-native';
import { RadioButton } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';

export default function App() {

  const [checked, setChecked] = React.useState('DEC');
  const [adresaIP, setAdresaIP]                       = React.useState('192.168.0.0')
  const [culoareAdresaValida, setCuloareAdresaValida] = React.useState('yellow')
  const [bitiNetwork, setBitiNetwork]                       = React.useState('8')
  const [subnetmask, setSubnetmask]                   = React.useState('255.0.0.0')
  const [notatieAdresaIP, setNotatieAdresaIP]         = React.useState('')
  const [notatieSubnetMask, setNotatieSubnetMask]     = React.useState('')
  const [notatieNetwork, setNotatieNetwork]           = React.useState('')
  const [notatieBroadcast, setNotatieBroadcast]       = React.useState('')
  const [numarHosturi, setNumarHosturi]               = React.useState('16,777,214')
  const [clasaIP, setClasaIp]                         = React.useState('C')

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

  function checkIfValidIP(str) {
    //expresie regex pt a determina daca string-ul este o adresa IP valida
    //string de format nr.nr.nr.nr unde fiecare numar poate fi intre 0 si 255
    const regexExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
    return regexExp.test(str);
  }

  //functie convertire adresa IPv4 in binar
  const decToBin = (adresa) =>  
  {
    const octeti = adresa.split('.') //octetii despartiti de '.'
    //luare fiecare octet si convertire in binar
    const octetiBinari = octeti.map(octet => {
      const octetBinar = parseInt(octet, 10).toString(2);
      return '0'.repeat(8 - octetBinar.length) + octetBinar; 
    });
    //Octeti despartiti prin punct pt a forma adresa binara
    const adresaBinara = octetiBinari.join('.')
    return adresaBinara;
  }

  const binToDec = (adresa) => {
    const octetiBinari = adresa.split('.');//octetii despartiti de '.'
    const octetiDecimali = octetiBinari.map(octet => parseInt(octet, 2)) //luare fiecare octet si convertire in decimal prin parseInt
    const adresaDec = octetiDecimali.join('.') //punct intre octeti
    return adresaDec
  }

  const rezolvareNetworkPortion = () => {
    //cate zerouri sau 1-uri vor fi la final stabilim in functie de bitii portiunii de network 
    //bitii de network NU SE SCHIMBA
    //bitilor de network li se adauga zerouri la final pt a afla adresa de Network
    //sau 1-uri pt a afla adresa de broadcast
    adresa = decToBin(adresaIP)
    let adresaCharArray = adresa.split('.')     //impartim string-ul bazat pe caracterul '.'
    adresaCharArray = adresaCharArray.join('')  //renuntam la '.'
    pozitii = 32 - bitiNetwork 
    //se taie ultimele pozitii (nr pozitii = biti host) pt a avea portiunea de network 
    //portiunea bitilor de host SE SCHIMBA
    //portiunea bitilor de network NU SE SCHIMBA
    const networkPortion = adresaCharArray.slice(0, adresaCharArray.length - pozitii)
    return networkPortion
  }


  const rezolvareNetworkSauBroadcast = (nr) => {
    //se adauga 0 sau 1 in functie de cati biti network sunt (cati biti de host sunt ramasi)
    //nr = 0 sau 1
    const networkPortion = rezolvareNetworkPortion()
    let adresaBruta =  networkPortion 
    if(nr === 0)
      adresaBruta = adresaBruta + '0'.repeat(pozitii) 
    else
      adresaBruta = adresaBruta + '1'.repeat(pozitii) 
    let adresa = ''
    for(i = 0; i < adresaBruta.length; i += 8){
      adresa = adresa + adresaBruta.substring(i, i + 8)
      adresa = adresa + '.'
    }
    adresa = adresa.slice(0, -1)//elimin ultimul punct
    return adresa
  }

  const handleChangeInputAdresaIP = (valoare) => {
    setAdresaIP(valoare)
  }

  const setareNotatii = () => {
    if(checked === 'DEC'){
      setNotatieAdresaIP  (adresaIP)
      setNotatieSubnetMask(subnetmask)
      setNotatieNetwork   ( binToDec( rezolvareNetworkSauBroadcast(0) ) )
      setNotatieBroadcast ( binToDec( rezolvareNetworkSauBroadcast(1) ) )
    }
    if(checked === 'BIN'){
      setNotatieAdresaIP  (decToBin(adresaIP))
      setNotatieSubnetMask(decToBin(subnetmask))
      setNotatieNetwork   (rezolvareNetworkSauBroadcast(0))
      setNotatieBroadcast (rezolvareNetworkSauBroadcast(1))
    }

  }

  const setareNotatiiGoale = () => {
    setNotatieAdresaIP('')
    setNotatieSubnetMask('')
    setNotatieNetwork('')
    setNotatieBroadcast('')
  }

  const setareClasa = () => {
    const primul_octet = adresaIP.split('.')[0]
    if(primul_octet >= 0 && primul_octet <= 127)
      setClasaIp('A')
    if(primul_octet >= 128 && primul_octet <= 191)
      setClasaIp('B')
    if(primul_octet >= 192 && primul_octet <= 223)
      setClasaIp('C')
    if(primul_octet >= 224 && primul_octet <= 239)
      setClasaIp('D')
    if(primul_octet >= 240 && primul_octet <= 255)
      setClasaIp('E')
  }

  useEffect( () => 
   {
    if(checked === 'DEC'){
      setNotatieSubnetMask(subnetmask)
      setNotatieNetwork   ( binToDec( rezolvareNetworkSauBroadcast(0) ) )
      setNotatieBroadcast ( binToDec( rezolvareNetworkSauBroadcast(1) ) )
    }
    if(checked === 'BIN'){
      setNotatieSubnetMask(decToBin(subnetmask))   
      setNotatieNetwork   ( rezolvareNetworkSauBroadcast(0) )
      setNotatieBroadcast ( rezolvareNetworkSauBroadcast(1) )
    }
  }, [subnetmask]
  )

  useEffect( () => 
    {
      if(checkIfValidIP(adresaIP)){
        setCuloareAdresaValida('cyan') 
        setareClasa()
        setareNotatii()
        //setare valori ptr restul textelor bazat pe adresa IP primita
      }

      else{
        setCuloareAdresaValida('red')
        setareNotatiiGoale()
      }
    }, [adresaIP] 
  )

  useEffect( () => 
    {
      if(checkIfValidIP(adresaIP)){
        setareNotatii()
      }
      else{
        setNotatieAdresaIP('')
        setareNotatiiGoale()
      }
        
    }, [checked]
  )

  useEffect( () => 
    {
      //network bits = nr biti subnet mask
      //host bits  = 32 - network bits
      //nr hosturi = 2 la puterea host bits - 2 (-2 pt ca nu utilizam prima si ultima adresa care e broadcastul)
      const host_bits  =  32 - bitiNetwork 
      const nr_hosturi =  2**host_bits - 2  
      setNumarHosturi(nr_hosturi)
    }, [bitiNetwork]
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
                dropdownCIDR.current.selectIndex(index) 
                setBitiNetwork(dataCIDR[index].replace(/^./, ""))
                setSubnetmask(selectedItem)
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
                setBitiNetwork(dataCIDR[index].replace(/^./, ""))
                setSubnetmask(dataSM[index])
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
            <Text style={styles.text}>Class</Text>
            <Text style={ [ styles.text_center, {} ] }> {clasaIP} </Text>
          </View>
          <View style={ [ styles.container_row, {} ]}>
            <Text style={styles.text}>Hosts</Text>
            <Text style={ [ styles.text_center, {} ] }> {numarHosturi} </Text>
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
        <Text style={styles.text}> IP Adress </Text>
        <Text style={ [ styles.text_center, {fontSize: 17, width: '70%'} ] }> {notatieAdresaIP} </Text>
      </View>
      <View style={ [ styles.container_row, {} ]}>
        <Text style={styles.text}> Subnet Mask </Text>
        <Text style={ [ styles.text_center, {fontSize: 17, width: '70%'} ] }> {notatieSubnetMask} </Text>
      </View>
      <View style={ [ styles.container_row, {} ]}>
        <Text style={styles.text}> Network  </Text>
        <Text style={ [ styles.text_center, {fontSize: 17, width: '70%'} ] }> {notatieNetwork} </Text>
      </View>
      <View style={ [ styles.container_row, {} ]}>
        <Text style={styles.text}> Broadcast </Text>
        <Text style={ [ styles.text_center, {fontSize: 17, width: '70%'} ] }> {notatieBroadcast} </Text>
      </View>
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
