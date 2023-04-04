import { createSlice } from '@reduxjs/toolkit'

//bu slicer'daki stateler localStorage'a kaydedilmiyor

export const nonLocalNoteSlice = createSlice({
  name: 'notLocalNotes',
  initialState: {
    bulkDeleteStatus:false,
    bulkDelete: [],
    isDrawerOpen: false,
    isLongPressOpen: false,
    isColorModalOpen:false,

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
 
    handleBulkDeleteStatus: (state,action) => {
      state.bulkDeleteStatus = !state.bulkDeleteStatus
    },
    handleLongPressStatus:  (state,action) => {
      state.isLongPressOpen = action.payload
    },
    openColorModal: (state,action) => {
      state.isColorModalOpen = true
    },
    closeColorModal: (state,action) => {
      state.isColorModalOpen = false
    },

  }
 
})


export const {changeBoole2,pushBulkDelete,popBulkDelete,setDrawerOpen,closeDrawer,handleBulkDeleteStatus,handleLongPressStatus,openColorModal,closeColorModal } = nonLocalNoteSlice.actions

export default nonLocalNoteSlice.reducer