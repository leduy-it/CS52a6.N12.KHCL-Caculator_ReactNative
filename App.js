import React from 'react';

import {StyleSheet, Text, View, TouchableOpacity, Vibration, Image , ViewSafeArea,Button , SafeAreaView ,ScrollView,FlatList} from 'react-native';
import {useState} from 'react';
import { Entypo } from '@expo/vector-icons';




export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');
  const [history, setHistory] = useState([]);
  const [shouldShow, setShouldShow] = useState(false);

  const buttons = [ 'AC' , '(' , ')' , '/' , '7' , '8' , '9' , '*' , '4' , '5' , '6' , '-' , '1' , '2' , '3' , '+' , '0' , '.' , 'DEL' , '=' ];



  function calculator() {
    
    let lastArr = currentNumber[currentNumber.length-1];
    
    if(lastArr === '/' || lastArr === '*' || lastArr === '-' || lastArr === '+' || lastArr === '.') {
      setCurrentNumber(currentNumber)
      return
    }
    else {
      let result = eval(currentNumber).toString();
      var a = [...history]
        a.push({
          id: history.length,
          expression: currentNumber + ' =',
          kq: result
        })
      setHistory(a);
      console.log(history)
      console.log(currentNumber);
      console.log(lastNumber);
      setCurrentNumber(result)
      return
    }
  }
  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  

    const renderItem = ({ item }) => (
      <Item title={item.history} />
    );
  function handleInput(buttonPressed) {
    if(buttonPressed  === '+' || buttonPressed === '-' || buttonPressed === '*' || buttonPressed === '/') {
      // Vibration.vibrate(35);
      setCurrentNumber(currentNumber + buttonPressed)
      return
    }
    else if (buttonPressed === 1 || buttonPressed === 2 || buttonPressed === 3 || buttonPressed === 4 || buttonPressed === 5 ||
            buttonPressed === 6 || buttonPressed === 7 || buttonPressed === 8 || buttonPressed === 9 || buttonPressed === 0 || buttonPressed === '.' ) {
      // Vibration.vibrate(35);
    }
    switch(buttonPressed) {
      case 'DEL':
        // Vibration.vibrate(35);
        setCurrentNumber(currentNumber.substring(0, (currentNumber.length - 1)))
        return
      case 'AC':
        // Vibration.vibrate(35);
        setLastNumber('')
        setCurrentNumber('')
        return
      case '=':
        // Vibration.vibrate(35);
        setLastNumber(currentNumber + '=');
        calculator()
        return
    }
    setCurrentNumber(currentNumber + buttonPressed)
  }

  const styles = StyleSheet.create({
    buttonHisory: {
        marinTop: 600,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        margin: 10,
      },
    results: {
      backgroundColor: darkMode ? '#2C2C2C' : '#D9DEE3',
      maxWidth: '100%',
      minHeight: '30%',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      borderBottomLeftRadius: 50,
      borderBottomRightRadius: 50,
      marginBottom: 10,
     
    },
    resultText: {
      maxHeight: 90,
      color: '#272727',
      marginBottom: 25,
      fontSize: 80,
      marginRight: 30,
      letterSpacing: 0,

    },
    historyText: {
      color: darkMode ? '#B5B7BB' : '#7c7c7c',
      fontSize: 50,
      marginRight: 35,
      alignSelf: 'flex-end',
    },
    themeButton: {
      alignSelf: 'flex-start',
      bottom: '5%',
      margin: 15,
      backgroundColor: darkMode ? '#7b8084' : '#e5e5e5',
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    buttons: {
      
      width: 433,
      height: 210,
      flexDirection: 'row',
      flexWrap: 'wrap',
    
    },
    button: {
    marginLeft: 10,
    marginRight: 5,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius:35,
      minWidth: 90,
      minHeight: 90,
      margin: 9,
      flex: 'wrap',
    },
    textButton: {
      color: darkMode ? 'white' : 'black',
      fontSize: 28,
    },
    Text: {
      color: darkMode ? '#b5b7bb' : '#7c7c7c',
      fontSize: 400,
    }
    
  })
  return(
    <View>
      <View style={styles.results}>
        <TouchableOpacity style={styles.themeButton}>
          <Entypo name={darkMode ? 'light-up' : 'moon'} size={40} color={darkMode ? 'white' : 'black'} onPress={() => darkMode ? setDarkMode(false) : setDarkMode(true)}/>
        </TouchableOpacity>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map((button) =>
          button === '=' || button === '/' || button === '*' || button === '-' || button === '+' || button === '('|| button === ')'  ?
          <TouchableOpacity key={button} style={[styles.button, {backgroundColor: '#46E1C5'} ]} onPress={() => handleInput(button)}>
            <Text style={[styles.textButton, {color: 'black', fontSize: 30} ]}>{button}</Text>
          </TouchableOpacity>
          :
          button === 0 ?
          <TouchableOpacity key={button} style={[styles.button, {backgroundColor: typeof(button) === 'number' ? darkMode ? '#303946' : '#fff' : darkMode === true ? '#46E1C5' : '#46E1C5'} ]} onPress={() => handleInput(button)}>
            <Text style={styles.textButton}>{button}</Text>
          </TouchableOpacity>
          :
          button === '.' || button === 'DEL' ?
          <TouchableOpacity key={button} style={[styles.button,{ borderRadius:80}, {backgroundColor: button === '.' ? darkMode ? '#414853' : '#D9DEE3' : darkMode === true ? '#414853' : '#D9DEE3'} ]} onPress={() => handleInput(button)}>
            <Text style={styles.textButton}>{button}</Text>
          </TouchableOpacity>
          :
          button === 'AC' ?
          <TouchableOpacity key={button} style={[styles.button, {backgroundColor: typeof(button) === 'number' ? darkMode ? '#FF8E3C' : '#FF8E3C' : darkMode === true ? '#FF8E3C' : '#FF8E3C'} ]} onPress={() => handleInput(button)}>
            <Text style={styles.textButton}>{button}</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity key={button} style={[styles.button, { borderRadius:80},{backgroundColor: typeof(button) === 'number' ? darkMode ? '#303946' : '#fff' : darkMode === true ? '#414853' : '#D9DEE3' } ]} onPress={() => handleInput(button)}>
            <Text style={styles.textButton}>{button}</Text>
          </TouchableOpacity>
        )}
         <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      </View>
     
    </View>
  );
}
