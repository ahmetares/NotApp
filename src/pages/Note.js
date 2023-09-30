import { StyleSheet, Keyboard ,Alert, View,Text,KeyboardAvoidingView,ScrollView,Dimensions,TextInput } from "react-native"
import Button from '../components/Button';
import {useEffect, useState} from 'react'
import { useSelector,useDispatch } from "react-redux";
import {  updateNote, updatePinnedNote } from "../store/localStorageSlicer/noteSlice";

import { showMessage, hideMessage } from "react-native-flash-message";

const deviceSize = Dimensions.get('window')



function Note ({route,navigation}) {
    
    const [text,setText] = useState('')
    const [colorMode , setColorMode] = useState('light')
    const [keyboardOn , setKeyboard] = useState(false)



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



     useEffect(() => {
      const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
        setKeyboard(true);
        console.log('keyborad açıldı')
      });
      const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
        setKeyboard(false);
        console.log('keyborad kapalı')

      });
  
      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }, []);




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
        keyboardVerticalOffset={Platform.OS === 'ios' &&83}

        style={styles[colorMode].container}>
          <ScrollView>
    
            <TextInput  
            style={[styles[colorMode].input, {maxHeight: keyboardOn ? Dimensions.get('window').height-300 : Dimensions.get('window').height-100 }]} 
            onChangeText={setText} 
            value={text} 
            textAlignVertical='top' 
            multiline/>
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

