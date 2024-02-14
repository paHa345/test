import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IResponseUser, IWorkout } from "../types";

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
      dispatch(userActions.setCurrentUserWorkout(user.result.workoutsArr));
      return user.result.workoutsArr;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// export const editWorkoutAndSet = createAsyncThunk(

// )

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
      workoutsArr: IWorkout[];
      editedWorkout: IWorkout;
    };
  };
}

interface userState {
  getWorkoutsStatus: fetchCurrentUserWorkoutsStatus;
  currentUser: {
    name: string;
    workoutsArr: IWorkout[];
    editedWorkout: IWorkout;
  };
}

export const initUserState: userState = {
  getWorkoutsStatus: fetchCurrentUserWorkoutsStatus.Loading,
  currentUser: {
    name: "paHa345",
    workoutsArr: [],
    editedWorkout: {
      name: "Init",
      _id: "init",
      date: new Date(),
      comments: "init",
      userId: "init",
      exercisesArr: [{ name: "init", id: "init", sets: 0, reps: 0 }],
    },
  },
};

export const userSlice = createSlice({
  name: "userState",
  initialState: initUserState,
  reducers: {
    setCurrentUserWorkout(state, action) {
      state.currentUser.workoutsArr = action.payload;
    },
    setEditedWorkout(state, action) {
      // console.log(action.payload);
      const editedWorkout = state.currentUser.workoutsArr.find((workout) => {
        return workout._id === action.payload;
      });
      // console.log(editedWorkout);
      if (editedWorkout) {
        state.currentUser.editedWorkout = editedWorkout;
      }
    },
    setEditedWorkoutName(state, action) {
      state.currentUser.editedWorkout.name = action.payload;
    },
    setEditedWorkoutComments(state, action) {
      state.currentUser.editedWorkout.comments = action.payload;
    },
    setEditedWorkoutDate(state, action) {
      state.currentUser.editedWorkout.date = action.payload;
    },
    changeSetsAmount(state, action) {
      state.currentUser.editedWorkout.exercisesArr[action.payload.index].sets =
        action.payload.value;
    },
    changeRepsAmount(state, action) {
      state.currentUser.editedWorkout.exercisesArr[action.payload.index].reps =
        action.payload.value;
    },
    addExerciseToEditedWorkout(state, action) {
      if (state.currentUser.editedWorkout.exercisesArr.length) {
        state.currentUser.editedWorkout.exercisesArr.push({
          id: action.payload.id,
          sets: 0,
          reps: 0,
          name: action.payload.name,
        });
      }
    },
    resetEditedWorkout(state) {
      const initEditWorkout: IWorkout = {
        name: "Init",
        _id: "init",
        date: new Date(),
        comments: "init",
        userId: "init",
        exercisesArr: [{ name: "init", id: "init", sets: 0, reps: 0 }],
      };
      state.currentUser.editedWorkout = initEditWorkout;
    },
    deleteExerciseFromEditedWorkout(state, action) {
      state.currentUser.editedWorkout.exercisesArr.splice(action.payload, 1);
    },
    updateWorkoutToEdited(
      state,
      action: {
        payload: IWorkout;
        type: string;
      }
    ) {
      console.log(action.payload);
      state.currentUser.workoutsArr = state.currentUser.workoutsArr.map((workout: IWorkout) => {
        if (workout._id === action.payload._id) {
          return action.payload;
        } else {
          return workout;
        }
      });
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
