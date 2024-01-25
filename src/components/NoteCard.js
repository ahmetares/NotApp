import { StyleSheet,Dimensions,NativeModules, Platform, View,TouchableHighlight, TouchableOpacity, Text, TouchableWithoutFeedback } from "react-native"
import { useEffect, useState } from "react";

import { format, formatDistance, formatRelative, parseISO, subDays } from 'date-fns'
import { tr,enUS } from "date-fns/locale";

import FeaIcon from 'react-native-vector-icons/Feather'
import FontAIcon from 'react-native-vector-icons/FontAwesome'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import AntIcon from 'react-native-vector-icons/AntDesign'
import { useDispatch ,useSelector} from "react-redux";

import { pushBulkDelete,popBulkDelete, handleLongPressStatus } from "../store/notLocalStorageSlicer/nonLocalNoteSlice";
import { changeNoteColor } from "../store/localStorageSlicer/noteSlice";


const deviceLanguage =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
    : NativeModules.I18nManager.localeIdentifier;


function NoteCard({ message, onPress, bulkDelete, isPinned,theme='light' ,handleLongPress}) {

    const dateLocaleLang = deviceLanguage.substring(0, 2) == 'tr' ? tr : enUS;

    const dispatch = useDispatch()

    const firstLine = message.note.split('\n')[0];
    const formattedDate = formatDistance(parseISO(message.date), new Date(), {
      addSuffix: true,
      locale: dateLocaleLang,
    });

    const [isSelected, setSelected] = useState(false)

    const handleIcon = () => {
        if(isSelected){
            dispatch(popBulkDelete(message.id))
        }
        if(!isSelected){
            dispatch(pushBulkDelete(message))

        }
        setSelected(!isSelected)
        
    }

  
 

     const noteColor = useSelector((state)=> state.notes.noteColor)
     const nightMode = useSelector((state)=> state.notes.nightMode)
     const isListView = useSelector((state) => state.notes.listView)
   

     useEffect(()=> {   //nightColor = '' ise (uygulama ilk açıldığında mesela)
        if(!noteColor && !nightMode){
            dispatch(changeNoteColor('white'))

        }
        if(!noteColor && nightMode){
         dispatch(changeNoteColor('#171515'))
        }

     },[noteColor]) 


    
    return (

        <TouchableHighlight onPress={bulkDelete && !isPinned ? handleIcon : onPress} onLongPress={handleLongPress} activeOpacity={0.5} underlayColor="#DDDDDD">
        {bulkDelete && !isPinned ?  //toplu seçim açık mı ve not pinsiz mi ?
            <View style={[styles[theme].container , {backgroundColor:noteColor,} , !isListView && {width: Dimensions.get('window').width/2-20}  ]}>

                {!isSelected ?  //yuvarlak seçildimi
                    <FontAIcon size={30} color={'grey'} name={'circle-thin'} onPress={handleIcon} style={{ width:100,position: 'absolute', zIndex: 1, top: 22, left: 20, opacity:0.5 }} />
                    :
                    <MCIcon size={30} color={'red'} name={'delete-circle'} onPress={handleIcon} style={{ position: 'absolute', zIndex: 1, top: 22, left: 20 }} />
                }

                    <Text numberOfLines={1} style={[
                        styles[theme].note, 
                        { marginLeft: 65 }, 
                        noteColor=='#171515' && {color:'white'}, 
                        noteColor=='white' && {color:'#171515'}]}>{firstLine}</Text>
                    <Text style={[
                        styles[theme].date,
                        noteColor=='#171515' && {color:'white'} , 
                        noteColor=='white' && {color:'#171515'}]}>{formattedDate}</Text>
                </View>
                :

                
               
                <View style={[styles[theme].container,  {backgroundColor:noteColor}, !isListView && {width: Dimensions.get('window').width/2-20}]} onPress={()=> console.log('bastın')}>
                    {isPinned && <AntIcon size={15} color={'#f20707'} name={'pushpin'} style={{ position: 'absolute', zIndex: 1, top: 0, left: 0, opacity:0.5 }}/> }
                    <Text numberOfLines={1} style={ [
                        styles[theme].note ,              
                        noteColor=='#171515' && {color:'white'} , 
                        noteColor=='white' && {color:'#171515'}]}>{firstLine}</Text>
                    <Text 
                    style={[
                        styles[theme].date,
                        noteColor=='#171515' && {color:'white'} , 
                        noteColor=='white' && {color:'#171515'}]}>{formattedDate}</Text>
                    { /* longPressStatus ? <LongPressComponent/> : handleCloseLongPress() */}
                </View>


            }
                        </TouchableHighlight>

    )
}

const base_style = {
    container: {
        display: "flex",
        alignItems: 'center',
        flexDirection: "row",
        height: 75,
        marginVertical: 10,
        marginHorizontal: 10,
        
        borderRadius: 10,
    },

    note: {
        flex: 1,
        fontSize:20,
        marginLeft: 10,
        
    },
    date: {
        marginRight: 5,
        opacity: 0.5,
        position: "absolute",
        right: 0,
        top: 0,
        fontSize:13

    }



}

const styles = {
    light: StyleSheet.create({
        ...base_style, 
            container: {
                ...base_style.container,
                backgroundColor: 'white',
                borderColor: 'rgba(158, 150, 150, .5)',

            },
            note: {
                ...base_style.note,
                color:'black'
            },
        
        
    }),

    dark: {
        ...base_style, 
        container: {
            ...base_style.container,
            backgroundColor: '#171515',
            borderColor: 'rgba(158, 150, 150, .5)',

        },
        note: {
            ...base_style.note,
            color:'white'
        },
        date:{
            ...base_style.date,
            color:'white'
        }
    }
}

export default NoteCard