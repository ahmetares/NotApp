import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Share,Text, View, TextInput,TouchableOpacity, FlatList, TouchableWithoutFeedback, Dimensions, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign' // ekstra npm i --save-dev @types/react-native-vector-icons  yapınca calıstı ayrıca bu paket için android ve iosda konfig. yapılmalı


export default function Header({onText}) {  //Notebook'un en üstünde listelencek (title+searchbar) flatlistin ListHeaderComponent özelliği ile 
 
    const [colorMode, setColorMode] = useState('light')
    const lightOrNightMode = useSelector((state) => state.notes.nightMode)
    
    useEffect(() => {
      if (!lightOrNightMode) {
        setColorMode('light')
      } else {
        setColorMode('dark')
  
      }
    }, [lightOrNightMode])
  
    return(
     <View>
  
        <Text style={styles[colorMode].title}>Notlar</Text> 
  
        <View style={styles[colorMode].searchContainer}>
        <Icon name={'search1'} color={'grey'} size={20} />
  
        <TextInput  style={styles[colorMode].search} placeholder={'Arayın'} onChangeText={onText} />
        </View>
      </View>
    )
  }


  const base_style = {
    title:{
        marginTop:5,
        marginLeft:9,
        fontWeight:'bold',
        fontSize:35,
      },
      searchContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: 8,
        height:40,
        marginVertical:4,
        marginHorizontal:10,
      },
      search:{
        paddingVertical:0,
        fontSize:12,
        marginLeft:5,
        height:33,
        flex:1    
      }
  }


  const styles = {
    light: StyleSheet.create({
        ...base_style,
        title:{
          ...base_style.title,
          color:'black'
        },
        searchContainer:{
          ...base_style.searchContainer,
          backgroundColor: '#e4e3e8',
        }
      }),
      dark: {
        ...base_style,    
        title:{
          ...base_style.title,
          color:'#f2f1f6'
        },
        searchContainer:{
          ...base_style.searchContainer,
          backgroundColor: '#dedddc',
        }
      },
  }