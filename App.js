import React, { useEffect, useRef } from 'react';
import IPCalculator from './components/IPCalculator';

export default function App() {

  const [checked, setChecked] = React.useState('DEC');
  const [adresaIP, setAdresaIP]                       = React.useState('192.168.0.0')
  const [culoareAdresaValida, setCuloareAdresaValida] = React.useState('yellow')
  const [bitiNetwork, setBitiNetwork]                 = React.useState('8')
  const [subnetmask, setSubnetmask]                   = React.useState('255.0.0.0')
  const [notatieAdresaIP, setNotatieAdresaIP]         = React.useState('')
  const [notatieSubnetMask, setNotatieSubnetMask]     = React.useState('')
  const [notatieNetwork, setNotatieNetwork]           = React.useState('')
  const [notatieBroadcast, setNotatieBroadcast]       = React.useState('')
  const [numarHosturi, setNumarHosturi]               = React.useState('16,777,214')
  const [clasaIP, setClasaIp]                         = React.useState('C')
  const [hostMin, setHostMin]                         = React.useState('')
  const [hostMax, setHostMax]                         = React.useState('')  

  //cu Subnet Mask aflam portiunile de Network si Host. 
  //dupa ce convertim adresa IP in binar
  //primii X biti ai adresei IP vor fi de Network, restul de Host
  //unde X este dat de bitii Subnet Mask (/X)
  //bitii de Network NU se pot schimba, raman aceias, doar bitii de host se transforma in 0 - si aflam adresa de Network, 
  //apoi bitii de host se transforma in 1 si aflam adresa de Broadcast
  //tot ce este intre adresa de network si adresa de broadcast se numesc hosturi
  //numarul de hosturi il putem afla din formula 2^nr_biti_host - 2
  //unde nr_biti_host reprezinta numarul de biti ramasi din 32 - X, unde X reprezinta numarul bitilor Subnet Mask-ului
  //iar -2 pentru ca adresa de Network si adresa de Broadcast nu sunt hosturi valide, tot ce este intre ele sunt subretele valide

  const dataSM = 
  [ 
    '255.0.0.0','255.128.0.0','255.192.0.0','255.224.0.0','255.240.0.0','255.248.0.0','255.252.0.0','255.254.0.0','255.255.0.0',
    '255.255.128.0','255.255.192.0','255.255.224.0','255.255.240.0','255.255.248.0','255.255.252.0','255.255.254.0',
    '255.255.255.0','255.255.255.128','255.255.255.192','255.255.255.224','255.255.255.240','255.255.255.248','255.255.255.252',
  ]

  const dataSMbits = 
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
    const adresaBinara = octetiBinari.join('.') //punct intre octeti
    return adresaBinara;
  }

  const binToDec = (adresa) => {
    const octetiBinari = adresa.split('.');
    const octetiDecimali = octetiBinari.map(octet => parseInt(octet, 2)) //luare fiecare octet si convertire in decimal prin parseInt
    const adresaDec = octetiDecimali.join('.') 
    return adresaDec
  }

  const binToHex = (adresa) => {
    const octetiBinari = adresa.split('.')

    const octetiHex = octetiBinari.map(octet => {
      const octetDecimal = parseInt(octet, 2);
      const octetHex = octetDecimal.toString(16).padStart(2, '0');
      return octetHex.padStart(2, '0');
    });
  
    const hexAdresa = octetiHex.join('');
    return hexAdresa;  
  }

  const incrementare = (adresa) => {
    const octeti    = adresa.split('.') 
    octeti[3] = parseInt(octeti[3]) + 1 
    if(octeti[3] > 255){
      octeti[3] = 0
      octeti[2] = parseInt(octeti[2]) + 1
    }
    if(octeti[2] > 255){
      octeti[2] = 0
      octeti[1] = parseInt(octeti[1]) + 1
    }
    if(octeti[1] === 255){
      octeti[1] = 0
      octeti[0] = parseInt(octeti[0]) + 1
    }
    if(octeti[0] > 255)
      return ''
    return octeti.join('.') 
  }

  const decrementare = (adresa) => {
    const octeti    = adresa.split('.') 
    octeti[3] = parseInt(octeti[3]) - 1 
    if(octeti[3] < 0){
      octeti[3] = 255
      octeti[2] = parseInt(octeti[2]) - 1
    }
    if(octeti[2] < 0){
      octeti[2] = 255
      octeti[1] = parseInt(octeti[1]) - 1
    }
    if(octeti[1] < 0){
      octeti[1] = 255
      octeti[0] = parseInt(octeti[0]) - 1
    }
    if(octeti[0] < 0)
      return ''
    return octeti.join('.') 
  }

  const rezolvareNetworkSauBroadcast = (nr) => {
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //pentru PORTIUNEA DE NETWORK
    //cate zerouri sau 1-uri vor fi la final stabilim in functie de bitii portiunii de network 
    //bitii de network NU SE SCHIMBA
    //bitilor de network li se adauga zerouri la final pt a afla adresa de Network
    //sau 1-uri pt a afla adresa de broadcast
    let adresa = decToBin(adresaIP)
    let adresaCharArray = adresa.split('.')     //impartim string-ul bazat pe caracterul '.'
    adresaCharArray = adresaCharArray.join('')  //renuntam la '.'
    pozitii = 32 - bitiNetwork 
    //se taie ultimele pozitii (nr pozitii = biti host) pt a avea portiunea de network 
    //portiunea bitilor de host SE SCHIMBA
    //portiunea bitilor de network NU SE SCHIMBA
    const networkPortion = adresaCharArray.slice(0, adresaCharArray.length - pozitii)
    
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //pentru PORTIUNEA DE HOST (sa aflam Network Adress si Broadcast Adress)
    //se adauga 0 sau 1 in functie de cati biti network sunt (cati biti de host sunt ramasi)
    //nr = 0 sau 1
    let adresaBruta =  networkPortion 
    if(nr === 0)
      adresaBruta = adresaBruta + '0'.repeat(pozitii) 
    else
      adresaBruta = adresaBruta + '1'.repeat(pozitii) 
    adresa = ''
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
    if(checked === 'HEX'){
      setNotatieAdresaIP( binToHex( decToBin(adresaIP) ) )
      setNotatieSubnetMask( binToHex( decToBin(subnetmask) ) )
      setNotatieNetwork( binToHex( rezolvareNetworkSauBroadcast(0) ) )
      setNotatieBroadcast( binToHex( rezolvareNetworkSauBroadcast(1) ) )
    }

    //asta trebuie incrementat cu 1
    let netadress = binToDec( rezolvareNetworkSauBroadcast(0) )
    let hostmin = incrementare(netadress)
    setHostMin(hostmin)  
    //asta trebuie decrementat cu 1
    let broadcastadress = binToDec( rezolvareNetworkSauBroadcast(1) )
    let hostmax = decrementare(broadcastadress)
    setHostMax(hostmax)  

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
    if(checked === 'HEX'){
      setNotatieAdresaIP( binToHex( decToBin(adresaIP) ) )
      setNotatieSubnetMask( binToHex( decToBin(subnetmask) ) )
      setNotatieNetwork( binToHex( rezolvareNetworkSauBroadcast(0) ) )
      setNotatieBroadcast( binToHex( rezolvareNetworkSauBroadcast(1) ) )
    }
  }, [subnetmask]
  )

  useEffect( () => 
    {
      if(checkIfValidIP(adresaIP)){
        setCuloareAdresaValida('cyan') 
        setareClasa()
        setareNotatii() //setare valori ptr restul textelor bazat pe adresa IP primita
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
  const dropdownSMbitsRef = useRef()

  return (    
    
    <IPCalculator
      culoareAdresaValida = {culoareAdresaValida}   dataSMbits = {dataSMbits}               dataSM = {dataSM}   clasaIP = {clasaIP} 
      numarHosturi = {numarHosturi}                 hostMin = {hostMin}                     hostMax = {hostMax} checked = {checked} 
      setChecked = {setChecked}                     notatieAdresaIP = {notatieAdresaIP}     notatieBroadcast = {notatieBroadcast} 
      notatieNetwork = {notatieNetwork}             notatieSubnetMask = {notatieSubnetMask} handleChangeInputAdresaIP = {handleChangeInputAdresaIP} 
      adresaIP = {adresaIP}                         dropdownSMRef = {dropdownSMRef}         dropdownSMbits = {dropdownSMbitsRef} 
      setBitiNetwork = {setBitiNetwork}             setSubnetmask = {setSubnetmask}
    />
    
  )
}

