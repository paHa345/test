import { IUser } from "@/app/types";
import React from "react";
import { useSelector } from "react-redux";

const Exercise = ({ workoutid }: any) => {
  const exercise = useSelector((state: IUser) => state.workoutsArr);
  return (
    <>
      {/* <p>{index + 1}</p>
          <Link className=" hover:underline" href={`./catalog/${exercise.id}`}>
            <p>{exercise.name}</p>
          </Link>
          <p>
            {exercise.sets} X {exercise.reps}
          </p> */}
    </>
  );
};

export default Exercise;
