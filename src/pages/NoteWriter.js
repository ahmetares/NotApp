import React, { useEffect, useRef,useState } from 'react';
import { StyleSheet,Button, View,Keyboard, TextInput, Dimensions, KeyboardAvoidingView,ScrollView,Alert,  Modal } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { addNote } from '../store/localStorageSlicer/noteSlice'
import {useTranslation} from 'react-i18next';
import InAppReview from 'react-native-in-app-review';

import { showMessage, hideMessage } from "react-native-flash-message";

const deviceSize = Dimensions.get('window')

function NoteWriter({navigation}) {
  const {t} = useTranslation();

  const [text, setText] = useState('');
  const [colorMode, setColorMode] = useState('light');

  const notes = useSelector(state => state.notes.notes);
  const dispatch = useDispatch();

  const lightOrNightMode = useSelector(state => state.notes.nightMode);
  useEffect(() => {
    if (!lightOrNightMode) {
      setColorMode('light');
    } else {
      setColorMode('dark');
    }
  }, [lightOrNightMode]);

  //RATE APP

  const note = useSelector(state => state.notes.notes); //1 (pinsiz notlar)
  const pinnedNotes = useSelector(state => state.notes.pinnedNotes); //2 (pinli notlar)
  const allNotes = pinnedNotes.concat(note); //1+2 ( pinned note hep en üstte , pinned olmayanlarsa kendi kendine sortlandı)

  const rateApp = () => {
    InAppReview.isAvailable();

    // trigger UI InAppreview
    InAppReview.RequestInAppReview()
      .then(hasFlowFinishedSuccessfully => {
        // when return true in android it means user finished or close review flow
        console.log('InAppReview in android', hasFlowFinishedSuccessfully);

        // when return true in ios it means review flow lanuched to user.
        console.log(
          'InAppReview in ios has launched successfully',
          hasFlowFinishedSuccessfully,
        );

        // 1- you have option to do something ex: (navigate Home page) (in android).
        // 2- you have option to do something,
        // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

        // 3- another option:
        if (hasFlowFinishedSuccessfully) {
          console.log('okeyto you rated');
          // do something for ios
          // do something for android
        }

        // for android:
        // The flow has finished. The API does not indicate whether the user
        // reviewed or not, or even whether the review dialog was shown. Thus, no
        // matter the result, we continue our app flow.

        // for ios
        // the flow lanuched successfully, The API does not indicate whether the user
        // reviewed or not, or he/she closed flow yet as android, Thus, no
        // matter the result, we continue our app flow.
      })
      .catch(error => {
        //we continue our app flow.
        // we have some error could happen while lanuching InAppReview,
        // Check table for errors and code number that can return in catch.
        console.log(error);
      });
  };

  // RATE APP

  function handleNote() {
    if (!text.trim()) {
      console.log('mesaj yokki');
      showMessage({
        message: t('warn-empty-note'),
        type: 'danger',
      });
      return;
    }
    dispatch(
      addNote({
        id: Math.floor(Math.random() * 100000),
        note: text,
        date: new Date().toISOString(),
        isPinned: false,
      }),
    );
     if (allNotes.length === 3 || allNotes.length % 7 == 0) {
       rateApp();
     }
    navigation.navigate('Not Defteri');
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          color={'#d7ac2a'}
          title={t('write-note-right-header')}
          onPress={handleNote}></Button>
      ),
    });
  }, [navigation, text]);

  const inputRef = React.useRef();
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 50 : 0;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      enabled={true}
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={styles[colorMode].container}
      onTouchStart={() => inputRef.current.focus()}>
      <TextInput
        ref={inputRef}
        placeholderTextColor="grey"
        placeholder={t('write-note-input-placeholder')}
        style={styles[colorMode].input}
        onChangeText={setText}
        multiline
        textAlignVertical="top"
      />
    </KeyboardAvoidingView>
  );
}

const base_style = {
  container: {
    flex:1,
  },
  input: {
    flex:1,
    paddingLeft:12,
    fontSize: 17,
    marginVertical:10,
    marginBottom:'10%'
  }
}


const styles = {

  light: StyleSheet.create({
    ...base_style,
    container:{
      ...base_style.container,
      backgroundColor:'white',
    },

    input:{
      ...base_style.input,
      color:'black'
    },
  
    button_container:{
      backgroundColor:'white'
    }
  }),

  dark: {
    ...base_style,
    container:{
      ...base_style.container,
      backgroundColor:'#423d3d',
    },

    input:{
      ...base_style.input,
      color:'white'
  
    },
    button_container:{
      backgroundColor:'black'
    }
  }
}

export default NoteWriter;



