import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Share,Text, View, TextInput,TouchableOpacity, FlatList, TouchableWithoutFeedback, Dimensions, Alert } from 'react-native';

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
import Header from '../components/Header';
import { deleteNote, pinNote, unPinNote, deleteBulky } from '../store/localStorageSlicer/noteSlice';
import { changeBoole2, setDrawerOpen, closeDrawer, closeColorModal,handleDrawerStatus, handleBulkDeleteStatus } from '../store/notLocalStorageSlicer/nonLocalNoteSlice';
import ColorPaletteModal from '../components/ColorPaletteModal';
import store from '../store/store';
import LongPressComponent from '../components/LongPressComponent';
import LongPressModal from '../components/LongPressModal';



function Notes({ navigation }) {
  const dispatch = useDispatch()

  const [isPinned, setPinned] = useState(false)
  const [bulkDelete, setIsBulkDelete] = useState(false)
  const [colorMode, setColorMode] = useState('light')

  const note = useSelector((state) => state.notes.notes)              //1 (pinsiz notlar)
  const pinnedNotes = useSelector((state) => state.notes.pinnedNotes) //2 (pinli notlar)
  const allNotes = pinnedNotes.concat(note)                          //1+2 ( pinned note hep en üstte , pinned olmayanlarsa kendi kendine sortlandı)
  const [list, setList] = useState(allNotes)                          //en son flatliste bunu verdik search bar ile uyumlu olması  için        
  

  useEffect(() => {                                                   //store.subscribe ile herhangi değişiklikte yakaladık, başka türlü olmadı
    const unsubscribe = store.subscribe(() => {
      const note = store.getState().notes.notes;
      const pinnedNotes = store.getState().notes.pinnedNotes;
      const allNotes = pinnedNotes.concat(note);
      setList(allNotes);
    });
    return unsubscribe;
  }, []);


 
  //////////NAVIGATIONLAR////////////////
  const navigateToWriter = () => { navigation.navigate('Notlar') }
  const navigateToNote = (note, id, isPinned) => {
    navigation.navigate('Not', { note, id, isPinned })
  }
  const navigateToNoteFromModal = (note, id, isPinned) => {
    setLongPressModal(false)
    navigation.navigate('Not', { note, id, isPinned })
  }


  //////////NOTU SİLME////////////////
  const handleDelete = (id) => {
    Alert.alert('Notu sil', 'Notu silmek istediğinizden emin misiniz?', [
      {
        text: 'Vazgeç',
        style: 'cancel',
      },
      {
        text: 'Sil',
        onPress: () => {
          dispatch(deleteNote(id))
          setLongPressModal(false)

        }
      },
    ])
  }
  //////////SABİT NOTU SİLEMEME////////////////
  const handleUnDelete = () => {
    showMessage({
      message: "Sabitlenmiş notlar silinemez",
      type: "danger",
    });
  }

  //////////NOT SABİTLEME////////////////
  const handlePin = (id) => {
    setPinned(!isPinned)
    dispatch(pinNote(id))
    setLongPressModal(false)
  }

  //////////NOTU SABİTLEMEDEN ÇIKARMA////////////////
  const handleUnPin = (id) => {
    setPinned(!isPinned)
    dispatch(unPinNote(id))
    setLongPressModal(false)
   // const index = allNotes.findIndex(x => x.id === item.id)
  }

  //////////TOPLU SİLME MODUNU AÇMA (useEffect) ve REDUXSTATE'lerini Güncelleme////////////////
  const bulkDeleteStatus = useSelector((state) => state.notLocalNotes.bulkDeleteStatus)

  const handleBulkDelete = () => {
    dispatch(closeDrawer())  //drawer'i kapat
    dispatch(handleBulkDeleteStatus())  //bulk status'unu tam tersi yap  
  }

  useEffect(() => {
    setIsBulkDelete(bulkDeleteStatus)  //bulk statusune göre usestate'deki bulkdelete modunu aç kapat - componentlerde bunu kullandık

  }, [bulkDeleteStatus])

  //////////TOPLU SİLME///////////////////////////
  const selectedBulkNotes = useSelector((state) => state.notLocalNotes.bulkDelete)  
  //selectedBulkNotes'u NoteCard'dan içini doldurduk (popBulkDelete, pushBulkDelete)

  const confirmBulkDelete = () => {
    if (!(selectedBulkNotes.length > 0)) {
      showMessage({
        message: "Lütfen silmek istediğiniz notları seçin",
        type: "danger",
      });
      return
    }
    Alert.alert('Toplu silme', 'Notları toplu şekilde silmek istediğinizden emin misiniz?', [
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
          handleBulkDelete()  //toplu silme işlemi bitince herşeyin kapanması için
        }
      },
    ])
  }

  //////////GECE GÜNDÜZ MODU///////////////////////////

  const lightOrNightMode = useSelector((state) => state.notes.nightMode)

  useEffect(() => {
    if (!lightOrNightMode) {
      setColorMode('light')
    } else {
      setColorMode('dark')

    }
  }, [lightOrNightMode])


  //////////RENK SEÇME MODAL İŞLEMLERİ///////////////////////////
  const colorModalStatus = useSelector((state) => state.notLocalNotes.isColorModalOpen)
  const [isModalVisible, setModalVisible] = useState(false);

  const handleCloseModal = () => {
    setModalVisible(false);
    dispatch(closeColorModal())  //colorModalStatus = false
  };

  useEffect(()=> {
    setModalVisible(colorModalStatus)  //useState'deki state'in açık olup olmaması Reduxtaki colorModalStatus'e göre değişir
                                      //colorModalStatus Renkleri seç'e basınca true olur
  },[colorModalStatus])

