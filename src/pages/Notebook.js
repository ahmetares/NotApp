import React, {useEffect,useState,useCallback} from 'react';
import {StyleSheet,Text,View,TouchableOpacity,FlatList,TouchableWithoutFeedback,Dimensions,Alert} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { showMessage, hideMessage } from "react-native-flash-message";
import { SwipeListView } from 'react-native-swipe-list-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign' // ekstra npm i --save-dev @types/react-native-vector-icons  yapınca calıstı ayrıca bu paket için android ve iosda konfig. yapılmalı
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import IONIcon from 'react-native-vector-icons/Ionicons'

import IconButton from '../components/IconButton';
import NoteCard from '../components/NoteCard';
import DrawerMenu from '../components/DrawerMenu';
import { deleteNote,pinNote,unPinNote,deleteBulky } from '../store/localStorageSlicer/noteSlice';
import { changeBoole2, setDrawerOpen,closeDrawer,handleDrawerStatus } from '../store/notLocalStorageSlicer/nonLocalNoteSlice';


function Notes({navigation}) {
  const dispatch = useDispatch()

  const [isPinned, setPinned] = useState(false)
  const [bulkDelete, setIsBulkDelete] = useState(false)


  const note = useSelector((state)=> state.notes.notes)              //1
  const pinnedNotes = useSelector((state)=> state.notes.pinnedNotes) //2
  const allNotes = pinnedNotes.concat(note)                          //1+2 (flatlist'e bunu verdik, pinned note hep en üstte , pinned olmayanlarsa kendi kendine sortlandı)



 //////////NAVIGATIONLAR////////////////
 const navigateToWriter = () => { navigation.navigate('Notlar') }
 const navigateToNote = (note,id,isPinned) => {
  navigation.navigate('Not',{note,id,isPinned})
 }


 //////////NOTU SİLME////////////////
 const handleDelete = (item) => {
  Alert.alert('Notu sil','Notu silmek istediğinizden emin misiniz?', [
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
 //////////SABİT NOTU SİLEMEME////////////////
 const handleUnDelete = (item) => {
  showMessage({
    message: "Sabitlenmiş notlar silinemez",
    type: "danger",
  });
 }

 //////////NOT SABİTLEME////////////////
  const handlePin = (item) => {
  setPinned(!isPinned)
  dispatch(pinNote(item.id))

 } 

 //////////NOTU SABİTLEMEDEN ÇIKARMA////////////////
 const handleUnPin = (item) => {
  setPinned(!isPinned)
  dispatch(unPinNote(item.id))
 }

 //////////TOPLU SİLME MODUNU AÇMA////////////////
 const handleBulkDelete=() => {
      setIsBulkDelete(!bulkDelete)
      dispatch(handleDrawerStatus())
      dispatch(closeDrawer())

 }

//////////TOPLU SİLME///////////////////////////
const selectedBulkNotes = useSelector((state)=> state.notLocalNotes.bulkDelete)
 console.log('bulk deletionÇ: ' , selectedBulkNotes)
 
 const confirmBulkDelete= () => {
  Alert.alert('Toplu silme','Notları toplu şekilde silmek istediğinizden emin misiniz?', [
    {
      text: 'Vazgeç',
      style: 'cancel',
    },
    {
      text: 'Sil', 
      onPress: () => {
        dispatch(deleteBulky(selectedBulkNotes))
        showMessage({
          message: "Notlar silindi",
          type: "danger",
        });
        handleBulkDelete()
      }
     } ,
  ])
 }


  
 const states = useSelector((state)=> state.notes)
 const states2 = useSelector((state)=> state.notLocalNotes)

 const drawerMenu =  useSelector((state)=> state.notLocalNotes.isDrawerOpen)

 useEffect(()=> {
   console.log('stateler bunlar:' , states)
   //console.log('nonLocalstateler bunlar:' , states2)

 },[states])



  return (
    <>
    <View style={{}}>

      {drawerMenu? <DrawerMenu handleBulkSelection={handleBulkDelete} /> : null}

         {drawerMenu ?    //DRAWER DIŞINA TIKLANINCA KAPATMA FONKSİYONU
        <TouchableWithoutFeedback onPress={()=>dispatch(closeDrawer())} >
            <View style={[StyleSheet.absoluteFillObject, {flex:1, zIndex:1 }]}  />
      </TouchableWithoutFeedback> : null }


        {bulkDelete? <TouchableOpacity onPress={handleBulkDelete}>
          <Text style={styles.cancelBulkSelection}>İptal</Text>
        </TouchableOpacity> : null}

        <SwipeListView data={allNotes}  
 
        style={{height:Dimensions.get('window').height/1, padding:10 /*flatliste height vererek plusbutton'u position:absolute gibi kullanabildik*/}}
        renderItem={({item}) => <NoteCard message={item} bulkDelete={bulkDelete} isPinned={item.isPinned} onPress={() => navigateToNote(item.note, item.id, item.isPinned)} />}
        
        renderHiddenItem={ (data, rowMap) => (
            <View style={styles.rowBack}>
              {
                data.item.isPinned==false ?     //DELETE ICON - ACCORDING TO PIN STATUS
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
                data.item.isPinned==false?    //PIN ICON - ACCORDING TO PIN STATUS
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
        
       {!bulkDelete ?            //PLUS or BULK DELETE BUTTON
       <IconButton icon={'plus'} 
       color={'white'} 
       style={{backgroundColor:'blue'}}
       onPress={navigateToWriter} /> 
       : 
       <IconButton icon={'delete'} 
       color={'white'} 
       style={{backgroundColor:'red'}}
       onPress={confirmBulkDelete} />}




      </View>
   
    

      </>

  );
}

const styles = StyleSheet.create({
  
  rowBack: {
    alignItems: 'center',
    borderRadius:10,
    backgroundColor: '#f2f2f2',
    marginLeft:14,
    marginVertical:1,
    flex: 1,
    flexDirection: 'row',
    maxWidth:Dimensions.get('window').width/1.15,
    maxHeight: 73,

},
  trash: {
    backgroundColor:'#fd3b31',
    paddingVertical:18,
    width:55,
    textAlign:'center',

  },
  pin: {
    backgroundColor:'#fe9400',
    width:55, 
    textAlign:'center',
    paddingVertical:18
  },
  cancelBulkSelection: {
    fontSize:30,
    marginLeft:20
   
  }
});

export default Notes;
