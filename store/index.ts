import { configureStore } from "@reduxjs/toolkit";
import { appStateSlice } from "./appStateSlice";

const store = configureStore({
  reducer: {
    appState: appStateSlice.reducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
