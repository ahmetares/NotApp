import { TouchableOpacity,Text,StyleSheet,View } from "react-native";
import { useDispatch,useSelector } from "react-redux";


function Button ({onPress,title}) {


    return(

    <TouchableOpacity onPress={onPress} style={styles.container}>
        <View style={styles.button_container}>
        <Text style={styles.title}>{title}</Text>
        </View>
    </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    container:{
        padding:8,
        marginVertical:10,
        marginHorizontal:50,
        borderRadius:10,
        alignItems:'center',
        backgroundColor:'blue'

    },

    button_container:{
        flexDirection:'row',
        alignItems:'center'
    },

    title:{
        fontWeight:'bold',
        fontSize:17,
        color:'white'
    }
 
})

export default Button