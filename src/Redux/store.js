import {configureStore} from '@reduxjs/toolkit'
import AttendanceSlice from './slices/AttendanceSlice'
import PhoneSlice from './slices/PhoneSlice'

export default configureStore({
    reducer: {
        attendances: AttendanceSlice,
        phone: PhoneSlice
    }
})