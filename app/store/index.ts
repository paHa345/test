import { configureStore } from "@reduxjs/toolkit";
import { appStateSlice } from "./appStateSlice";
import { addExerciseSlice } from "./addExerciseSlice";

const store = configureStore({
  reducer: {
    appState: appStateSlice.reducer,
    addExerciseState: addExerciseSlice.reducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
