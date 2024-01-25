import { StyleSheet, Keyboard,Button ,Alert, View,Text,KeyboardAvoidingView,ScrollView,Dimensions,TextInput, Platform } from "react-native"
import {useEffect, useState,useRef} from 'react'
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
          message: "Not başarıyla güncellendi",
          type: "info",
        });
      } catch (error) {
        console.log(error)
      }
    }


    useEffect(()=> {
      navigation.setOptions({
        headerRight: () => (
          <Button color={'#d7ac2a'} title='Güncelle' onPress={() => saveNote(id,text)}></Button>
        )
      })
    },[navigation,text])

    const inputRef = useRef()
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 75 : 0

      
    return (
      <View style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{flex: 1}}
          keyboardDismissMode="none"
              keyboardShouldPersistTaps='never'
          onTouchStart={() => inputRef.current.focus()}
          style={styles[colorMode].container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null} //iosda klavye arkası yazı kalıyodu uzun yazılarda
            keyboardVerticalOffset={keyboardVerticalOffset}>
            <TextInput
              ref={inputRef}
              style={styles[colorMode].input}
              onChangeText={setText}
              value={text}
              textAlignVertical="top"
              multiline
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );

}


export default Note

const base_style = {
  container: {
   // flex:1,

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

