import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'


export const noteSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
    pinnedNotes: [],
    nightMode: false,
    noteColor: ''
  },
  reducers: {
    
    addNote:  (state,action) => {
      state.notes.push(action.payload)
      sortNotes(state)
      
    }, 
    updateNote: (state,action) => {  
      changedState = state.notes.find( item => item.id === action.payload.id) 
      changedState.note = action.payload.text
      //action.payload'a aldığımız id değeri ile ilgili array index'ine id'si ile ulaştık (notes.find)
      //action.payload'a aldığımız yeni text değerini de eski olanıyla (changedState.note) ile değiştirdik
    },
    deleteNote: (state,action) => {
      console.log(action.payload)
      state.notes = state.notes.filter((x) => x.id != action.payload)
      //action.payload (id) 'si ile notların id'si aynı olmayanları filtrele

    },

    deleteBulky: (state,action) => {
      const selectedNotes = action.payload
      const selectedNotesIds = selectedNotes.map(note => note.id)
      
      state.notes = state.notes.filter(note=> !selectedNotesIds.includes(note.id))
      
    },

    pinNote: (state,action) => {
      changedNote = state.notes.find( item => item.id === action.payload) 
      changedNote.isPinned = true

      state.notes = state.notes.filter((x) => x.id != action.payload)    //notes'dan çıkar
      state.pinnedNotes.push(changedNote)   //pinnedNotes'a ekle+
            

    },
    unPinNote: (state,action) => {
       changedNote = state.pinnedNotes.find( item => item.id === action.payload)
       changedNote.isPinned = false
  
       state.pinnedNotes = state.pinnedNotes.filter((x) => x.id != action.payload)    //pinnedNotes'dan çıkar
       state.notes.push(changedNote)   //notes'a ekle
       sortNotes(state)   //pin'den çıkarıp notes'a yeni not ekleyince bidaha sıralama yaptık
      
  
    },
    updatePinnedNote: (state,action) => {  
      changedState = state.pinnedNotes.find( item => item.id === action.payload.id) 
      changedState.note = action.payload.text
      //action.payload'a aldığımız id değeri ile ilgili array index'ine id'si ile ulaştık (notes.find)
      //action.payload'a aldığımız yeni text değerini de eski olanıyla (changedState.note) ile değiştirdik
    },

    changeNightMode: (state,action) => {
      state.nightMode = !state.nightMode
    }, 

    changeNoteColor: (state,action) => {
      state.noteColor = action.payload
    }

  }
 
})



const sortNotes = (state) => {
  state.notes = state.notes.sort(function(a, b) {     // tarihine göre listele
    return (a.date > b.date) ? -1 : ((a.date < b.date) ? 1 : 0);
})
}




export const { addNote, updateNote, deleteNote, deleteBulky, pinNote, unPinNote, updatePinnedNote,changeNightMode,changeNoteColor} = noteSlice.actions

export default noteSlice.reducer