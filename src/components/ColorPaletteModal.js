import React from "react";
import { View,Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import ColorPaletteComponent from "./ColorPaletteComponent";


export default function ColorPaletteModal({visible,onClose}) {
    

    return(
        <Modal 
        style={styles.modal}
        isVisible={visible}
        onSwipeComplete={onClose}
        onBackButtonPress={onClose}
        onBackdropPress={onClose}>

            <ColorPaletteComponent/>
            
        </Modal>
    )
}


const styles = StyleSheet.create({

    modal:{
        justifyContent:'flex-end',
        margin:0,
    }
    
})