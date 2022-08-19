import { createSlice } from "@reduxjs/toolkit";
import Api from "../../Services/Api";

const slice = createSlice({
    name: 'phone',
    initialState: {
        phone: []
    },
    reducers: {
        GetPhone(state, {payload}){
            return {...state, phone: { numeroChegando: '(79) 99904-2394', status: 'conectado'}}
        }
    }
})

export const {GetPhone}  = slice.actions
export const PhoneInfo = state => state.phone
export default slice.reducer