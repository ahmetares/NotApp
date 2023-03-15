import React, {useEffect,useState,useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert
} from 'react-native';
import PlusButton from '../components/PlusButton';
import Button from '../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import NoteCard from '../components/NoteCard';
import { SwipeListView } from 'react-native-swipe-list-view';
import { deleteNote, setItems } from '../store/noteSlice';
import Icon from 'react-native-vector-icons/AntDesign' // ekstra npm i --save-dev @types/react-native-vector-icons  yapınca calıstı ayrıca bu paket için android ve iosda konfig. yapılmalı





function Notes({navigation}) {

  const note = useSelector((state)=> state.notes.notes)
  const dispatch = useDispatch()


 const navigateToWriter = () => { navigation.navigate('Notlar') }
 const navigateToNote = (note,id) => {
  navigation.navigate('Not',{note,id})
 }

 const handleDelete = (item) => {
  Alert.alert('Notu sil','Notu silmek istediğinizden emin misiniz', [
    {
      text: 'Vazgeç',
      style: 'cancel',
    },
    {
      text: 'Sil', 
      onPress: () => {
        dispatch(deleteNote(item.id))
      }
     } ,
  ])
 }


  


  return (
    <>
    <View style={{}}>
        <SwipeListView   data={note}  //redux'taki note state'ini listele  (bu state aynı zamanda redux-persist ile localStorage ile senktronize)
 
        style={{height:Dimensions.get('window').height/1.2, padding:10 /*flatliste height vererek plusbutton'u position:absolute gibi kullanabildik*/}}
        renderItem={({item}) => <NoteCard message={item} onPress={() => navigateToNote(item.note, item.id)} />}
        
        renderHiddenItem={ (data, rowMap) => (
            <View style={styles.rowBack}>
                <Icon 
                onPress={() => handleDelete(data.item)}
                name={'delete'} color='white' size={30} style={{marginLeft:10}}
                >
                </Icon>
            </View>
      )}
      leftOpenValue={60}
      rightOpenValue={0}
         />
        
        <PlusButton icon={'plus'} onPress={navigateToWriter} />

      </View>

      </>

  );
}

const styles = StyleSheet.create({
  
  rowBack: {
    alignItems: 'center',
    borderRadius:10,
    backgroundColor: 'red',
    marginLeft:13,
    marginVertical:11,
    flex: 1,
    flexDirection: 'row',
    maxWidth:Dimensions.get('window').width/1.15

    
},
});

export default Notes;
