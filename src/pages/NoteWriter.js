import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  Alert
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment,addNote } from '../store/noteSlice'
import Button from '../components/Button';

const deviceSize = Dimensions.get('window')

function NoteWriter({navigation}) {

  const [text,setText] = useState('')
    const count = useSelector((state) => state.counter.value)  //burası counter'i değiştirince bozuluyor
    const notes = useSelector((state) => state.counter.notes)

    const dispatch = useDispatch()


  function handleNote() {
    if(!text){
      Alert.alert( 'Lütfen geçerli bir not giriniz');
      return
    }
    dispatch(
      addNote({
      id: Math.floor(Math.random() * 100000),
      note: text,
    })
    )
    navigation.navigate('Not Defteri')
  }    //en son kaldıgın yer:
  //her kaydete tıkladıgında yeniden render ediliyo bu yüzden yeni bir note kaydediyo farklı id ile
  //eğer içinde yazı varsa o update edilmeli eğer 0 dan açılmışssa yeni bir note olarak pushlanmalı
  //navigate edip çözdük butondan gelirse falan



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
