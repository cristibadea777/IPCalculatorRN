import { StatusBar, Text, TextInput, View} from 'react-native';
import { RadioButton } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import styles from './styles';


const IPCalculator = ( 
        {   
            culoareAdresaValida, dataSMbits, dataSM, clasaIP, numarHosturi, hostMin, hostMax, notatieHostMin,
            notatieHostMax, checked, setChecked, notatieAdresaIP, notatieBroadcast, notatieNetwork, notatieSubnetMask, 
            handleChangeInputAdresaIP, adresaIP, dropdownSMRef, dropdownSMbitsRef, setBitiNetwork, setSubnetmask,
        } 
    ) => {
    return (
        <View style={styles.container_principal}>

        <StatusBar style="auto" backgroundColor={"#232B2B"} barStyle={'light-content'}> </StatusBar>
    
        <View style={ [ styles.container_row_titlu, {} ]}>
          <Text style={ [ styles.text_titlu,  {} ] }>INPUT</Text>
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
                  dropdownSMbitsRef.current.selectIndex(index) 
                  setBitiNetwork(dataSMbits[index].replace(/^./, ""))
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
          <Text style={ [ styles.text, {} ] }>SM bits</Text>
          <SelectDropdown
            ref={dropdownSMbitsRef}
            data={dataSMbits}
            defaultValueByIndex={0}
            onSelect=
            { (selectedItem, index) => 
                {
                  dropdownSMRef.current.selectIndex(index) 
                  setBitiNetwork(dataSMbits[index].replace(/^./, ""))
                  setSubnetmask(dataSM[index])
                }
            }
            buttonStyle={[styles.text_input, {}]}
            buttonTextStyle={{ fontSize: 20, color: 'white'}}
            rowStyle={{backgroundColor: '#1e1e1e'}}
            rowTextStyle={{color: 'white', fontSize: 20}}
          />
        </View>
    
    
        <View style={ [ styles.container_row_titlu, {marginTop: 7} ]}>
          <Text style={ [ styles.text_titlu, {} ] }>DETAILS</Text>
        </View>      
            <View style={ [ styles.container_row, {} ]}>
              <Text style={styles.text}>Class</Text>
              <Text style={ [ styles.text_center, {} ] }> {clasaIP} </Text>
        </View>
        <View style={ [ styles.container_row, {} ]}>
              <Text style={styles.text}>Hosts</Text>
              <Text style={ [ styles.text_center, {} ] }> {numarHosturi} </Text>
        </View>
    
        <View style={ [ styles.container_row_titlu, {} ]}>
              <Text style={ [ styles.text_titlu,  {}] }>NOTATIONS</Text>
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
          <Text style={ [ styles.text_center, {fontSize: 17} ] }> {notatieAdresaIP} </Text>
        </View>
        <View style={ [ styles.container_row, {} ]}>
          <Text style={styles.text}> Subnet Mask </Text>
          <Text style={ [ styles.text_center, {fontSize: 17} ] }> {notatieSubnetMask} </Text>
        </View>
        <View style={ [ styles.container_row, {} ]}>
          <Text style={styles.text}> Network  </Text>
          <Text style={ [ styles.text_center, {fontSize: 17} ] }> {notatieNetwork} </Text>
        </View>
        <View style={ [ styles.container_row, {} ]}>
          <Text style={styles.text}> Broadcast </Text>
          <Text style={ [ styles.text_center, {fontSize: 17} ] }> {notatieBroadcast} </Text>
        </View>
        <View style={ [ styles.container_row, {} ]}>
          <Text style={styles.text}> IP Range </Text>
          <Text style={ [ styles.text_center, {fontSize: 17} ] }> {notatieHostMin} </Text>
        </View>
        <View style={ [ styles.container_row, {} ]}>
          <View></View>
          <Text style={ [ styles.text_center, {fontSize: 17} ] }> {notatieHostMax} </Text>
        </View>
      </View>         
    )
}
export default IPCalculator


  