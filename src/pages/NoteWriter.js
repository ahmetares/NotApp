import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Dimensions, KeyboardAvoidingView,ScrollView,Alert,  Modal } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { addNote } from '../store/localStorageSlicer/noteSlice'
import Button from '../components/Button';

import { showMessage, hideMessage } from "react-native-flash-message";

const deviceSize = Dimensions.get('window')

function NoteWriter({navigation}) {

  const [text,setText] = useState('')
  const notes = useSelector((state) => state.notes.notes)
  const dispatch = useDispatch()


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
    style={styles.container}>
      <ScrollView>

        <View style={styles.input_container}>
        <TextInput style={styles.input} onChangeText={setText}  multiline/>
        </View>
        </ScrollView>

        <Button title='Ekle' onPress={handleNote}/>
        </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
 

  input:{
    backgroundColor:'white',

  },

  input_container:{
    backgroundColor:'white',
    height: deviceSize.height/1.1

},  

});

export default NoteWriter;
