import { configureStore } from '@reduxjs/toolkit'
import loggedInReducer from './slices/loggedInSlice'
import isOpenPortalReducer from './slices/isOpenSlice'

export const store = configureStore({
    reducer:{
        loggedIn: loggedInReducer,
        openPortal: isOpenPortalReducer
    }
})