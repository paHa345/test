import { configureStore } from "@reduxjs/toolkit";
import { appStateSlice } from "./appStateSlice";
import { addExerciseSlice } from "./addExerciseSlice";
import { addWorkoutSlice } from "./addWorkoutSlice";

const store = configureStore({
  reducer: {
    appState: appStateSlice.reducer,
    addExerciseState: addExerciseSlice.reducer,
    addWorkoutState: addWorkoutSlice.reducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
