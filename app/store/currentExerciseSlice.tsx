import { createSlice } from "@reduxjs/toolkit";
import { IExercise } from "../types";

export interface ICurrentExerciseSlice {
  currentExerciseState: {
    currentexercise: IExercise;
  };
}

interface ICurrentExerciseState {
  currentExercise: IExercise;
}

export const initCurrentExerciseState: ICurrentExerciseState = {
  currentExercise: {
    _id: "",
    id: "",
    name: "",
    image: "",
    isBest: true,
    type: "",
    raiting: 4,
    video: "",
    description: "",
    muscleGroups: [],
    mainGroup: "",
    mainGroupRu: "",
    createdUserId: "",
    comments: [],
  },
};

export const currentExerciseSlice = createSlice({
  name: "currentExerciseState",
  initialState: initCurrentExerciseState,
  reducers: {
    setCurrentExercise(state, action) {
      state.currentExercise = action.payload;
    },
  },
});

export const currentExrciseActions = currentExerciseSlice.actions;
