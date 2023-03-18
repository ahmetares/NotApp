import { StyleSheet, View, TouchableOpacity, Text, TouchableWithoutFeedback } from "react-native"
import { format, formatDistance, formatRelative, parseISO, subDays } from 'date-fns'
import { tr } from "date-fns/locale";
import FeaIcon from 'react-native-vector-icons/Feather'
import FontAIcon from 'react-native-vector-icons/FontAwesome'


import { useState } from "react";



function NoteCard({ message, onPress, bulkDelete, isPinned }) {

    const firstLine = message.note.split('\n')[0];
    const formattedDate = formatDistance(parseISO(message.date), new Date(), { addSuffix: true, locale: tr })

    const [isSelected, setSelected] = useState(false)

    const handleIcon = () => {
        setSelected(!isSelected)
    }

    return (

        <TouchableWithoutFeedback onPress={onPress}>
            {bulkDelete && !isPinned ?  //toplu seçim açık mı ve not pinsiz mi ?
                <View style={styles.container}>

                    {!isSelected ?  //yuvarlak seçildimi
                        <FontAIcon size={40} color={'red'} name={'circle-thin'} onPress={handleIcon} style={{ position: 'absolute', zIndex: 1, top: 15, left: 20 }} />
                        :
                        <FontAIcon size={40} color={'red'} name={'circle'} onPress={handleIcon} style={{ position: 'absolute', zIndex: 1, top: 15, left: 20 }} />
                    }

                    <Text numberOfLines={1} style={[styles.note, { marginLeft: 60 }]}>{firstLine}</Text>
                    <Text style={styles.date}>{formattedDate}</Text>
                </View>
                :

                <View style={styles.container}>

                    <Text numberOfLines={1} style={styles.note}>{firstLine}</Text>
                    <Text style={styles.date}>{formattedDate}</Text>
                </View>


            }
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
        borderWidth: 1,
        borderBottomWidth: 2.5,
        borderLeftWidth: 1.5,
        borderColor: 'rgba(158, 150, 150, .5)',
        borderRadius: 8,
        marginHorizontal: 10,
        backgroundColor: 'white',
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        height: 75,
        backgroundColor: '#e6e6fa'

    },

    note: {
        flex: 1,
        fontWeight: 'bold',
        marginLeft: 10
    },
    date: {
        marginTop: -10,
        opacity: 0.5,
        position: "absolute",
        right: 5,
        top: 15

    }

})

export default NoteCard