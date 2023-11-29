import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: null,
  userId: null,
  pets: []
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      console.log('💥 userSlice.reducer.loginUser');
      return state
    }
  }
})

export const {loginUser} = userSlice.actions
export default userSlice.reducer