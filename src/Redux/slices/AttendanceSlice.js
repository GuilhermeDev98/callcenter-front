import { createSlice } from "@reduxjs/toolkit";
import Api from "../../Services/Api";

const slice = createSlice({
    name: 'attendance',
    initialState: {
        all: []
    },
    reducers: {
        GetAllAttendances(state, {payload}){
            return {...state, all: payload}
        }
    }
})

export const {GetAllAttendances}  = slice.actions
export const AllAttendances = state => state.all
export default slice.reducer