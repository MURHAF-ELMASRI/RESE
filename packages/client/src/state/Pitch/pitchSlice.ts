import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { PitchType } from "@rese/client-server/model/pitchModel";

interface InitialState {
  pitches?: PitchType[];
}

const initialState: InitialState = {
  pitches: [],
};

export const pitchSlice = createSlice({
  name: "pitch",
  initialState,
  reducers: {
    addPitch: (state, action: PayloadAction<PitchType>) => {
      state.pitches?.push(action.payload);
    },
    clearPitches: (state) => {
      state.pitches = [];
    },
    initializePitches: (state, action: PayloadAction<PitchType[]>) => {
      state.pitches = action.payload;
    },
    deletePitch: (state, action: PayloadAction<string>) => {
      const { pitches } = state;
      const i = state.pitches?.findIndex((e) => e._id === action.payload);
      if (!!i) {
        state.pitches = pitches?.splice(i, 1);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addPitch, clearPitches, deletePitch, initializePitches } =
  pitchSlice.actions;

export default pitchSlice.reducer;