//////////////LONG PRESS MODAL İŞLEMLERi///////////////////

const [longPressModal, setLongPressModal] = useState(false)
const [longPressedNote, setLongPressedNote] = useState('')
const [longPressedId, setLongPressedId] = useState(null)
const [longPressedNotePinned, setLongPressedNotePinned] = useState(null)


const handleLongPress = (note,id,isPinned) => {
  console.log('uzun baston')
  setLongPressModal(true)
  setLongPressedNote(note)
  setLongPressedId(id)
  setLongPressedNotePinned(isPinned)
}

const handleCloseLongPressModal = () => {
  console.log('closed')
  setLongPressModal(false)
  setLongPressedNote('')
  setLongPressedId(null)
  setLongPressedNotePinned(null)
}

  //////////SEARCH İŞLEMLERİ///////////////////////////

    const handleSearchBar = text => {
      const filteredList = allNotes.filter(note => {

        const searchedText = text.toLowerCase()
        const currentTitle = note.note.toLowerCase()  //searchbar ve notlar ın ikisinide küçük harf yaptık
        return currentTitle.indexOf(searchedText) > -1   
        //mesela currentTitle = ABC  searchedText = F    -1 döner  ama searchedText = C  2 döner
        })

        setList(filteredList)

    }

  ////////////SHARE ///////////////////
  const  onShare = async (note) => {
    try {
      const result = await Share.share({
        message:note      
      });
      
  }
  catch(error) {
      Alert.alert(error.message);
  }
}



////////////////////STATE KONTROLÜ//////////////////////////////////
  const states = useSelector((state) => state.notes)
  const states2 = useSelector((state) => state.notLocalNotes)


  useEffect(() => {
    //console.log('stateler bunlar:' , states)
   // console.log('nonLocalstateler bunlar:', states2)

  }, [states2])




