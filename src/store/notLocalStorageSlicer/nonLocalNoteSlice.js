import { createSlice } from '@reduxjs/toolkit'

//bu slicer'daki stateler localStorage'a kaydedilmiyor

export const nonLocalNoteSlice = createSlice({
  name: 'notLocalNotes',
  initialState: {
    secondBoole:false,
    bulkDelete: [],
    isDrawerOpen: false,
    headerDrawerStatus: false  //şimdilik kullanmadık, amaç notları seç'den sonra tamamlandı yazdırmaktı

  },
  reducers: {
    
    changeBoole2: (state,action) => {
      state.secondBoole=!state.secondBoole
    },

    pushBulkDelete: (state,action) => {
      state.bulkDelete.push(action.payload)
    },
    popBulkDelete: (state,action) => {
      state.bulkDelete = state.bulkDelete.filter((x) => x.id != action.payload)    //pinnedNotes'dan çıkar

    },
    setDrawerOpen: (state,action) => {
      state.isDrawerOpen = !state.isDrawerOpen
    },

    closeDrawer: (state,action) => {
      state.isDrawerOpen = false
    },
    handleDrawerStatus: (state,action) => {
      state.headerDrawerStatus = true
    },


  }
 
})


export const {changeBoole2,pushBulkDelete,popBulkDelete,setDrawerOpen,closeDrawer,handleDrawerStatus } = nonLocalNoteSlice.actions

export default nonLocalNoteSlice.reducer