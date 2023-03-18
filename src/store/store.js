import { configureStore } from '@reduxjs/toolkit'
import noteReducer from './noteSlice'


import AsyncStorage from '@react-native-async-storage/async-storage'
import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'

/*export default configureStore({
  reducer: {
    counter: noteReducer,
  },
}) */

const reducers = combineReducers({
  notes: noteReducer
})

const persistConfig = {
  key:'root',
  storage:AsyncStorage,
  whitelist: ['notes','pinnedNotes']
}

const persistedReducer = persistReducer(persistConfig,reducers)

const store = configureStore({
  reducer:persistedReducer,
  middleware: [thunk]
})

export default store