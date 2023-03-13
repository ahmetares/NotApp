import Icon from 'react-native-vector-icons/MaterialCommunityIcons' // ekstra npm i --save-dev @types/react-native-vector-icons  yapınca calıstı
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity
  } from 'react-native';

  function PlusButton({icon,onPress}) {
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.container} onPress={onPress}>
        <Icon name={icon} color='white' size={40} />
        </TouchableOpacity>
        </View>

    )
  }




const styles = StyleSheet.create({
    wrapper:{
      flex: 1,
       justifyContent: 'flex-end', 
       alignItems: 'flex-end', 
       margin: 20, 
    },
    container: {
      width: 70, 
      height: 70, 
      borderRadius: 50, 
      backgroundColor: 'blue', 
      justifyContent: 'center', 
      alignItems: 'center'
  },

})


  export default PlusButton;