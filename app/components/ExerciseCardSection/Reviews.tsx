import { ICurrentExerciseSlice } from "@/app/store/currentExerciseSlice";
import React from "react";
import { useSelector } from "react-redux";
import Review from "./Review";
import { IComment } from "@/app/types";

const Reviews = () => {
  const currentExerciseComments = useSelector(
    (state: ICurrentExerciseSlice) => state.currentExerciseState.comments
  );
  console.log(currentExerciseComments);

  const reviewsEl = currentExerciseComments.map((review: IComment) => {
    return (
      <div key={review._id}>
        <Review key={review._id} comment={review}></Review>
      </div>
    );
  });
  return <>{reviewsEl}</>;
};

export default Reviews;
