import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {},
  isLogin: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload.value
      state.isLogin = action.payload.isLogin
    },
    resetUser: (state) => {
      state.value = initialState.value;
      state.isLogin = initialState.isLogin
    },
  }
})

export const { setUser, resetUser } = userSlice.actions

export default userSlice.reducer