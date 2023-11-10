import { IResponseArrExercises } from "@/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBestExercisesAndSet = createAsyncThunk(
  "appState/fetchBestExercisesAndSet",
  async function (currentExercisesName, { rejectWithValue, dispatch }) {
    try {
      const req = await fetch("../api/bestExercises");
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

// export const secoundReducer = createAsyncThunk(
//   "appState/secoundReducer",
//   async function (currentExercisesName, { rejectWithValue, dispatch }) {
//     try {
//       const req = await fetch("../api/exercises");
//       const data = await req.json();
//       if (!req.ok) {
//         throw new Error("Ошибка сервера");
//       }

//       dispatch(appStateActions.setExercises(data));

//       return data;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

export interface IAppSlice {
  appState: {
    name: string;
    test: boolean;
    exercises: null | any;
    fetchBestExercisesStatus: fetchStatus;
    error: string;
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
}

export const initAppState: IAppState = {
  test: true,
  name: "paHa345",
  exercises: null,
  fetchBestExercisesStatus: fetchStatus.Loading,
  error: "",
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBestExercisesAndSet.pending, (state) => {
      state.fetchBestExercisesStatus = fetchStatus.Loading;
    });

    builder.addCase(fetchBestExercisesAndSet.fulfilled, (state, action) => {
      console.log(action);
      state.fetchBestExercisesStatus = fetchStatus.Resolve;
    });
    builder.addCase(fetchBestExercisesAndSet.rejected, (state, action) => {
      console.log(action);

      state.fetchBestExercisesStatus = fetchStatus.Error;
    });
  },
});

export const appStateActions = appStateSlice.actions;
