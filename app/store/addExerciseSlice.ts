import { IOneExerciseTypes, exerciseTypes } from "../types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addExerciseAndImage = createAsyncThunk(
  "addExerciseState/addExerciseAndImage",
  async function (currentexercise: any, { rejectWithValue, dispatch, getState }) {
    try {
      const state: any = getState();
      console.log(state.addExerciseState.currentAddedExercise);
      dispatch(addExerciseActions.changeUploadedImage(currentexercise.imageURL));
      const req = await fetch("../api/exercises/addExercise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(state.addExerciseState.currentAddedExercise),
      });
      // console.log(req);
      const data = await req.json();
      if (!req.ok) {
        throw new Error("Ошибка сервера");
      }
      // console.log(currentexercise.imageURL);
      // dispatch(addExerciseActions.changeAddedExercise(currentexercise.imageURL));
      dispatch(addExerciseActions.clearAddexerciseForm());
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export enum addExerciseFetchStatus {
  Ready = "ready",
  Loading = "loading",
  Resolve = "resolve",
  Error = "error",
}

export interface IAddExerciseSlice {
  addExerciseState: {
    currentAddedExercise: {
      id: string | null;
      name: string | null;
      type: "base" | "isolated" | null;
      muscleGroups: String[] | [];
      video: string | null;
      description: string | null;
      mainGroup: "biceps" | "triceps" | "chest" | "legs" | "shoulders" | "back" | null;
      image?: string | null;
      imageFile?: File | undefined;
      isBest?: boolean | null;
      raiting?: number | null;
      mainGroupRu: string | undefined | null;
      createdUserId?: string;
    };
    fetchAddExerciseStatus: addExerciseFetchStatus;
  };
}

interface IAddExerciseState {
  currentAddedExercise: {
    id: string | null;
    name: string | null;
    type: "base" | "isolated" | null;
    muscleGroups: String[] | [];
    video: string | null;
    description: string | null;
    mainGroup: "biceps" | "triceps" | "chest" | "legs" | "shoulders" | "back" | null;
    image?: string | null;
    imageFile?: File | undefined;
    isBest?: boolean | null;
    raiting?: number | null;
    mainGroupRu: string | undefined | null;
    createdUserId?: string;
  };
  fetchAddExerciseStatus: addExerciseFetchStatus;
}

export const initAddExerciseState: IAddExerciseState = {
  currentAddedExercise: {
    name: "",
    type: null,
    muscleGroups: [],
    video: null,
    image: null,
    description: null,
    mainGroup: null,
    mainGroupRu: null,
    id: null,

    createdUserId: "6555c1fbb3a7c3aad9047fb2",
  },
  fetchAddExerciseStatus: addExerciseFetchStatus.Ready,
};

export const addExerciseSlice = createSlice({
  name: "addExerciseState",
  initialState: initAddExerciseState,
  reducers: {
    changeAddedExercise(state, action) {
      console.log(action.payload.value);
      console.log(action.payload.id);
      if (action.payload.id === "name") {
        state.currentAddedExercise.name = action.payload.value;
        state.currentAddedExercise.id = action.payload.value;
      }
      if (action.payload.id === "video") {
        state.currentAddedExercise.video = action.payload.value;
      }
      if (action.payload.id === "description") {
        state.currentAddedExercise.description = action.payload.value;
      }
      if (action.payload.id === "type") {
        state.currentAddedExercise.type = action.payload.value;
      }
      if (action.payload.id === "mainGroup") {
        state.currentAddedExercise.mainGroup = action.payload.value;

        let ru;

        exerciseTypes.forEach((el: IOneExerciseTypes) => {
          if (el.nameEn === action.payload.value) {
            ru = el.nameRu;
          }
        });
        state.currentAddedExercise.mainGroupRu = ru;
        console.log(state.currentAddedExercise.mainGroupRu);
      }
    },
    addMuscleGroup(state, action) {
      state.currentAddedExercise.muscleGroups = [
        ...state.currentAddedExercise.muscleGroups,
        action.payload.value,
      ];
    },
    deleteMuscleGroup(state, action) {
      const currentNuscleGroups = [...state.currentAddedExercise.muscleGroups];
      currentNuscleGroups.splice(Number(action.payload), 1);
      state.currentAddedExercise.muscleGroups = currentNuscleGroups;
      console.log(state.currentAddedExercise.muscleGroups);
    },
    changeUploadedImage(state, action) {
      // state.currentAddedExercise.imageFile = action.payload;
      console.log("first");
      console.log(action.payload);
      state.currentAddedExercise.image = String(action.payload);
    },

    clearAddexerciseForm(state) {
      state.currentAddedExercise.createdUserId = "";
      state.currentAddedExercise.name = "";
      state.currentAddedExercise.type = null;
      state.currentAddedExercise.muscleGroups = [];
      state.currentAddedExercise.video = null;
      state.currentAddedExercise.description = null;
      state.currentAddedExercise.mainGroup = null;
      state.currentAddedExercise.mainGroupRu = null;
      state.currentAddedExercise.id = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addExerciseAndImage.pending, (state) => {
      state.fetchAddExerciseStatus = addExerciseFetchStatus.Loading;
    });

    builder.addCase(addExerciseAndImage.fulfilled, (state, action) => {
      state.fetchAddExerciseStatus = addExerciseFetchStatus.Resolve;
    });

    builder.addCase(addExerciseAndImage.rejected, (state, action) => {
      state.fetchAddExerciseStatus = addExerciseFetchStatus.Error;
    });
  },
});

export const addExerciseActions = addExerciseSlice.actions;
