"use client";
import { ICurrentExerciseSlice } from "@/app/store/currentExerciseSlice";
import React from "react";
import { useSelector } from "react-redux";
import Review from "./Review";
import { IComment } from "@/app/types";
import { IUserSlice } from "@/app/store/userSlice";
import { getSession, useSession } from "next-auth/react";
import DeleteReviewModal from "./DeleteReviewModal";

const Reviews = () => {
  const currentExerciseComments = useSelector(
    (state: ICurrentExerciseSlice) => state.currentExerciseState.comments
  );

  const daleteReviewShowModalStatus = useSelector(
    (state: ICurrentExerciseSlice) => state.currentExerciseState.daleteReviewShowModalStatus
  );

  const session = useSession();
  const reviewsEl = currentExerciseComments.map((review: IComment) => {
    return (
      <div key={review._id}>
        <Review comment={review} currentUserEmail={session.data?.user?.email}></Review>
      </div>
    );
  });
  return (
    <>
      {daleteReviewShowModalStatus && <DeleteReviewModal></DeleteReviewModal>}

      {reviewsEl}
    </>
  );
};

export default Reviews;
