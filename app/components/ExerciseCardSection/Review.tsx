"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { IComment } from "@/app/types";

interface IReviewProps {
  comment: IComment;
  currentUserEmail: string | null | undefined;
}

const Review = ({ comment, currentUserEmail }: IReviewProps) => {
  const workoutDate = new Date(comment.data).toLocaleString("ru-RU", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  console.log(currentUserEmail);
  console.log(comment);
  return (
    <div className=" flex flex-col py-3 px-3  mb-6 shadow-cardElementShadow">
      {comment.userId?.email === currentUserEmail && (
        <a className=" flex justify-end px-3 py-3 " href="">
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
