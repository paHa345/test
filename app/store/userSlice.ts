import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IResponseUser } from "../types";

export const getUserWorkouts = createAsyncThunk(
  "appState/getUserWorkouts",
  async function (_, { rejectWithValue, dispatch }) {
    try {
      console.log("GET");
      const req = await fetch("../api/workout/getCurrentUserWorkouts");
      if (!req.ok) {
        throw new Error("Ошибка сервера");
      }
      const user: IResponseUser = await req.json();
      console.log(user);
      dispatch(userActions.setCurrentUserWorkout(user.result.workoutsArr));
      return user.result.workoutsArr;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export enum fetchCurrentUserWorkoutsStatus {
  Loading = "loading",
  Resolve = "resolve",
  Error = "error",
}

export interface IUserSlice {
  userState: {
    getWorkoutsStatus: fetchCurrentUserWorkoutsStatus;
    currentUser: {
      name: string;
      workoutsArr: [];
    };
  };
}

interface userState {
  getWorkoutsStatus: fetchCurrentUserWorkoutsStatus;
  currentUser: {
    name: string;
    workoutsArr: [];
  };
}

export const initUserState: userState = {
  getWorkoutsStatus: fetchCurrentUserWorkoutsStatus.Loading,
  currentUser: {
    name: "paHa345",
    workoutsArr: [],
  },
};

export const userSlice = createSlice({
  name: "userState",
  initialState: initUserState,
  reducers: {
    setCurrentUserWorkout(state, action) {
      console.log("asdhgaus");
      state.currentUser.workoutsArr = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getUserWorkouts.pending, (state, action) => {
      state.getWorkoutsStatus = fetchCurrentUserWorkoutsStatus.Loading;
    });
    builder.addCase(getUserWorkouts.fulfilled, (state, action) => {
      state.getWorkoutsStatus = fetchCurrentUserWorkoutsStatus.Resolve;
    });
    builder.addCase(getUserWorkouts.rejected, (state, action) => {
      state.getWorkoutsStatus = fetchCurrentUserWorkoutsStatus.Resolve;
    });
  },
});

export const userActions = userSlice.actions;
