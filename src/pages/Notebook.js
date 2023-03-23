import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, TouchableWithoutFeedback, Dimensions, Alert } from 'react-native';

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
import { deleteNote, pinNote, unPinNote, deleteBulky } from '../store/localStorageSlicer/noteSlice';
import { changeBoole2, setDrawerOpen, closeDrawer, closeColorModal,handleDrawerStatus, handleBulkDeleteStatus } from '../store/notLocalStorageSlicer/nonLocalNoteSlice';
import ColorPaletteModal from '../components/ColorPaletteModal';


function Notes({ navigation }) {
  const dispatch = useDispatch()

  const [isPinned, setPinned] = useState(false)
  const [bulkDelete, setIsBulkDelete] = useState(false)
  const [colorMode, setColorMode] = useState('light')

  const note = useSelector((state) => state.notes.notes)              //1
  const pinnedNotes = useSelector((state) => state.notes.pinnedNotes) //2
  const allNotes = pinnedNotes.concat(note)                          //1+2 (flatlist'e bunu verdik, pinned note hep en üstte , pinned olmayanlarsa kendi kendine sortlandı)



  //////////NAVIGATIONLAR////////////////
  const navigateToWriter = () => { navigation.navigate('Notlar') }
  const navigateToNote = (note, id, isPinned) => {
    navigation.navigate('Not', { note, id, isPinned })
  }


  //////////NOTU SİLME////////////////
  const handleDelete = (item) => {
    Alert.alert('Notu sil', 'Notu silmek istediğinizden emin misiniz?', [
      {
        text: 'Vazgeç',
        style: 'cancel',
      },
      {
        text: 'Sil',
        onPress: () => {
          dispatch(deleteNote(item.id))
        }
      },
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
  console.log('bulk deletionÇ: ', selectedBulkNotes)

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
          handleBulkDelete()
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


  //////////MODAL İŞLEMLERİ///////////////////////////
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



  /////////////////////////////////////

  const states = useSelector((state) => state.notes)
  const states2 = useSelector((state) => state.notLocalNotes)

  const drawerMenu = useSelector((state) => state.notLocalNotes.isDrawerOpen)

  useEffect(() => {
    //console.log('stateler bunlar:' , states)
    console.log('nonLocalstateler bunlar:', states2)

  }, [states2])





  return (
    <>
      <View style={styles[colorMode].container}>

        {drawerMenu ? <DrawerMenu handleBulkSelection={handleBulkDelete} /> : null}

        {drawerMenu ?    //DRAWER DIŞINA TIKLANINCA KAPATMA FONKSİYONU
          <TouchableWithoutFeedback onPress={() => dispatch(closeDrawer())} >
            <View style={[StyleSheet.absoluteFillObject, { flex: 1, zIndex: 1 }]} />
          </TouchableWithoutFeedback> : null}


        <SwipeListView data={allNotes}

          style={{ height: Dimensions.get('window').height - 80, padding: 10 /*flatliste height vererek plusbutton'u position:absolute gibi kullanabildik*/ }}
          renderItem={({ item }) => <NoteCard message={item} bulkDelete={bulkDelete} isPinned={item.isPinned} theme={colorMode} onPress={() => navigateToNote(item.note, item.id, item.isPinned)} />}

          renderHiddenItem={(data, rowMap) => (
            <View style={styles[colorMode].rowBack}>
              {
                data.item.isPinned == false ?     //DELETE ICON - ACCORDING TO PIN STATUS
                  <Icon
                    onPress={() => handleDelete(data.item)}
                    name={'delete'} color='white' size={30} style={styles[colorMode].trash}
                  >
                  </Icon>
                  :
                  <IONIcon
                    onPress={() => handleUnDelete(data.item)}
                    name={'trash-bin'} color='white' size={30} style={[styles[colorMode].trash, { backgroundColor: 'black' }]}
                  >
                  </IONIcon>
              }

              {
                data.item.isPinned == false ?    //PIN ICON - ACCORDING TO PIN STATUS
                  <MCIIcon
                    onPress={() => handlePin(data.item)}
                    name={'pin'} color='white' size={30} style={styles[colorMode].pin}
                  >
                  </MCIIcon>
                  :
                  <MCIIcon
                    onPress={() => handleUnPin(data.item)}
                    name={'pin-off'} color='white' size={30} style={styles[colorMode].pin}
                  >
                  </MCIIcon>
              }
            </View>
          )}
          leftOpenValue={115}
          rightOpenValue={0}
        />

        <ColorPaletteModal
          visible={isModalVisible}
          onClose={handleCloseModal}
        />

        {!bulkDelete ?            //PLUS or BULK DELETE BUTTON
          <IconButton icon={'plus'}
            color={'white'}
            style={{ backgroundColor: 'blue' }}
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
    paddingVertical: 18.2,
    width: 55,
    textAlign: 'center',

  },
  pin: {
    width: 55,
    textAlign: 'center',
    paddingVertical: 18
  },
  cancelBulkSelection: {
    marginLeft: 20,

  }
}

const styles = {
  light: StyleSheet.create({
    ...base_style,
    container: {
      backgroundColor: '#f2f2f2'
    },
    rowBack: {
      ...base_style.rowBack,
      backgroundColor: '#f2f2f2',
    },
    trash: {
      ...base_style.trash,
      backgroundColor: '#fd3b31',
    },
    pin: {
      ...base_style.pin,
      backgroundColor: '#fe9400',

    }
  }),
  dark: {
    ...base_style,
    container: {
      backgroundColor: '#423d3d'
    },
    rowBack: {
      ...base_style.rowBack,
      backgroundColor: '#423d3d',
    },
    trash: {
      ...base_style.trash,
      backgroundColor: '#fd3b31',
    },
    pin: {
      ...base_style.pin,
      backgroundColor: '#fe9400',

    }
  },

}



export default Notes;
