import React, { useEffect, useRef,useState } from 'react';
import { StyleSheet,Button, View,Keyboard, TextInput, Dimensions, KeyboardAvoidingView,ScrollView,Alert,  Modal } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { addNote } from '../store/localStorageSlicer/noteSlice'

import { showMessage, hideMessage } from "react-native-flash-message";

const deviceSize = Dimensions.get('window')

function NoteWriter({navigation}) {

  const [text,setText] = useState('')
  const [colorMode , setColorMode] = useState('light')

  const notes = useSelector((state) => state.notes.notes)
  const dispatch = useDispatch()



  const lightOrNightMode =  useSelector((state)=> state.notes.nightMode)
    useEffect(()=> {
      if (!lightOrNightMode) {
         setColorMode('light')
      } else {
        setColorMode('dark')
    
      }
    
     },[lightOrNightMode])



  function handleNote() {
    if(!text.trim()){
      console.log('mesaj yokki')
      showMessage({
        message: "Lütfen not giriniz",
        type: "danger",
      });
      return
    }
    dispatch(
      addNote({
      id: Math.floor(Math.random() * 100000),
      note: text,
      date: new Date().toISOString(),
      isPinned: false,
    })
    )
    navigation.navigate('Not Defteri')
  }   


  useEffect(()=> {
    navigation.setOptions({
      headerRight: () => (
        <Button color={'#d7ac2a'} title='Ekle' onPress={handleNote}></Button>
      )
    })
  },[navigation,text])


  const inputRef = React.useRef()
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 50 : 0

  return (
    <KeyboardAvoidingView 
    behavior= {Platform.OS === 'ios' ?  'padding' : null } 
    enabled={true} 
    keyboardVerticalOffset={keyboardVerticalOffset}
    style={styles[colorMode].container}
    onTouchStart={() => inputRef.current.focus()} >

        <TextInput 
        ref={inputRef} 
        placeholderTextColor="grey"  
        placeholder='Not..' 
        style={styles[colorMode].input} 
        onChangeText={setText}  multiline textAlignVertical='top'/>
      
        </KeyboardAvoidingView>



  );
}

const base_style = {
  container: {
    flex:1,
  },
  input: {
    flex:1,
    paddingLeft:12,
    fontSize: 17,
    marginVertical:10,
    marginBottom:'10%'
  }
}


const styles = {

  light: StyleSheet.create({
    ...base_style,
    container:{
      ...base_style.container,
      backgroundColor:'white',
    },

    input:{
      ...base_style.input,
      color:'black'
    },
  
    button_container:{
      backgroundColor:'white'
    }
  }),

  dark: {
    ...base_style,
    container:{
      ...base_style.container,
      backgroundColor:'#423d3d',
    },

    input:{
      ...base_style.input,
      color:'white'
  
    },
    button_container:{
      backgroundColor:'black'
    }
  }
}

export default NoteWriter;



