/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Notebook from './src/pages/Notebook';
import NoteWriter from './src/pages/NoteWriter';
import Note from './src/pages/Note';

import store from './src/store/store'
import { Provider } from 'react-redux'
import { useDispatch,useSelector } from 'react-redux';7
import Button from './src/components/Button';

function App() {

  const Stack = createNativeStackNavigator();


  const handleNote = () => {
    const dispatch = useDispatch()
    

  }

  return (
    <Provider store={store}>
    <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name="Not Defteri" component={Notebook} />
        <Stack.Screen name="Notlar" component={NoteWriter}
        options={{
        }} />
      <Stack.Screen name="Not" component={Note} />
      </Stack.Navigator>
    </NavigationContainer>

    </Provider>

  );
}

const styles = StyleSheet.create({

});

export default App;
