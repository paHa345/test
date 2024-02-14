import { IExercise } from "@/app/types";
import Link from "next/link";
import React from "react";

const Train = ({ name, description, date, exercises }: any) => {
  const workoutDate = new Date(date).toLocaleString("ru-RU", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const exercisesEl = exercises.map(
    (
      exercise: { id: number; name: string; reps: number; sets: number; _id: number },
      index: number
    ) => {
      return (
        <div key={exercise._id} className=" flex flex-row gap-3" data-exerciseid={exercise._id}>
          <p>{index + 1}</p>
          <Link className=" hover:underline" href={`./catalog/${exercise.id}`}>
            <p>{exercise.name}</p>
          </Link>
          <p>
            {exercise.sets} X {exercise.reps}
          </p>
        </div>
      );
    }
  );

  return (
    <article className=" transition-shadow px-5 py-5 bg-gradient-to-tr from-secoundaryColor to-slate-200 rounded-sm shadow-exerciseCardShadow hover:shadow-exerciseCardHowerShadow">
      <div className=" flex flex-col gap-6">
        <div className=" flex flex-row justify-between ">
          <div>
            <h1 className=" text-xl font-bold">{name}</h1>
          </div>
          <div> {workoutDate}</div>
        </div>
        <div className=" flex flex-col gap-4">{exercisesEl}</div>
        <div>
          <h1>Комментарии</h1>
          <p className=" text-sm pt-2">{description}</p>
        </div>
      </div>
    </article>
  );
};

export default Train;
