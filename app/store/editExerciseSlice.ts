import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IExercise } from "../types";
import { PutBlobResult } from "@vercel/blob";

export const editExerciseAndUpdate = createAsyncThunk(
  "editExerciseState/editExerciseAndUpdate",
  async function (editExerciseData: any, { rejectWithValue, dispatch }) {
    console.log(editExerciseData);
    console.log(editExerciseData.imageFile[0]);
    if (!editExerciseData.imageFile[0]) {
      throw new Error("No file selected");
    }

    const file = editExerciseData.imageFile[0];
    console.log(file);

    const uploadImageResponse = await fetch(`/api/upload?filename=${file.name}`, {
      method: "POST",
      body: file,
    });

    const newBlob = (await uploadImageResponse.json()) as PutBlobResult;

    console.log(newBlob.url);
    editExerciseData.editedExercise.image = newBlob.url;
    console.log("werwer");
    console.log(editExerciseData);
  }
);

export enum uploadExerciseFetchStatus {
  Ready = "ready",
  Loading = "loading",
  Resolve = "resolve",
  Error = "error",
}

export interface IEditExerciseSlice {
  editExerciseState: {
    updateExerciseStatus: uploadExerciseFetchStatus;
    editedExercise: IExercise | null;
  };
}

interface IEditExerciseState {
  updateExerciseStatus: uploadExerciseFetchStatus;

  editedExercise: IExercise | null;
}

export const initEditexerciseState: IEditExerciseState = {
  updateExerciseStatus: uploadExerciseFetchStatus.Loading,
  editedExercise: null,
};

export const editExerciseSlice = createSlice({
  name: "editExerciseSlice",
  initialState: initEditexerciseState,
  reducers: {
    setEditedExerciseName(state, action) {
      if (state.editedExercise) {
        state.editedExercise.name = action.payload;
      }
    },
    setEditedExerciseType(state, action) {
      if (state.editedExercise) {
        state.editedExercise.type = action.payload;
      }
    },
    deleteEditedExerciseMuscleGroup(state, action) {
      state.editedExercise?.muscleGroups?.splice(action.payload, 1);
    },
    addEditedExerciseMuscleGroup(state, action) {
      state.editedExercise?.muscleGroups?.push(action.payload);
    },
    setEditedexerciseVideo(state, action) {
      if (state.editedExercise) {
        state.editedExercise.video = action.payload;
      }
    },
    setEditedExerciseDescription(state, action) {
      if (state.editedExercise) {
        state.editedExercise.description = action.payload;
      }
    },
    setEditedExerciseImage(state, action) {
      if (state.editedExercise) {
        state.editedExercise.image = action.payload;
      }
    },
    setEditedExercise(state, action) {
      console.log(action.payload);
      state.editedExercise = action.payload;
    },
  },
});

export const editExerciseActions = editExerciseSlice.actions;
