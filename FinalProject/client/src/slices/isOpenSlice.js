import { createSlice } from "@reduxjs/toolkit";


const isOpenSlice = createSlice({
    name: "openPortal",
    initialState: {
        openPortal: false
    },
    reducers: {
        setOpenPortal(state, action){
            state.openPortal = action.payload
        }
    }
})

export const {setOpenPortal} = isOpenSlice.actions
export default isOpenSlice.reducer