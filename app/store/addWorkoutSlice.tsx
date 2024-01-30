import { Date } from "mongoose";
import { IOneExerciseTypes, exerciseTypes } from "../types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSession } from "next-auth/react";
import { useState } from "react";

export const addWorkout = createAsyncThunk(
  "addWorkoutState/addWorkout",
  async function (currentWorkout: any, { rejectWithValue, dispatch }) {
    try {
      // const currentUserReq = await fetch("./../api/getUserByEmail");
      // const currentUser = await currentUserReq.json();
      // // типизировать ответ от сервера
      // console.log(currentUser.result._id);

      // await dispatch(addWorkoutActions.setUserID(currentUser.result._id))

      // const state: any = getState();

      const req = await fetch("./../api/workout/addNewWorkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(currentWorkout),
      });
      const addedWorkout = await req.json();
      console.log("Workout", addedWorkout);

      const updatedUser = await fetch("./../api/users/addWorkoutToUser", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ workoutsArr: addedWorkout.result._id }),
      });

      const user = await updatedUser.json();

      if (!req.ok) {
        throw new Error("Ошибка сервера");
      }
      dispatch(addWorkoutActions.setAddedWorkoutId("sdfsdfsdf"));
      dispatch(addWorkoutActions.resetCurrentWorkout());
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export enum addWorkoutFetchStatus {
  Ready = "ready",
  Loading = "loading",
  Resolve = "resolve",
  Error = "error",
}

export interface IAddedExercises {
  id: string;
  name: string;
  sets: number;
  reps: number;
}

export interface IAddWorkoutSlice {
  addWorkoutState: {
    currentAddedWorkout: {
      name: string;
      description: string;
      exercises: IAddedExercises[];
      workoutDate: string;
      userId: string;
      addedWorkoutId: string;
    };
    fetchAddWorkoutStatus: addWorkoutFetchStatus;
  };
}

interface IAddWorkoutState {
  currentAddedWorkout: {
    name: string;
    description: string;
    exercises: IAddedExercises[];
    workoutDate: string;
    userId: string;
    addedWorkoutId: string;
  };
  fetchAddWorkoutStatus: addWorkoutFetchStatus;
}

export const initAddExerciseState: IAddWorkoutState = {
  currentAddedWorkout: {
    name: "",
    description: "",
    exercises: [],
    workoutDate: "",
    userId: "",
    addedWorkoutId: "987987987987",
  },
  fetchAddWorkoutStatus: addWorkoutFetchStatus.Ready,
};

export const addWorkoutSlice = createSlice({
  name: "addWorkoutState",
  initialState: initAddExerciseState,
  reducers: {
    setName(state, action) {
      state.currentAddedWorkout.name = action.payload;
    },
    setDescription(state, action) {
      state.currentAddedWorkout.description = action.payload;
    },
    addExerciseToWorkout(state, action) {
      console.log(action.payload);
      state.currentAddedWorkout.exercises.push({
        id: action.payload.id,
        sets: 0,
        reps: 0,
        name: action.payload.name,
      });
    },
    changeSetsAmount(state, action) {
      const currentExerciseIndex = state.currentAddedWorkout.exercises.findIndex((el) => {
        return el.id === action.payload.exerciseId;
      });
      state.currentAddedWorkout.exercises[currentExerciseIndex].sets = action.payload.value;
    },
    changeRepsAmount(state, action) {
      const currentExerciseIndex = state.currentAddedWorkout.exercises.findIndex((el) => {
        return el.id === action.payload.exerciseId;
      });
      state.currentAddedWorkout.exercises[currentExerciseIndex].reps = action.payload.value;
    },
    setWorkoutDate(state, action) {
      console.log(action.payload);
      state.currentAddedWorkout.workoutDate = action.payload;
    },
    setAddedWorkoutId(state, action) {
      state.currentAddedWorkout.addedWorkoutId = action.payload;
    },
    setUserID(state, action) {
      state.currentAddedWorkout.userId = action.payload;
    },
    resetCurrentWorkout(state) {
      state.currentAddedWorkout.description = "";
      state.currentAddedWorkout.name = "";
      state.currentAddedWorkout.exercises = [];
      state.currentAddedWorkout.workoutDate = "";
      state.currentAddedWorkout.userId = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addWorkout.pending, (state, action) => {
      state.fetchAddWorkoutStatus = addWorkoutFetchStatus.Loading;
    });
    builder.addCase(addWorkout.fulfilled, (state, action) => {
      state.fetchAddWorkoutStatus = addWorkoutFetchStatus.Resolve;
    });
    builder.addCase(addWorkout.rejected, (state, action) => {
      state.fetchAddWorkoutStatus = addWorkoutFetchStatus.Error;
    });
  },
});

export const addWorkoutActions = addWorkoutSlice.actions;
