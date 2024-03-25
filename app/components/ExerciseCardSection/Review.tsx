"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { IComment } from "@/app/types";

interface IReviewProps {
  comment: IComment;
}

const Review = ({ comment }: IReviewProps) => {
  const workoutDate = new Date(comment.data).toLocaleString("ru-RU", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className=" flex flex-col py-3 px-3  mb-6 shadow-cardElementShadow">
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
