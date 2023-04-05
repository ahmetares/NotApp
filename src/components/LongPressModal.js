import {
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Dimensions,
  Text,
} from 'react-native';
import Modal from 'react-native-modal';
import LongPressComponent from './LongPressComponent';
import Icon from 'react-native-vector-icons/AntDesign';
import MCIIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IONIcon from 'react-native-vector-icons/Ionicons';

export default function LongPressModal({visible, onClose, note,isPinned,navigateToNote,pinFromModal,deleteFromModal,shareFromModal}) {


  return (
    <Modal
      isVisible={visible}
      onSwipeComplete={onClose}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      style={{alignItems: 'center'}}>
        
      <View>
        <TouchableOpacity onPress={navigateToNote} style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            editable={false}
            value={note}
            multiline></TextInput>
        </TouchableOpacity>
      </View>

      <View style={styles.optionContainer}>
        <TouchableOpacity onPress={pinFromModal}>
         <View style={styles.optionWrapper}>
           {  
           !isPinned ? (<>
            <Text style={styles.option}>Notu Sabitle</Text>
            <MCIIcon
              name={'pin-outline'}
              color="black"
              size={20}
              style={styles.pin}></MCIIcon>
                </>)
              : 
              (<>
                <Text style={styles.option}>Sabitlemeden Kaldır </Text>
                <MCIIcon
                  name={'pin-off-outline'}
                  color="black"
                  size={20}
                  style={styles.pin}></MCIIcon>
                    </>)
              }
          </View> 
        </TouchableOpacity>

        <View style={styles.seperator}></View>

        <TouchableOpacity onPress={shareFromModal}>
          <View style={styles.optionWrapper}>
            <Text style={styles.option}>Notu Paylaş</Text>
            <IONIcon
              name={'share-outline'}
              color="black"
              size={20}
              style={styles.pin}></IONIcon>
          </View>
        </TouchableOpacity>

        <View style={styles.seperator}></View>

        <TouchableOpacity onPress={deleteFromModal}>
          <View style={styles.optionWrapper}>
            {!isPinned ?
             (<>
            <Text style={[styles.option, {color: 'red'}]}>Sil</Text>
            <Icon
              name={'delete'}
              color="red"
              size={20}
              style={styles.trash}></Icon>
              </>)
            : null}
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    height: Dimensions.get('window').height / 1.8,
    width: Dimensions.get('window').width / 1.2,
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
  input: {
    color: 'black',
  },
  optionContainer: {
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: '#ffffff',
    width: 200,
  },

  optionWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 5,
  },
  option: {
    flex: 1,
    fontSize: 17,
    fontWeight: 500,
    marginLeft: 8,
    color: 'black',
  },
  trash: {
    marginRight: 8,
  },

  pin: {
    marginRight: 8,
  },
  seperator: {
    borderWidth: 0.6,
    borderColor: '#e0e0e0',
    width: 200,
    opacity: 0.5,
    marginVertical: 1,
  },
});
