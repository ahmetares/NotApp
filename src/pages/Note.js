import { StyleSheet, Alert, View,Text,KeyboardAvoidingView,ScrollView,Dimensions,TextInput } from "react-native"
import Button from '../components/Button';
import {useEffect, useState} from 'react'
import { useSelector,useDispatch } from "react-redux";
import { updateNote } from "../store/noteSlice";

const deviceSize = Dimensions.get('window')



function Note ({route,navigation}) {
    
    const [text,setText] = useState('')

    const note = route.params.note
    const id = route.params.id

    const dispatch = useDispatch()
    const notes = useSelector((state) => state.notes.notes)

    useEffect(()=> { //sayfa ilk render edildiğinde mevcut note'u text'e set ettik
        setText(note)
    },[])


    const saveNote =  (id,text) => {   
      dispatch(updateNote({id,text}))  //action.payload'a id ve text'i gönderdik  
    }

    return(
        <KeyboardAvoidingView
        {...(Platform.OS === 'ios' ? { behavior: 'padding' } : {})}
        style={styles.container}>
          <ScrollView>
    
            <View style={styles.input_container}>
            <TextInput style={styles.input} onChangeText={setText} value={text}  multiline/>
            </View>
            </ScrollView>
    
            <Button title='Kaydet' onPress={() => saveNote(id,text)}/>
            </KeyboardAvoidingView>
    )

}


export default Note

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
})