import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface User {
    _id?:string
    name?: string
    email?: string
    number?: string
}

interface InitialState{
    user?:User
}

const initialState:InitialState = {
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
      setUser: (state,action:PayloadAction<User>) => {
          state.user=action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions

export default userSlice.reducer