import { createSlice } from "@reduxjs/toolkit";
import { IComment, IExercise } from "../types";

export interface ICurrentExerciseSlice {
  currentExerciseState: {
    currentexercise: IExercise;
    comments: IComment[] | [];
  };
}

interface ICurrentExerciseState {
  currentExercise: IExercise;
  comments: IComment[] | [];
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
  comments: [],
};

export const currentExerciseSlice = createSlice({
  name: "currentExerciseState",
  initialState: initCurrentExerciseState,
  reducers: {
    setCurrentExercise(state, action) {
      state.comments = action.payload;
    },
  },
});

export const currentExrciseActions = currentExerciseSlice.actions;
