import { StyleSheet, View, TouchableOpacity, Text, TouchableWithoutFeedback } from "react-native"
import { format, formatDistance, formatRelative, parseISO, subDays } from 'date-fns'
import { tr } from "date-fns/locale";
import FeaIcon from 'react-native-vector-icons/Feather'
import FontAIcon from 'react-native-vector-icons/FontAwesome'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import AntIcon from 'react-native-vector-icons/AntDesign'

import { useDispatch ,useSelector} from "react-redux";

import { useEffect, useState } from "react";
import { pushBulkDelete,popBulkDelete } from "../store/notLocalStorageSlicer/nonLocalNoteSlice";


function NoteCard({ message, onPress, bulkDelete, isPinned }) {

    const dispatch = useDispatch()

    const firstLine = message.note.split('\n')[0];
    const formattedDate = formatDistance(parseISO(message.date), new Date(), { addSuffix: true, locale: tr })

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



    return (

        <TouchableWithoutFeedback onPress={onPress}>
            {bulkDelete && !isPinned ?  //toplu seçim açık mı ve not pinsiz mi ?
                <View style={styles.container}>

                    {!isSelected ?  //yuvarlak seçildimi
                        <FontAIcon size={30} color={'grey'} name={'circle-thin'} onPress={handleIcon} style={{ position: 'absolute', zIndex: 1, top: 22, left: 20, opacity:0.5 }} />
                        :
                        <MCIcon size={30} color={'red'} name={'delete-circle'} onPress={handleIcon} style={{ position: 'absolute', zIndex: 1, top: 22, left: 20 }} />
                    }

                    <Text numberOfLines={1} style={[styles.note, { marginLeft: 65 }]}>{firstLine}</Text>
                    <Text style={styles.date}>{formattedDate}</Text>
                </View>
                :

                <View style={styles.container}>
                    {isPinned && <AntIcon size={15} color={'#fe9400'} name={'pushpin'} style={{ position: 'absolute', zIndex: 1, top: 0, left: 0, opacity:0.5 }}/> }
                    <Text numberOfLines={1} style={styles.note}>{firstLine}</Text>
                    <Text style={styles.date}>{formattedDate}</Text>
                </View>


            }
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        display: "flex",
        alignItems: 'center',
        flexDirection: "row",
        height: 75,
        marginVertical: 1,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: 'rgba(158, 150, 150, .5)',
        borderBottomWidth: 2,
        borderTopWidth: 2,
        borderRadius: 10,
    

    },

    note: {
        flex: 1,
        fontSize:20,
        fontWeight: 'bold',
        marginLeft: 10,
        color:'black',
        fontFamily:'Roboto-Black'
    },
    date: {
        marginRight: 5,
        opacity: 0.5,
        position: "absolute",
        right: 0,
        top: 0,
        fontSize:13

    }

})

export default NoteCard