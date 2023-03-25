import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { Animated, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import IonIcons from 'react-native-vector-icons/Ionicons' 
import EntIcons from 'react-native-vector-icons/Entypo' 
import MatIcons from 'react-native-vector-icons/MaterialIcons' 
import FoIcons from 'react-native-vector-icons/Fontisto'

import { handleDrawerStatus,closeDrawer,openColorModal } from '../store/notLocalStorageSlicer/nonLocalNoteSlice';
import { useDispatch,useSelector } from 'react-redux';
import { changeNightMode, changeNoteColor } from '../store/localStorageSlicer/noteSlice';

function DrawerMenu({handleBulkSelection}) {  //notları seç'i prop alarak yapmışız ama burdanda yapılabilirdi
//    backgroundColor: '#5359D1',

    const dispatch = useDispatch()

    const [nightMode, setNightMode] = useState(false)  
     
    const noteColor = useSelector((state)=> state.notes.noteColor)

    const handleNightMode=  () => {
        if( noteColor=='white'){   
          dispatch(changeNoteColor('#171515'))
        }
        if(noteColor=='#171515'){
          dispatch(changeNoteColor('white'))
        }
        //gece-gündüz modu değişirken not rengindeki siyah ve beyaza özel değişim

        setNightMode(!nightMode)
        dispatch(changeNightMode())
    }


    const handleColorPaletteModal = () => {
      dispatch(openColorModal())
      dispatch(closeDrawer())  //drawer'i kapat
    }

    


    return(
    <View style={styles.container}>
        <View style={styles.drawerContainer}>
            
          {nightMode ? <EntIcons name='light-up' size={25}  onPress={handleNightMode} style={styles.mode}  /> :
         <IonIcons name='md-moon' size={25} color={'black'} onPress={handleNightMode} style={styles.mode} /> }



         <TouchableOpacity style={{marginTop:55}} onPress={handleBulkSelection}>
         <View style={styles.seperator}></View>

            <View style={styles.bulkDeletionWrapper}>
         <Text style={styles.bulkDeletionText}>Notları seç</Text>
            <IonIcons name='checkmark-circle-outline' size={20} color='black' />
            </View>
         </TouchableOpacity>

         <View style={styles.seperator}></View>

         <TouchableOpacity onPress={handleColorPaletteModal}>
            <View style={styles.bulkDeletionWrapper}>
         <Text style={styles.bulkDeletionText}>Renk seç</Text>
            <IonIcons name='color-palette-outline' size={20} color='black' />
            </View>
         </TouchableOpacity>
        
         <View style={styles.seperator}></View>




        </View>
    </View>
    )
}

const styles = StyleSheet.create({
  container: {
    zIndex:2,
    position:'absolute',
    width:230,
    height:250,
    backgroundColor:'#f4f4f6',
    top:5,
    right:5,
    borderRadius:20,
    borderWidth:0.9,

  },
  drawerContainer:{
    display:'flex',
  },
  mode:{
    position:'absolute',
    left:8,
    top:10
  },
  bulkDeletionWrapper:{
    flexDirection:'row'

  },
  bulkDeletionText:{
    marginLeft:10,
    flex:1,
    fontWeight:500,
    fontSize:17,
    color:'black'
  },
  seperator:{
    borderWidth:0.6,
    borderColor:'#e0e0e0',
    marginVertical:3
  }
});

export default DrawerMenu