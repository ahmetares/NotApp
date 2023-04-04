import React from "react";
import { StyleSheet, View,TouchableHighlight, TouchableOpacity, Text, TouchableWithoutFeedback, Dimensions } from "react-native"
import { TextInput } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/AntDesign' 
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function LongPressComponent(){


    return(
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput editable={false} value="aşsdkaşslkd">
                </TextInput>
            </View>
            <View style={styles.optionContainer}>
            <TouchableOpacity onPress={null}>
             <View style={styles.optionWrapper}>
            <Text style={styles.option}>Notu Sabitle</Text>
            <MCIIcon 
                onPress={null}
                name={'pin'} color='black' size={18} style={styles.pin}
                >
                </MCIIcon> 
            </View>
            </TouchableOpacity>

            <View style={styles.seperator}></View>

            <TouchableOpacity onPress={null}>
             <View style={styles.optionWrapper}>
            <Text style={styles.option}>Notu Paylaş</Text>
            <MCIIcon 
                onPress={null}
                name={'pin'} color='black' size={18} style={styles.pin}
                >
                </MCIIcon> 
            </View>
            </TouchableOpacity>

            <View style={styles.seperator}></View>

            <TouchableOpacity onPress={null}>
             <View style={styles.optionWrapper}>
            <Text style={[styles.option, {color:'red'}]}>Sil</Text>
            <Icon 
                onPress={null}
                name={'delete'} color='red' size={18} style={styles.trash}
                >
            </Icon>
            </View>
            </TouchableOpacity>

            </View>

        </View>
    )
    }


const styles = StyleSheet.create({

    container: {
        backgroundColor:'green',
        borderRadius:9,
        alignItems:'center',
     
        
    },
    inputContainer:{
        backgroundColor:'grey',
        height:Dimensions.get('window').height/1.8,
        width:Dimensions.get('window').width/1.2,
        borderRadius:10,
    },
    optionContainer:{
        marginTop:10,
        backgroundColor:'grey',
        height:200,
    },
    optionWrapper:{
        display:'flex',
        flexDirection:'row',
        width:200,
        marginVertical:5
    },
    option:{
        flex:1,
        fontSize:17,
        fontWeight:500,
        marginLeft:8,
        color:'black',

    },
    trash:{
        marginRight:8
    },

    pin:{
        marginRight:8
    },
    seperator:{
        borderWidth:0.6,
        borderColor:'#e0e0e0',
        width:200,
        opacity:0.5,
        marginVertical:1
    }

})