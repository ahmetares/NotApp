const { StyleSheet, View,TouchableOpacity,Text,TouchableWithoutFeedback } = require("react-native")



function NoteCard({message,onPress}){

    return(
        <TouchableWithoutFeedback onPress={onPress}>
            <View  style={styles.container}>
            <Text>{message.note}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles= StyleSheet.create({
    container:{
        marginVertical:8,
        padding:30,
        borderWidth:1,
        borderColor:'darkgrey',
        borderRadius:10,
        marginHorizontal:10,
        backgroundColor:'white'
    }

})

export default NoteCard