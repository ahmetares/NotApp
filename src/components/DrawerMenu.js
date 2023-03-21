import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { Animated, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import IonIcons from 'react-native-vector-icons/Ionicons' 
import EntIcons from 'react-native-vector-icons/Entypo' 
import MatIcons from 'react-native-vector-icons/MaterialIcons' 
import FoIcons from 'react-native-vector-icons/Fontisto'

import { handleDrawerStatus } from '../store/notLocalStorageSlicer/nonLocalNoteSlice';
import { useDispatch } from 'react-redux';
import { changeNightMode } from '../store/localStorageSlicer/noteSlice';

function DrawerMenu({handleBulkSelection, handleDesignChange}) {
//    backgroundColor: '#5359D1',

    const dispatch = useDispatch()

    const [nightMode, setNightMode] = useState(false)  //ikiside localSlice ile bağlantılı olsun
    const [tableMode, setTableMode] = useState(false)

    const handleNightMode=  () => {
        setNightMode(!nightMode)
        dispatch(changeNightMode())
    }

    const handleTableMode=  () => {
        setTableMode(!tableMode)
    }

    return(
    <View style={styles.container}>
        <View style={styles.drawerContainer}>
            
          {nightMode ? <EntIcons name='light-up' size={30}  onPress={handleNightMode} style={styles.mode}  /> :
         <IonIcons name='md-moon' size={30} color={'black'} onPress={handleNightMode} style={styles.mode} /> }


        <TouchableOpacity style={{marginTop:55}} onPress={handleTableMode}>
            {!tableMode ? 
            <View style={styles.bulkDeletionWrapper}>
         <Text style={styles.bulkDeletionText}>Galeri Olarak Göster</Text>
            <FoIcons name='table-1' size={20} color='black' style={{marginRight:2, marginTop:3}} />
            </View> 
            : 
            <View style={styles.bulkDeletionWrapper}>
            <Text style={styles.bulkDeletionText}>Liste Olarak Göster</Text>
               <MatIcons name='table-rows' size={20} color='black' style={{marginRight:2, marginTop:3}}/>
               </View>
             }
         </TouchableOpacity>

         <View style={styles.seperator}></View>

         <TouchableOpacity onPress={handleBulkSelection}>
            <View style={styles.bulkDeletionWrapper}>
         <Text style={styles.bulkDeletionText}>Notları Seç</Text>
            <IonIcons name='checkmark-circle-outline' size={25} color='black' />
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
    width:200,
    height:250,
    backgroundColor:'#f4f4f6',
    top:5,
    right:3,
    borderRadius:20,
    borderWidth:0.9
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
    fontWeight:'bold',
    fontSize:17
  },
  seperator:{
    borderWidth:0.6,
    borderColor:'#e0e0e0',
    marginVertical:3
  }
});

export default DrawerMenu