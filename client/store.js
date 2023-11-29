import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    users: userReducer
  }
})

// const userState = useSelector((state) => state.users)

export default store;