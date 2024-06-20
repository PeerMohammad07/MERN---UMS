import { createSlice } from "@reduxjs/toolkit";
import { setCredentials } from "../AuthSlice";
import { act } from "react";

const initalState = {
  adminInfo:localStorage.getItem('adminInfo') ? JSON.parse(localStorage.getItem('adminInfo')) : null
}

const adminAuthSlice = createSlice({
  name:'adminAuth',
  initialState:initalState,
  reducers:{
    setAdminCredentials:(state,action)=>{
        state.adminInfo = action.payload
        localStorage.setItem('adminInfo', JSON.stringify(action.payload))
        },
        adminLogout: (state, action) => {
            state.adminInfo = null
            localStorage.removeItem('adminInfo')
        },
  }
})

export const {setAdminCredentials,adminLogout} = adminAuthSlice.actions

export default adminAuthSlice.reducer