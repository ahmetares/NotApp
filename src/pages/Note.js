import { StyleSheet, Keyboard,Button ,Alert, View,Text,KeyboardAvoidingView,ScrollView,Dimensions,TextInput, Platform } from "react-native"
import {useEffect, useState,useRef} from 'react'
import { useSelector,useDispatch } from "react-redux";
import {  updateNote, updatePinnedNote } from "../store/localStorageSlicer/noteSlice";

import { showMessage, hideMessage } from "react-native-flash-message";
import {useTranslation} from 'react-i18next';


const deviceSize = Dimensions.get('window')



function Note ({route,navigation}) {
    
    const [text,setText] = useState('')
    const [colorMode , setColorMode] = useState('light')

    const {t} = useTranslation();




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
            message: t('warn-empty-note'),
            type: 'danger',
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
          message: t('warn-note-updated-successfully'),
          type: 'info',
        });
      } catch (error) {
        console.log(error)
      }
    }


    useEffect(()=> {
      navigation.setOptions({
        headerRight: () => (
          <Button color={'#d7ac2a'} title={t("view-note-right-header")} onPress={() => saveNote(id,text)}></Button>
        )
      })
    },[navigation,text])

    const inputRef = useRef()
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 50 : 0

      
    return(
      <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ?  'padding' : null } 
      enabled={true} 
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={styles[colorMode].container}
      onTouchStart={() => inputRef.current.focus()} >


    
            <TextInput  
            ref={inputRef} 
            style={styles[colorMode].input} 
            onChangeText={setText} 
            value={text} 
            textAlignVertical='top' 
            multiline/>

            </KeyboardAvoidingView>
    )

}


export default Note

const base_style = {
  container: {
    flex:1,

  },
  input: {
    paddingLeft:12,
    fontSize: 17,
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
      backgroundColor:'white',

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
      backgroundColor:'black',
    }
  }
}

