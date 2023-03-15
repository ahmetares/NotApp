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

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

function App() {

  const Stack = createNativeStackNavigator();
  let persistor = persistStore(store)

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
         <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Not Defteri" component={Notebook} />
              <Stack.Screen name="Notlar" component={NoteWriter}
              options={{
                         }} />
              <Stack.Screen name="Not" component={Note} />
            </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>

  );
}

const styles = StyleSheet.create({

});

export default App;
