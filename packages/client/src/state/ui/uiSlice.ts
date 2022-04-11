import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  isSideBarOpen: boolean;
}

const initialState: InitialState = { isSideBarOpen: false };

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openSideBar: (state) => {
      state.isSideBarOpen = true;
    },
    closeSideBar: (state) => {
      state.isSideBarOpen = false;
    },
    toggleSideBar: (state) => {
      state.isSideBarOpen = !state.isSideBarOpen;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openSideBar, closeSideBar, toggleSideBar } = uiSlice.actions;

export default uiSlice.reducer;
