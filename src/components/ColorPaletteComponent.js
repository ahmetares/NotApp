import React from "react";
import {View,StyleSheet, Text, FlatList,TouchableOpacity, Dimensions} from 'react-native'
import { useDispatch,useSelector } from "react-redux";
import { closeColorModal } from "../store/notLocalStorageSlicer/nonLocalNoteSlice";
import { changeNoteColor } from "../store/localStorageSlicer/noteSlice";
function ColorPalette({color}){

    const dispatch = useDispatch()
    const colorModalStatus = useSelector((state) => state.notLocalNotes.isColorModalOpen)
 
     const handleColorSelection = () => {
         dispatch(closeColorModal())
         dispatch(changeNoteColor(color))
     }
    return(
        <TouchableOpacity  style={styles.paletteContainer} onPress={handleColorSelection}>
            <View style={[styles.colorContainer, {backgroundColor: color }]}></View>

        </TouchableOpacity>
    )
}

function ColorPaletteComponent() {

   

    const DATA = [
        {
            id:1,
            color: 'white',
            name: 'white'
        },
        {
            id:2,
            color: '#171515',
            name: 'black'
        },
        {
            id:3,
            color: '#88abe3',
            name: 'blue'
        },
        {
            id:4,
            color: '#95bd86',
            name: 'green'
        },
        {
            id:5,
            color: '#b5895c',
            name: 'clay'
        },
        {
            id:6,
            color:'#b88be8',
            name:'purple'
        },
        {
            id:7,
            color:'#f0979d',
            name:'red'
        },
        {
            id:8,
            color:'#46d4b7',
            name:'turkuaz'
        },
        {
            id:9,
            color:'#709991',
            name:'grey'
        },
            

    ]

    const renderSeperator = () => <View style={styles.seperator} />


    return(
        <View style={styles.container}>
            
            <FlatList 
            data={DATA} 
            renderItem={({item}) => <ColorPalette color={item.color}  />} 
            numColumns={3}
            keyExtractor={item => item.id.toString()}
            />
                
        </View>
    )
    
}

const styles = StyleSheet.create({

    container: {
        alignItems:'center',
        
    },

    paletteContainer:{
        borderWidth:1,
        borderColor:'#e0e0e0',
        borderRadius:10
    },  

    colorContainer:{
        borderRadius:8,
        width:Dimensions.get('window').width/3-60,
        height:60,
        borderWidth:2,
        margin:5,
        borderWidth:0
    },

})

export default ColorPaletteComponent