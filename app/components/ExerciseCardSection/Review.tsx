"use client";

import React, { MouseEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { IComment } from "@/app/types";
import { useDispatch } from "react-redux";
import { currentExerciseSlice, currentExrciseActions } from "@/app/store/currentExerciseSlice";

interface IReviewProps {
  comment: IComment;
  currentUserEmail: string | null | undefined;
}

const Review = ({ comment, currentUserEmail }: IReviewProps) => {
  const dispatch = useDispatch();
  const deleteReviewHandler = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(currentExrciseActions.setCurrentReviewDeleteId(comment._id));
    dispatch(currentExrciseActions.startDeleteReview());
  };

  const workoutDate = new Date(comment.data).toLocaleString("ru-RU", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className=" flex flex-col py-3 px-3  mb-6 shadow-cardElementShadow">
      {comment.userId?.email === currentUserEmail && (
        <a
          className=" flex justify-end px-3 py-3 "
          href=""
          onClick={deleteReviewHandler}
          data-reviewid={comment._id}
        >
          <FontAwesomeIcon icon={faTrash} />
        </a>
      )}

      <div className=" flex flex-raw justify-between">
        <p>{comment.userId?.name}</p>
        <p>{workoutDate}</p>
      </div>
      <div className=" mx-auto">
        {" "}
        <p>
          {" "}
          <span>
            {" "}
            <FontAwesomeIcon className=" text-headerButtonHoverColor" icon={faStar} />
          </span>
          {comment.score}
        </p>
      </div>
      <div>
        <p>{comment.text}</p>
      </div>
    </div>
  );
};

export default Review;
