import React, {useState} from 'react';
import {StyleSheet, Text, useColorScheme, View, Button} from 'react-native';

import Notebook from './pages/Notebook';
import NoteWriter from './pages/NoteWriter';
import Note from './pages/Note';
import { setDrawerOpen,handleBulkDeleteStatus,closeDrawer } from './store/notLocalStorageSlicer/nonLocalNoteSlice';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useDispatch,useSelector} from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import IONIcon from 'react-native-vector-icons/Ionicons'

function Router() {
  const dispatch = useDispatch();


  const Stack = createNativeStackNavigator();

  const handleDrawer = () => {
    dispatch(setDrawerOpen())
  };

  const bulkDeleteStatus = useSelector((state)=> state.notLocalNotes.bulkDeleteStatus)
  const handleBulkDelete=() => {
    dispatch(closeDrawer())
    dispatch(handleBulkDeleteStatus())
    }

  const colorMode = useSelector((state) => state.notes.nightMode)
  function modeForNotebook() {
    if(colorMode) return '#423d3d'
    else return '#f2f1f6'
    
  }

  function mode() {
    if(colorMode) return '#423d3d'
    else return 'white'
    
  }

  


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Not Defteri"
          component={Notebook}
          options={{
            headerTitleAlign:!bulkDeleteStatus? 'left': 'center',
            headerStyle: {backgroundColor: modeForNotebook()},
            headerTitleStyle: {color: 'white', },
            title:'',
            headerRight: () => (
              <MCIIcon onPress={handleDrawer} name="dots-horizontal-circle-outline" color="#d7ac2a" size={30} />
            ),
            headerLeft: 
            () =>  (
           bulkDeleteStatus ? <IONIcon onPress={handleBulkDelete}
              name={'arrow-back-circle-outline'} 
              size={30} 
              color={'#d7ac2a'}
              style={{}} />  : null
            ),
          }}
        />

        <Stack.Screen
          name="Notlar"
          component={NoteWriter}
          options={{
            headerTitleAlign: 'left',
            title: 'Notlar',
            headerStyle: {backgroundColor: mode(),  },
            headerTintColor:'#d7ac2a',
            headerTitleStyle: {color: '#d7ac2a'},
          }}
        />

        <Stack.Screen name="Not" component={Note}
        options= {{
          headerStyle: {backgroundColor:mode()},
          headerTintColor:'#d7ac2a',
          headerTitleStyle: {color:'#d7ac2a', }
        }} />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}



export default Router;


const styles = StyleSheet.create({});
