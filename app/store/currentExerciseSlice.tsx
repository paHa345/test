import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IComment, IExercise } from "../types";
import { editExerciseRevalidateServerAction } from "@/actions/editExercise";

export const addReviewAndUploadToDatabase = createAsyncThunk(
  "currentExerciseState/addReviewAndUploadToDatabase",
  async function (addedReviewData: any, { rejectWithValue, dispatch }) {
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

      const currentAddedReviewReq = await fetch(`./../api/reviews/${addedReview.result._id}`);

      const currentAddedReview = await currentAddedReviewReq.json();

      const addReviewToUserReq = await fetch(`./../api/users/addReviewToUser`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ reviewsArr: currentAddedReview.result._id }),
      });

      dispatch(currentExrciseActions.addComment(currentAddedReview.result));
      dispatch(currentExrciseActions.addCurrentExerciseUserReview(currentAddedReview.result));

      return addedReview;
    } catch (error: any) {
      rejectWithValue(error);
    }
  }
);

export const deleteReview = createAsyncThunk(
  "currentExerciseState/deleteReview",
  async function (deleteReviewData: any, { rejectWithValue, dispatch }) {
    try {
      //delete from exercise
      const deleteReviewFromExerciseReq = await fetch("/api/exercises/deleteReviewFromExercise", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          exerciseId: deleteReviewData.exerciseId,
          reviewId: deleteReviewData.reviewId,
        }),
      });

      if (!deleteReviewFromExerciseReq.ok) {
        throw new Error("Ошибка сервера");
      }

      const deleteReviewFromUserReq = await fetch("/api/users/deleteReviewFromUser", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          reviewId: deleteReviewData.reviewId,
        }),
      });

      if (!deleteReviewFromExerciseReq.ok) {
        throw new Error("Ошибка сервера");
      }

      // //delete from db

      const deletedReviewReq = await fetch(`/api/reviews/${deleteReviewData.reviewId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });

      if (!deletedReviewReq.ok) {
        throw new Error("Ошибка сервера");
      }

      //delete from slice

      await dispatch(currentExrciseActions.deleteReview(deleteReviewData.reviewId));
      dispatch(currentExrciseActions.deleteCurrentExerciseUserReview());
      dispatch(currentExrciseActions.stopDeleteReview());
      editExerciseRevalidateServerAction(deleteReviewData.exerciseId);
    } catch (error: any) {
      rejectWithValue(error);
    }
  }
);

export enum fetchCurrentExerciseStatus {
  Ready = "ready",
  Loading = "loading",
  Resolve = "resolve",
  Error = "error",
}

interface ICurrentExerciseUserReview {
  data: Date;
  exerciseId: string;
  score: number;
  text: string;
  userId: string;
  _id: string;
}

export interface ICurrentExerciseSlice {
  currentExerciseState: {
    currentexercise: IExercise;
    comments: IComment[] | [];
    daleteReviewShowModalStatus: boolean;
    deleteReviewStatus: fetchCurrentExerciseStatus;
    addReviewStatus: fetchCurrentExerciseStatus;
    currentReviewDeleteId: string;
    currentExerciseUserReview: ICurrentExerciseUserReview | undefined;
  };
}

interface ICurrentExerciseState {
  currentExercise: IExercise;
  comments: IComment[] | [];
  daleteReviewShowModalStatus: boolean;
  deleteReviewStatus: fetchCurrentExerciseStatus;
  addReviewStatus: fetchCurrentExerciseStatus;

  currentReviewDeleteId: string;
  currentExerciseUserReview: ICurrentExerciseUserReview | undefined;
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
  daleteReviewShowModalStatus: false,
  deleteReviewStatus: fetchCurrentExerciseStatus.Ready,
  addReviewStatus: fetchCurrentExerciseStatus.Ready,
  currentReviewDeleteId: "",
  currentExerciseUserReview: undefined,
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
    },
    startDeleteReview(state) {
      state.daleteReviewShowModalStatus = true;
    },
    stopDeleteReview(state) {
      state.daleteReviewShowModalStatus = false;
    },
    setCurrentReviewDeleteId(state, action) {
      state.currentReviewDeleteId = action.payload;
    },
    deleteReview(state, action) {
      const deletedReviewIndex = state.comments.findIndex((review: IComment) => {
        return review._id === action.payload;
      });

      state.comments.splice(deletedReviewIndex, 1);
    },
    setDeleteReviewStatusToReady(state) {
      state.deleteReviewStatus = fetchCurrentExerciseStatus.Ready;
    },
    setAddReviewStatusToReady(state) {
      state.addReviewStatus = fetchCurrentExerciseStatus.Ready;
    },
    setCurrentExerciseUserReview(state, action) {
      state.currentExerciseUserReview = action.payload;
    },
    deleteCurrentExerciseUserReview(state) {
      state.currentExerciseUserReview = undefined;
    },
    addCurrentExerciseUserReview(state, action) {
      state.currentExerciseUserReview = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addReviewAndUploadToDatabase.pending, (state) => {
      state.addReviewStatus = fetchCurrentExerciseStatus.Loading;
    });

    builder.addCase(deleteReview.pending, (state) => {
      state.deleteReviewStatus = fetchCurrentExerciseStatus.Loading;
    });

    builder.addCase(addReviewAndUploadToDatabase.fulfilled, (state, action) => {
      state.addReviewStatus = fetchCurrentExerciseStatus.Resolve;
    });

    builder.addCase(deleteReview.fulfilled, (state, action) => {
      state.deleteReviewStatus = fetchCurrentExerciseStatus.Resolve;
    });

    builder.addCase(addReviewAndUploadToDatabase.rejected, (state, action) => {
      state.addReviewStatus = fetchCurrentExerciseStatus.Error;
    });

    builder.addCase(deleteReview.rejected, (state, action) => {
      state.deleteReviewStatus = fetchCurrentExerciseStatus.Error;
    });
  },
});

export const currentExrciseActions = currentExerciseSlice.actions;
