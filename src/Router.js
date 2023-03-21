import React, {useState} from 'react';
import {StyleSheet, Text, useColorScheme, View, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Notebook from './pages/Notebook';
import NoteWriter from './pages/NoteWriter';
import Note from './pages/Note';
import { useDispatch,useSelector} from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import { setDrawerOpen } from './store/notLocalStorageSlicer/nonLocalNoteSlice';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons'

function Router() {
  const dispatch = useDispatch();


  const Stack = createNativeStackNavigator();

  const handleDrawer = () => {
    dispatch(setDrawerOpen())
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Not Defteri"
          component={Notebook}
          options={{
            headerStyle: {backgroundColor: 'blue'},
            headerTitleStyle: {color: 'white'},
            headerRight: () => (
              <MCIIcon onPress={handleDrawer} name="dots-horizontal-circle-outline" color="white" size={30} />
            ),
          }}
        />

        <Stack.Screen
          name="Notlar"
          component={NoteWriter}
          options={{
            headerTitleAlign: 'left',
            title: 'Notlar',
            headerStyle: {backgroundColor: 'blue'},
            headerTitleStyle: {color: 'white'},
          }}
        />

        <Stack.Screen name="Not" component={Note} />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}



export default Router;


const styles = StyleSheet.create({});
