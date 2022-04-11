import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  _id?: string;
  fullName: string;
  email: string;
  phone: string;
  status: "pending" | "active";
  token: string;
}

interface InitialState {
  user?: User;
}

const initialState: InitialState = {
  //TODO: delete this user
  user: {
    fullName: "Ahmet ilkol",
    email: "murhaf.msri@gmail.com",
    phone: "05377994261",
    status: "active",
    token: "kejrjjiejlwejwewe;l",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      localStorage.setItem("token", action.payload.token);
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
