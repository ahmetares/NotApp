import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Dimensions, KeyboardAvoidingView,ScrollView,Alert,  Modal } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { addNote } from '../store/localStorageSlicer/noteSlice'
import Button from '../components/Button';

import { showMessage, hideMessage } from "react-native-flash-message";

const deviceSize = Dimensions.get('window')

function NoteWriter({navigation}) {

  const [text,setText] = useState('')
  const [colorMode , setColorMode] = useState('light')

  const notes = useSelector((state) => state.notes.notes)
  const dispatch = useDispatch()

  const lightOrNightMode =  useSelector((state)=> state.notes.nightMode)

    useEffect(()=> {
      console.log('modumyz bu' , lightOrNightMode)
      if (!lightOrNightMode) {
         setColorMode('light')
      } else {
        setColorMode('dark')
    
      }
      console.log('comode' , colorMode)
    
     },[lightOrNightMode])



  function handleNote() {
    if(!text.trim()){
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



  return (
    <KeyboardAvoidingView
    {...(Platform.OS === 'ios' ? { behavior: 'padding' } : {})}
    style={styles[colorMode].container}>
      <ScrollView>

        <TextInput style={styles[colorMode].input} onChangeText={setText}  multiline textAlignVertical='top'/>
        </ScrollView>

        <View style={styles[colorMode].button_container}>
        <Button title='Ekle' onPress={handleNote}/>
        </View> 
        </KeyboardAvoidingView>
  );
}

const base_style = {
  container: {
    flex:1
  },
  input: {
    height:Dimensions.get('window').height
  }
}


const styles = {

  light: StyleSheet.create({
    ...base_style,
    input:{
      ...base_style.input,
      backgroundColor:'white',
  
    },
  
    button_container:{
      backgroundColor:'white'
    }
  }),

  dark: {
    ...base_style,
    input:{
      ...base_style.input,
      backgroundColor:'#423d3d',
      color:'white'
  
    },
    button_container:{
      backgroundColor:'black'
    }
  }
}

export default NoteWriter;



