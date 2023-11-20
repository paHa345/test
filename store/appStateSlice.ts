import { IExercise, IResponseArrExercises } from "@/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBestExercisesAndSet = createAsyncThunk(
  "appState/fetchBestExercisesAndSet",
  async function (currentExercisesName, { rejectWithValue, dispatch }) {
    try {
      const req = await fetch("../api/exercises/bestExercises");
      const data: IResponseArrExercises = await req.json();
      if (!req.ok) {
        throw new Error("Ошибка сервера");
      }

      dispatch(appStateActions.setExercises(data.result));

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const setCurrentMuscleGroupAndSet = createAsyncThunk(
  "appState/setCurrentMuscleGroupAndSet",
  async function (currentMuscleGroup: ICurrentMuscleGroup, { rejectWithValue, dispatch }) {
    try {
      let data;
      if (currentMuscleGroup.en === "all") {
        const req = await fetch(`../api/exercises/allExercises`);
        data = await req.json();
        if (!req.ok) {
          throw new Error("Ошибка сервера");
        }
      } else {
        const req = await fetch(`../api/muscleGroupsExercises/${currentMuscleGroup.en}`);
        data = await req.json();
        if (!req.ok) {
          throw new Error("Ошибка сервера");
        }
      }

      dispatch(appStateActions.setCurrentMuscleGroup(currentMuscleGroup));
      dispatch(appStateActions.setExercisesByGroup(data.result));

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

interface ICurrentMuscleGroup {
  en: string;
  ru: string;
}

export interface IAppSlice {
  appState: {
    name: string;
    test: boolean;
    exercises: null | any;
    fetchBestExercisesStatus: fetchStatus;
    error: string;
    currentMuscleGroup: ICurrentMuscleGroup;
    currentExercisesByGroup: IExercise[];
  };
}

export enum fetchStatus {
  Loading = "loading",
  Resolve = "resolve",
  Error = "error",
}

interface IAppState {
  test: boolean;
  name: string;
  exercises: null | any;
  fetchBestExercisesStatus: fetchStatus;
  error: string;
  currentMuscleGroup: ICurrentMuscleGroup;
  currentExercisesByGroup: IExercise[];
}

export const initAppState: IAppState = {
  test: true,
  name: "paHa345",
  exercises: null,
  fetchBestExercisesStatus: fetchStatus.Loading,
  error: "",
  currentMuscleGroup: { en: "all", ru: "Все" },
  currentExercisesByGroup: [],
};

export const appStateSlice = createSlice({
  name: "appState",
  initialState: initAppState,
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
    setExercises(state, action) {
      state.exercises = action.payload;
    },
    setExercisesByGroup(state, action) {
      state.currentExercisesByGroup = action.payload;
    },
    setCurrentMuscleGroup(state, action) {
      console.log(action.payload);
      state.currentMuscleGroup = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBestExercisesAndSet.pending, (state) => {
      state.fetchBestExercisesStatus = fetchStatus.Loading;
    });
    builder.addCase(setCurrentMuscleGroupAndSet.pending, (state) => {
      state.fetchBestExercisesStatus = fetchStatus.Loading;
    });

    builder.addCase(fetchBestExercisesAndSet.fulfilled, (state, action) => {
      state.fetchBestExercisesStatus = fetchStatus.Resolve;
    });
    builder.addCase(setCurrentMuscleGroupAndSet.fulfilled, (state, action) => {
      state.fetchBestExercisesStatus = fetchStatus.Resolve;
    });

    builder.addCase(fetchBestExercisesAndSet.rejected, (state, action) => {
      state.fetchBestExercisesStatus = fetchStatus.Error;
    });
    builder.addCase(setCurrentMuscleGroupAndSet.rejected, (state, action) => {
      state.fetchBestExercisesStatus = fetchStatus.Error;
    });
  },
});

export const appStateActions = appStateSlice.actions;
