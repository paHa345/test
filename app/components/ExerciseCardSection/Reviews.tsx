"use client";
import { ICurrentExerciseSlice } from "@/app/store/currentExerciseSlice";
import React from "react";
import { useSelector } from "react-redux";
import Review from "./Review";
import { IComment } from "@/app/types";
import { IUserSlice } from "@/app/store/userSlice";
import { getSession, useSession } from "next-auth/react";

const Reviews = async () => {
  const currentExerciseComments = useSelector(
    (state: ICurrentExerciseSlice) => state.currentExerciseState.comments
  );
  console.log(currentExerciseComments);

  const session = useSession();
  const reviewsEl = currentExerciseComments.map((review: IComment) => {
    return (
      <div key={review._id}>
        <Review comment={review} currentUserEmail={session.data?.user?.email}></Review>
      </div>
    );
  });
  return <>{reviewsEl}</>;
};

export default Reviews;
