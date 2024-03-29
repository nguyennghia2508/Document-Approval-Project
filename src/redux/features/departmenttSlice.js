import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: [] }

export const departmenttSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {
    setListDepartment: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { setListDepartment } = departmenttSlice.actions

export default departmenttSlice.reducer