import { configureStore } from '@reduxjs/toolkit'
import noteReducer from './localStorageSlicer/noteSlice'
import nonLocalNoteReducer from './notLocalStorageSlicer/nonLocalNoteSlice'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer,createMigrate } from 'redux-persist'
import thunk from 'redux-thunk'

/*export default configureStore({
  reducer: {
    counter: noteReducer,
  },
}) */



const reducers = combineReducers({
  notes: noteReducer,
  notLocalNotes: nonLocalNoteReducer
})

//burdaki whitelist reducer'ların adıymış biz state'lerin adı sandık
//notes redux'una yeni bir state ekleyince değeri gelmiyordu
//ama whitelistten çıkarıp sonra tekrar getirip uygulamayı tekrar başlatınca eklenen state'de geldi (myBool:false)
//aslında bir bakıma AsyncAwait.clear() yapmış oluyoruz
const persistConfig = {
  key:'root',
  storage:AsyncStorage,
  whitelist: ['notes'],
  blaclist:['notLocalNotes']

}

const persistedReducer = persistReducer(persistConfig,reducers)

const store = configureStore({
  reducer:persistedReducer,
  middleware: [thunk]
})

export default store