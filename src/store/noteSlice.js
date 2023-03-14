import { createSlice } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const noteSlice = createSlice({
  name: 'notes',
  initialState: {
    value: 0,
    notes: [],
    localNotes: [],
  },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
    
    addNote: (state,action) => {
      state.notes.push(action.payload)
      saveNotesToAsyncStorage(state.notes);
    }, 
    updateNote: (state,action) => {  
      changedState = state.notes.find( item => item.id === action.payload.id) 
      changedState.note = action.payload.text
      //action.payload'a aldığımız id değeri ile ilgili array index'ine id'si ile ulaştık (notes.find)
      //action.payload'a aldığımız yeni text değerini de eski olanıyla (changedState.note) ile değiştirdik
      saveNotesToAsyncStorage(state.notes);
    },
    deleteNote: (state,action) => {
      state.notes = state.notes.filter((x) => x.id != action.payload)
      //action.payload (id) 'si ile notların id'si aynı olmayanları filtrele
      saveNotesToAsyncStorage(state.notes); // AsyncStorage'e kaydedin

    },

  }
})


const saveNote =  async () => {
  notess = await JSON.parse(await AsyncStorage.getItem('notes'))
  await AsyncStorage.setItem('notes', JSON.stringify(notess)); 
}




const saveNotesToAsyncStorage = async (notes) => {
 /* const existingNotes = await JSON.parse(await AsyncStorage.getItem('notes')) || []; // mevcut verileri alın
  const updatedNotes = [...existingNotes, ...notes];  // updatedNotes  [{"id": 7401, "note": "1"}, {"id": 36804, "note": "2"}, {"id": 40496, "note": "3"}, {"id": 7401, "note": "1"}, {"id": 36804, "note": "2"}, {"id": 40496, "note": "3"}, {"id": 96853, "note": "4"}]
  const uniqueData = getUnique(updatedNotes, "id");   //unique [{"id": 7401, "note": "1"}, {"id": 36804, "note": "2"}, {"id": 40496, "note": "3"}, {"id": 96853, "note": "4"}]
  await AsyncStorage.setItem('notes', JSON.stringify(uniqueData)); */
};

export const { increment, decrement, incrementByAmount, addNote,updateNote,deleteNote } = noteSlice.actions

export default noteSlice.reducer