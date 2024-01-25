import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import IonIcons from 'react-native-vector-icons/Ionicons'
import EntIcons from 'react-native-vector-icons/Entypo'
import MatIcons from 'react-native-vector-icons/MaterialIcons'
import FoIcon from 'react-native-vector-icons/Fontisto'

import { handleDrawerStatus, closeDrawer, openColorModal } from '../store/notLocalStorageSlicer/nonLocalNoteSlice';
import { useDispatch, useSelector } from 'react-redux';
import { changeNightMode, changeNoteColor,changeSortMethod, setListView } from '../store/localStorageSlicer/noteSlice';
import {useTranslation} from 'react-i18next';

function DrawerMenu({ handleBulkSelection }) {  //notları seç'i prop alarak yapmışız ama burdanda yapılabilirdi

      const {t} = useTranslation();

  const dispatch = useDispatch()
  const [nightMode, setNightMode] = useState(false)
  const noteColor = useSelector((state) => state.notes.noteColor)

  const handleNightMode = () => {
    if (noteColor == 'white') {
      dispatch(changeNoteColor('#171515'))
    }
    if (noteColor == '#171515') {
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


  //////////////ACCORDION
  const [showAccordion, setAccordion] = useState(false)
  const animationController = useRef(new Animated.Value(0)).current

  const toggleAccordion = () => {
    const config = {
      duration:400,
      toValue: showAccordion ? 0 : 1,
      useNativeDriver:true
    }
    Animated.timing(animationController,config).start()
    setAccordion(!showAccordion)
  }

  arrowTransform = animationController.interpolate({
    inputRange: [0,1],
    outputRange: ['0deg', '90deg']
  })

  
  const handleSortNew = () => {
    dispatch(changeSortMethod('newFirst'))
    dispatch(closeDrawer())
}

  const handleSortOld = () => {
      dispatch(changeSortMethod('oldFirst'))
      dispatch(closeDrawer())
  }

  const sortMethod = useSelector((state) => state.notes.sortMethod)
  
  //GalleryView-ListView
  const isListView = useSelector((state) => state.notes.listView)
  useEffect(()=> {
    console.log(isListView)

  },[])
  const changeViewMethod = () => {
    dispatch(setListView())
    dispatch(closeDrawer())
  }



  return (
    <View style={styles.container}>
      <View style={styles.drawerContainer}>
        {nightMode ? (
          <EntIcons
            name="light-up"
            size={25}
            onPress={handleNightMode}
            style={styles.mode}
          />
        ) : (
          <IonIcons
            name="md-moon"
            size={25}
            color={'black'}
            onPress={handleNightMode}
            style={styles.mode}
          />
        )}
        {isListView ? (
          <TouchableOpacity style={{marginTop: 55}} onPress={changeViewMethod}>
            <View style={styles.drawerTextWrapper}>
              <Text style={styles.drawerText}>{t('table-view-prompt')}</Text>
              <FoIcon name="table-1" size={18} color="black" />
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={{marginTop: 55}} onPress={changeViewMethod}>
            <View style={styles.drawerTextWrapper}>
              <Text style={styles.drawerText}>{t('list-view-prompt')}</Text>
              <IonIcons name="list-outline" size={20} color="black" />
            </View>
          </TouchableOpacity>
        )}

        <View style={styles.seperator}></View>

        <TouchableOpacity onPress={handleBulkSelection}>
          <View style={styles.drawerTextWrapper}>
            <Text style={styles.drawerText}>{t('bulk-selection-prompt')}</Text>
            <IonIcons name="checkmark-circle-outline" size={20} color="black" />
          </View>
        </TouchableOpacity>

        <View style={styles.seperator}></View>

        <TouchableOpacity onPress={handleColorPaletteModal}>
          <View style={styles.drawerTextWrapper}>
            <Text style={styles.drawerText}>{t('color-selection-prompt')}</Text>
            <IonIcons name="color-palette-outline" size={20} color="black" />
          </View>
        </TouchableOpacity>

        <View style={styles.seperator}></View>

        <TouchableOpacity onPress={toggleAccordion}>
          <View style={styles.drawerTextWrapper}>
            <Text style={styles.drawerText}>{t('sort-by-prompt')}</Text>
            <Animated.View style={{transform: [{rotateZ: arrowTransform}]}}>
              <MatIcons name="arrow-right" size={22} color="black" />
            </Animated.View>
          </View>
        </TouchableOpacity>

        {showAccordion && (
          <View>
            <TouchableOpacity
              onPress={handleSortNew}
              style={styles.accordionOptionWrapper}>
              <Text style={styles.accordionOption}>
                {t('newest-first-prompt')}
              </Text>
              {sortMethod == 'newFirst' && (
                <IonIcons
                  name="md-checkmark-circle-sharp"
                  size={19}
                  color={'grey'}
                />
              )}
            </TouchableOpacity>

            <View style={styles.accordionSeperator}></View>

            <TouchableOpacity
              onPress={handleSortOld}
              style={styles.accordionOptionWrapper}>
              <Text style={styles.accordionOption}>
                {t('oldest-first-prompt')}
              </Text>
              {sortMethod == 'oldFirst' && (
                <IonIcons
                  name="md-checkmark-circle-sharp"
                  size={19}
                  color={'grey'}
                />
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    position: 'absolute',
    width: 230,
    height: 250,
    backgroundColor: '#f4f4f6',
    top: 5,
    right: 5,
    borderRadius: 20,
    borderWidth: 0.9,

  },
  drawerContainer: {
    display: 'flex',
  },
  mode: {
    position: 'absolute',
    left: 8,
    top: 10
  },
  drawerTextWrapper: {
    flexDirection: 'row'

  },
  drawerText: {
    marginLeft: 10,
    flex: 1,
    fontWeight: 500,
    fontSize: 17,
    color: 'black'
  },
  seperator: {
    borderWidth: 0.6,
    borderColor: '#e0e0e0',
    marginVertical: 3,
    
  },
  
  accordionOptionWrapper:{
    flexDirection:'row'

  },
  accordionOption:{
    flex:1,
    marginLeft:15,
    borderColor: '#e0e0e0',
    marginVertical: 1,
  },

  accordionSeperator:{
    borderWidth: 0.7,
    borderColor: '#e0e0e0',
    marginVertical: 0.5,
  }


});

export default DrawerMenu