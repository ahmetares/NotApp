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
import { deleteNote, setItems, updateNote,pinNote,unPinNote } from '../store/noteSlice';
import Icon from 'react-native-vector-icons/AntDesign' // ekstra npm i --save-dev @types/react-native-vector-icons  yapınca calıstı ayrıca bu paket için android ve iosda konfig. yapılmalı
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import IONIcon from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage, hideMessage } from "react-native-flash-message";



function Notes({navigation}) {

  const note = useSelector((state)=> state.notes.notes)
  const pinnedNotes = useSelector((state)=> state.notes.pinnedNotes)


  const allNotes = pinnedNotes.concat(note)
  

  const dispatch = useDispatch()

  const [isPinned, setPinned] = useState(false)
  const [bulkDelete, setIsBulkDelete] = useState(false)



 const navigateToWriter = () => { navigation.navigate('Notlar') }
 const navigateToNote = (note,id,isPinned) => {
  navigation.navigate('Not',{note,id,isPinned})
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

 const handleUnDelete = (item) => {
  showMessage({
    message: "Sabitlenmiş notlar silinemez",
    type: "danger",
  });
 }

 const handlePin = (item) => {
  setPinned(!isPinned)
  dispatch(pinNote(item.id))

 } 

 const handleUnPin = (item) => {
  setPinned(!isPinned)
  dispatch(unPinNote(item.id))
 }

 /*useEffect(()=> {
   async function a() { 

   await AsyncStorage.clear()
  }
   a()
 },[])   */




  return (
    <>
    <View style={{}}>

        <TouchableOpacity onPress={()=> setIsBulkDelete(!bulkDelete)}>
          <Text>Seç</Text>
        </TouchableOpacity>

        <SwipeListView   data={allNotes}  //redux'taki note state'ini listele  (bu state aynı zamanda redux-persist ile localStorage ile senktronize)
 
        style={{height:Dimensions.get('window').height/1.2, padding:10 /*flatliste height vererek plusbutton'u position:absolute gibi kullanabildik*/}}
        renderItem={({item}) => <NoteCard message={item} bulkDelete={bulkDelete} isPinned={item.isPinned} onPress={() => navigateToNote(item.note, item.id, item.isPinned)} />}
        
        renderHiddenItem={ (data, rowMap) => (
            <View style={styles.rowBack}>
              {
                data.item.isPinned==false ? 
                <Icon 
                onPress={() => handleDelete(data.item)}
                name={'delete'} color='white' size={30} style={styles.trash}
                >
                </Icon>
              : 
              <IONIcon 
                onPress={() => handleUnDelete(data.item)}
                name={'trash-bin'} color='white' size={30} style={[styles.trash, {backgroundColor:'black'} ]}
                >
              </IONIcon>
              }
                
                {
                data.item.isPinned==false? 
                <MCIIcon 
                onPress={() => handlePin(data.item)}
                name={'pin'} color='white' size={30} style={styles.pin}
                >
                </MCIIcon> 
                :
                 <MCIIcon 
                onPress={() => handleUnPin(data.item)}
                name={'pin-off'} color='white' size={30} style={styles.pin}
                >
                </MCIIcon> 
                }
            </View>
      )}
      leftOpenValue={105}
      rightOpenValue={0}
         />
        
       {!bulkDelete &&  <PlusButton icon={'plus'} onPress={navigateToWriter} />}

      </View>

      </>

  );
}

const styles = StyleSheet.create({
  
  rowBack: {
    alignItems: 'center',
    borderRadius:10,
    backgroundColor: '#f2f2f2',
    marginLeft:13,
    marginVertical:12,
    flex: 1,
    flexDirection: 'row',
    maxWidth:Dimensions.get('window').width/1.15,
    maxHeight: 73,

},
  trash: {
    backgroundColor:'#E64848',
    paddingVertical:18,
    width:55,
    textAlign:'center'

  },
  pin: {
    backgroundColor:'#fcc200',
    width:55, 
    textAlign:'center',
    paddingVertical:18
  }
});

export default Notes;
