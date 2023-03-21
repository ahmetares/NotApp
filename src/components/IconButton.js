import Icon from 'react-native-vector-icons/MaterialCommunityIcons' // ekstra npm i --save-dev @types/react-native-vector-icons  yapınca calıstı
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity
  } from 'react-native';

  function IconButton({icon,onPress,color,style}) {
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity style={[styles.container , {...style}]} onPress={onPress}>
        <Icon name={icon} color={color} size={40} />
        </TouchableOpacity>
        </View>

    )
  }




const styles = StyleSheet.create({
    wrapper:{
      position:'absolute',
      bottom:140,
      right:10
       
    },
    container: {
      width: 70, 
      height: 70, 
      borderRadius: 50, 
      justifyContent: 'center', 
      alignItems: 'center'
  },

})


  export default IconButton;