import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: {
    tabIndex:null,
    tabName:"",
    filter:false,
    filterList:[],
    switchTab:false
}}

export const departmenttSlice = createSlice({
  name: 'tabview',
  initialState,
  reducers: {
    setTabview: (state, action) => {
        state.value = action.payload
    },
    resetTabview: (state) => {
        state.value = initialState.value;
    },
  }
})

export const { setTabview,resetTabview } = departmenttSlice.actions

export default departmenttSlice.reducer