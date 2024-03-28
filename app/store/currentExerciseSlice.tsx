import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IComment, IExercise } from "../types";

export const addReviewAndUploadToDatabase = createAsyncThunk(
  "currentExerciseState/addReviewAndUploadToDatabase",
  async function (addedReviewData: any, { rejectWithValue, dispatch }) {
    console.log(addedReviewData);
    try {
      const addedReviewReq = await fetch("./../api/reviews/addReview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(addedReviewData),
      });

      const addedReview = await addedReviewReq.json();

      const updatedExrciseReq = await fetch(
        `./../api/exercises/addReviewToExercise/${addedReviewData.exerciseId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({ reviewId: addedReview.result._id }),
        }
      );

      const updatedExercise = await updatedExrciseReq.json();

      dispatch(currentExrciseActions.addComment(addedReview.result));

      return addedReview;
    } catch (error: any) {
      rejectWithValue(error);
    }
  }
);

export interface ICurrentExerciseSlice {
  currentExerciseState: {
    currentexercise: IExercise;
    comments: IComment[] | [];
  };
}

interface ICurrentExerciseState {
  currentExercise: IExercise;
  comments: IComment[] | [];
}

export const initCurrentExerciseState: ICurrentExerciseState = {
  currentExercise: {
    _id: "",
    id: "",
    name: "",
    image: "",
    isBest: true,
    type: "",
    raiting: 4,
    video: "",
    description: "",
    muscleGroups: [],
    mainGroup: "",
    mainGroupRu: "",
    createdUserId: "",
    comments: [],
  },
  comments: [
    {
      data: new Date(Date.now()),
      exerciseId: "",
      score: 3,
      text: "",
      userId: {
        name: "",
        email: "",
      },
      _id: "",
    },
  ],
};

export const currentExerciseSlice = createSlice({
  name: "currentExerciseState",
  initialState: initCurrentExerciseState,
  reducers: {
    setCurrentExercise(state, action) {
      state.comments = action.payload;
    },
    addComment(
      state,
      action: {
        payload: any;
        type: string;
      }
    ) {
      const curComment = [...state.comments];
      curComment.unshift();
      if (curComment.length > 0) {
        curComment.unshift(action.payload);
      } else {
        curComment[0] = action.payload;
      }
      state.comments = curComment;
      // state.comments.push(action.payload)
      // if (state.currentExercise.comments) {
      //   state.currentExercise.comments.push({
      //     data: new Date(Date.now()),
      //     exerciseId: "",
      //     score: 3,
      //     text: "",
      //     userId: {
      //       name: "",
      //       email: "",
      //     },
      //     _id: "",
      //   });
      // } else {
      //   state.comments = [{ ...action.payload }];
      // }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addReviewAndUploadToDatabase.pending, (state) => {
      // state.updateExerciseStatus = uploadExerciseFetchStatus.Loading;
    });

    builder.addCase(addReviewAndUploadToDatabase.fulfilled, (state, action) => {
      // state.updateExerciseStatus = uploadExerciseFetchStatus.Resolve;
    });

    builder.addCase(addReviewAndUploadToDatabase.rejected, (state, action) => {
      // state.updateExerciseStatus = uploadExerciseFetchStatus.Error;
    });
  },
});

export const currentExrciseActions = currentExerciseSlice.actions;
