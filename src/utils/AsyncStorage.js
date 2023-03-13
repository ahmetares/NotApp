import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch,useSelector } from 'react-redux';





/*export const setNotesToLocal = async () => {
    try {
        const notes = useSelector((state)=> state.counter.notes)
        await AsyncStorage.setItem('notes' , JSON.stringify(notes))
        console.log(JSON.parse(AsyncStorage.getItem('notes')))
    } catch (error) {
        console.log(error)
    }
}


export const getNotesFromLocal = async () => {
    try {
        
    } catch (error) {
        console.log(error)
    }
}

*/

export const setItemsToStorage = (items) => async (dispatch) => {
    try {
      const jsonItems = JSON.stringify(items);
      await AsyncStorage.setItem('items', jsonItems);
      dispatch(setItems(items));
    } catch (error) {
      console.log(error);
    }
  };