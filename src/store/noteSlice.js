import { createSlice } from '@reduxjs/toolkit'



export const noteSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
  },
  reducers: {
    
    addNote:  (state,action) => {
      state.notes.push(action.payload)
    }, 
    updateNote: (state,action) => {  
      changedState = state.notes.find( item => item.id === action.payload.id) 
      changedState.note = action.payload.text
      //action.payload'a aldığımız id değeri ile ilgili array index'ine id'si ile ulaştık (notes.find)
      //action.payload'a aldığımız yeni text değerini de eski olanıyla (changedState.note) ile değiştirdik
    },
    deleteNote: (state,action) => {
      state.notes = state.notes.filter((x) => x.id != action.payload)
      //action.payload (id) 'si ile notların id'si aynı olmayanları filtrele

    },

  }
})




export const { increment, decrement, incrementByAmount, addNote,updateNote,deleteNote } = noteSlice.actions

export default noteSlice.reducer