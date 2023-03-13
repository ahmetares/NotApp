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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setItemsToStorage } from '../utils/AsyncStorage';




function Notes({navigation}) {

  const note = useSelector((state)=> state.counter.notes)
  const dispatch = useDispatch()




  /*useEffect(() => {
    const setItemsToStorage = async ()  => {
      try {
        await AsyncStorage.setItem('notes', JSON.stringify(note));
      } catch (error) {
        console.log(error);
      }
    };
    
    const getDataFromStorage = async () => {
      const datas = await JSON.parse(await AsyncStorage.getItem('notes'))
      return datas
    }

    const fetchData = async() => {
       const dataFromStorage = await getDataFromStorage()
       setData(dataFromStorage)
       console.log(data)
    }

     setItemsToStorage().then(fetchData)

  }, [note]); */


  

  const [data,setData] = useState([])

  function getUnique(arr, comp) {
    const unique = arr
       .map(e => e[comp])
       // Store the keys of the unique objects
       .map((e, i, final) => final.indexOf(e) === i && i)
       // Eliminate the dead keys & store unique objects
       .filter(e => arr[e]).map(e => arr[e]);
   return unique;
  }


  /* useEffect(() => {  //1 ve 2
    async function getNotes() {
      const existingNotes = await JSON.parse(await AsyncStorage.getItem('notes')) || []; // mevcut verileri alın
      const updatedNotes = [...existingNotes, ...note];  // updatedNotes  [{"id": 7401, "note": "1"}, {"id": 36804, "note": "2"}, {"id": 40496, "note": "3"}, {"id": 7401, "note": "1"}, {"id": 36804, "note": "2"}, {"id": 40496, "note": "3"}, {"id": 96853, "note": "4"}]
      const uniqueData = getUnique(updatedNotes, "id");   //unique [{"id": 7401, "note": "1"}, {"id": 36804, "note": "2"}, {"id": 40496, "note": "3"}, {"id": 96853, "note": "4"}]
      setData(uniqueData);
      await AsyncStorage.setItem('notes', JSON.stringify(uniqueData));
      

      console.log('...note: ', ...note,
                    'existingNotes ', existingNotes,
                    'updatedNotes ', updatedNotes,
                    'uniqueData ', uniqueData)


        
      }
    
    getNotes();
  }, [note]);   */

  useEffect(() => {
    async function getNotes() {
      const existingNotes = await JSON.parse(await AsyncStorage.getItem('notes')) || [];
  
      let updatedNotes;
      const noteIndex = existingNotes.findIndex(n => n.id === note.id);
  
      if (noteIndex === -1) {
        updatedNotes = [...existingNotes, note];
      } else {
        updatedNotes = [
          ...existingNotes.slice(0, noteIndex),
          note,
          ...existingNotes.slice(noteIndex + 1)
        ];
      }
  
      const uniqueData = updatedNotes.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);
  
      setData(uniqueData);
      await AsyncStorage.setItem('notes', JSON.stringify(uniqueData));
  
      console.log('...note: ', ...note,
                  'existingNotes ', existingNotes,
                  'updatedNotes ', updatedNotes,
                  'uniqueData ', uniqueData);
    }
  
    getNotes();
  }, [note]);


  
  /*useEffect(()=> {
    const getLocalStorageData = async () => {
   
      const datas = await JSON.parse(await AsyncStorage.getItem('notes'))
      setData(datas)
    }

    getLocalStorageData()

  },[note]) */


  /*useEffect(()=> {
    const clearAsyncStorage = async () => {
      try {
        await AsyncStorage.clear();
        console.log('AsyncStorage successfully cleared!');
      } catch (error) {
        console.log(error);
      }
    };
    clearAsyncStorage()
  },[]) /*


/*useEffect(() => {
  const fetchData = async () => {
    try {
      const newData = await JSON.parse(await AsyncStorage.getItem('notes'));
      setData(newData);
    
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
}, [note]); */


  

  
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
    <View>
        <SwipeListView   data={note}   //local storage'a göre değil
 
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
