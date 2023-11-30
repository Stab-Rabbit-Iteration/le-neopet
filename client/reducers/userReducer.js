import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: null,
  userId: null,
  pets: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      console.log('💥 userSlice.reducer.loginUser')
      const { username, userId } = action.payload
      state = {
        username,
        userId,
      }
      return state
    },
    setPets: (state, action) => {
      console.log('💥 userSlice.reducer.setPets')
      state.pets = action.payload
      return state
    },
  },
})

export const { loginUser, setPets } = userSlice.actions
export default userSlice.reducer
