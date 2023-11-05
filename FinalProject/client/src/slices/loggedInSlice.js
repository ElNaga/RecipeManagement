import { createSlice } from "@reduxjs/toolkit";


const loggedInSlice = createSlice({
    name: "loggedIn",
    initialState: {
        loggedIn: false
    },
    reducers: {
        setLogin(state, action){
            state.loggedIn = action.payload
        }
    }
})

export const {setLogin} = loggedInSlice.actions
export default loggedInSlice.reducer