///////////////////////////////////////////////////////
  const drawerMenu = useSelector((state) => state.notLocalNotes.isDrawerOpen)


  return (
    <>
      <View style={styles[colorMode].container}>
      

        {drawerMenu ? <DrawerMenu handleBulkSelection={handleBulkDelete} /> : null}

        {drawerMenu ?    //DRAWER DIŞINA TIKLANINCA KAPATMA FONKSİYONU
          <TouchableWithoutFeedback onPress={() => dispatch(closeDrawer())} >
            <View style={[StyleSheet.absoluteFillObject, { flex: 1, zIndex: 1 }]} />
          </TouchableWithoutFeedback> : null}
          

        <SwipeListView 
          data={list}
  
          renderItem={({ item }) => 
          <NoteCard 
          message={item} 
          bulkDelete={bulkDelete} 
          isPinned={item.isPinned} 
          theme={colorMode} 
          handleLongPress={() => handleLongPress(item.note,item.id,item.isPinned)} 
          onPress={() => navigateToNote(item.note, item.id, item.isPinned)} />}

          ListHeaderComponent={<Header onText={handleSearchBar}/>}
          
          keyExtractor={list => list.id}
          
          renderHiddenItem={(data, rowMap) => (
            <View style={styles[colorMode].rowBack}>
              {
                data.item.isPinned == false ?     //DELETE ICON - ACCORDING TO PIN STATUS
                  <Icon
                    onPress={() => handleDelete( data.item.id)}
                    name={'delete'} color='white' size={30} style={styles[colorMode].trash}
                  >
                  </Icon>
                  :
                  <IONIcon
                    onPress={() => handleUnDelete(data.item.id)}
                    name={'trash-bin'} color='white' size={30} style={[styles[colorMode].trash, { backgroundColor: 'black' }]}
                  >
                  </IONIcon>
              }

              {
                data.item.isPinned == false ?    //PIN ICON - ACCORDING TO PIN STATUS
                  <MCIIcon
                    onPress={() => handlePin(data.item.id)}
                    name={'pin'} color='white' size={30} style={styles[colorMode].pin}
                  >
                  </MCIIcon>
                  :
                  <MCIIcon
                    onPress={() => handleUnPin( data.item.id)}
                    name={'pin-off'} color='white' size={30} style={styles[colorMode].pin}
                  >
                  </MCIIcon>
              }

              <IONIcon onPress={() => onShare(data.item.note)}
              name={'share-outline'} color='white' size={30} style={styles[colorMode].share}>
                
              </IONIcon>
            </View>
          )}
          closeOnRowBeginSwipe
          closeOnRowOpen
          leftOpenValue={110}
          rightOpenValue={-60}
        
          />

        <ColorPaletteModal
          visible={isModalVisible}
          onClose={handleCloseModal}
        />

        <LongPressModal 
        visible= {longPressModal}
        onClose = {handleCloseLongPressModal}
        note={longPressedNote}
        isPinned={longPressedNotePinned}
        navigateToNote={()=> navigateToNoteFromModal(longPressedNote,longPressedId,longPressedNotePinned)}
        pinFromModal = {longPressedNotePinned ? ()=> handleUnPin(longPressedId) : ()=> handlePin(longPressedId)}
        deleteFromModal = {() => handleDelete(longPressedId)}
        />

        {!bulkDelete ?            //PLUS or BULK DELETE BUTTON
          <IconButton icon={'plus'}
            color={'white'}
            style={{ backgroundColor: '#d7ac2a' }}
            onPress={navigateToWriter} />
          :
          <IconButton icon={'delete'}
            color={'white'}
            style={{ backgroundColor: 'red' }}
            onPress={confirmBulkDelete} />}

      </View>



    </>

  );
}

const base_style = {
  container: {
    flex:1,
    
  },
  rowBack: {
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 14,
    marginVertical: 10,
    flexDirection: 'row',
    maxWidth: Dimensions.get('window').width / 1.15,
    height: 75,

  },
  trash: {
    paddingVertical: 17,
    width: 55,
    textAlign: 'center',
    backgroundColor: '#fd3b31',
  },
  pin: {
    width: 55,
    textAlign: 'center',
    paddingVertical: 17,
    backgroundColor: '#fe9400',
  },
  share: {
    position:'absolute',
    paddingVertical: 17,
    width: 55,
    right:-22,
    textAlign: 'center',
    backgroundColor: '#787aff',

  },
  cancelBulkSelection: {
    marginLeft: 20,
  },
  title:{
    marginLeft:9,
    fontWeight:'bold',
    fontSize:35,
  },
  searchContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 8,
    height:40,
    marginVertical:4,
    marginHorizontal:10,
  },
  search:{
    marginBottom:-3,
    fontSize:15,
    marginLeft:5,
    height:35,
    flex:1

  }
}

const styles = {
  light: StyleSheet.create({
    ...base_style,
    container: {
      ...base_style.container,
      backgroundColor: '#f2f1f6'
    },
    rowBack: {
      ...base_style.rowBack,
      backgroundColor: '#f2f2f2',
    },
    title:{
      ...base_style.title,
      color:'black'
    },
    searchContainer:{
      ...base_style.searchContainer,
      backgroundColor: '#e4e3e8',
    }
  }),
  dark: {
    ...base_style,
    container: {
      ...base_style.container,
      backgroundColor: '#423d3d'
    },
    rowBack: {
      ...base_style.rowBack,
      backgroundColor: '#423d3d',
    },

    title:{
      ...base_style.title,
      color:'#f2f1f6'
    },
    searchContainer:{
      ...base_style.searchContainer,
      backgroundColor: '#dedddc',
    }
  },



}



export default Notes;
