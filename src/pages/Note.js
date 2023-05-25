import { StyleSheet, Alert, View,Text,KeyboardAvoidingView,ScrollView,Dimensions,TextInput } from "react-native"
import Button from '../components/Button';
import {useEffect, useState} from 'react'
import { useSelector,useDispatch } from "react-redux";
import {  updateNote, updatePinnedNote } from "../store/localStorageSlicer/noteSlice";

import { showMessage, hideMessage } from "react-native-flash-message";

const deviceSize = Dimensions.get('window')



function Note ({route,navigation}) {
    
    const [text,setText] = useState('')
    const [colorMode , setColorMode] = useState('light')


    const note = route.params.note
    const id = route.params.id
    const isPinned = route.params.isPinned

    const dispatch = useDispatch()
    const notes = useSelector((state) => state.notes.notes)

    useEffect(()=> { //sayfa ilk render edildiğinde mevcut note'u text'e set ettik
        setText(note)
    },[])

    const lightOrNightMode =  useSelector((state)=> state.notes.nightMode)
    

    useEffect(()=> {
      if (!lightOrNightMode) {
         setColorMode('light')
      } else {
        setColorMode('dark')
    
      }    
     },[lightOrNightMode])


    const saveNote =  (id,text) => {    
      try {
        if(!text.trim()){
          showMessage({
            message: "Lütfen geçerli bir not girin",
            type: "danger",
          });
          return
        }
        if(!isPinned){
        dispatch(updateNote({id,text}))  //action.payload'a id ve text'i gönderdik  
        }
        if(isPinned){
        dispatch(updatePinnedNote({id,text}))
        }
        showMessage({
          message: "Not başarıyla kaydedildi",
          type: "info",
        });
      } catch (error) {
        console.log(error)
      }
    }
      
    return(
        <KeyboardAvoidingView
        {...(Platform.OS === 'ios' ? { behavior: 'padding'} : null)} 
        keyboardVerticalOffset={Platform.OS === 'ios' && 100}

        style={styles[colorMode].container}>
          <ScrollView>
    
            <TextInput style={styles[colorMode].input} onChangeText={setText} value={text} textAlignVertical='top' multiline/>
            </ScrollView>

            <View style={styles[colorMode].button_container}>
    
            <Button title='Kaydet' onPress={() => saveNote(id,text)}/>
            </View>
            </KeyboardAvoidingView>
    )

}


export default Note

const base_style = {
  container: {
    flex:1,
    backgroundColor:'white'

  },
  input: {
    height:Dimensions.get('window').height,
    marginLeft:12,
    fontSize: 17,
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

