import { CLIENT_RENEG_LIMIT } from "tls";
import { IOneExerciseTypes, exerciseTypes } from "../types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addExerciseAndImage = createAsyncThunk(
  "addExerciseState/addExerciseAndImage",
  async function (currentexercise: any, { rejectWithValue, dispatch, getState }) {
    try {
      const state: any = getState();
      // console.log(state.addExerciseState.currentAddedExercise);
      console.log(state);

      dispatch(addExerciseActions.changeUploadedImage(currentexercise.imageURL));
      const req = await fetch("../api/exercises/addExercise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(state.addExerciseState.currentAddedExercise),
      });
      const addedExercise = await req.json();
      console.log(req.status === 406);
      if (req.status === 406) {
        dispatch(
          addExerciseActions.setAddexerciseErrorMessage("Такое имя тренировки уже существует")
        );
      }
      if (!req.ok) {
        throw new Error("Ошибка сервера");
      }

      const updatedUserReq = await fetch("../api/users/addExerciseToUser", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ exercisesArr: addedExercise.result._id }),
      });

      const updatedUser = await updatedUserReq.json();
      console.log(updatedUser);

      dispatch(addExerciseActions.clearAddexerciseForm());
      return addedExercise;
    } catch (error: any) {
      console.log(error);
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
      name: string;
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
    addExerciseErrorMessage: string;
  };
}

interface IAddExerciseState {
  currentAddedExercise: {
    id: string | null;
    name: string;
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
  addExerciseErrorMessage: string;
}

export const initAddExerciseState: IAddExerciseState = {
  currentAddedExercise: {
    name: "",
    type: null,
    raiting: null,
    muscleGroups: [],
    video: null,
    image: null,
    description: null,
    mainGroup: null,
    mainGroupRu: null,
    id: null,

    createdUserId: "",
  },
  fetchAddExerciseStatus: addExerciseFetchStatus.Ready,
  addExerciseErrorMessage: "",
};

export const addExerciseSlice = createSlice({
  name: "addExerciseState",
  initialState: initAddExerciseState,
  reducers: {
    setName(state, action) {
      state.currentAddedExercise.name = action.payload;
    },
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
      if (action.payload.id === "raiting") {
        state.currentAddedExercise.raiting = action.payload.value;
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

    setCreatedUserID(state, action) {
      state.currentAddedExercise.createdUserId = action.payload;
    },
    setAddExerciseStatusToLoading(state) {
      state.fetchAddExerciseStatus = addExerciseFetchStatus.Loading;
    },
    setAddExerciseStatusToReady(state) {
      state.fetchAddExerciseStatus = addExerciseFetchStatus.Ready;
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
    setAddexerciseErrorMessage(state, action) {
      state.addExerciseErrorMessage = action.payload;
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
