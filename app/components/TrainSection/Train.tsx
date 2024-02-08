import { IExercise } from "@/app/types";
import Link from "next/link";
import React from "react";

const Train = ({ name, description, date, exercises }: any) => {
  const exercisesEl = exercises.map(
    (
      exercise: { id: number; name: string; reps: number; sets: number; _id: number },
      index: number
    ) => {
      return (
        <div key={exercise._id} className=" flex flex-row gap-3">
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
          <div> {date}</div>
        </div>
        <div className=" flex flex-col gap-4">
          {exercisesEl}
          {/* <div className=" flex flex-row gap-3">
            <p>1</p>
            <Link className=" hover:underline" href="/">
              <p>Жим штанги лёжа</p>
            </Link>
            <p>4 X 10</p>
          </div>
          <div className=" flex flex-row gap-3">
            <p>2</p>
            <Link className=" hover:underline" href="/">
              <p>Жим гантелей лёжа</p>
            </Link>
            <p>3 X 14</p>
          </div>
          <div className=" flex flex-row gap-3">
            <p>3</p>
            <Link className=" hover:underline" href="/">
              <p>Отжимания от пола</p>
            </Link>
            <p> 4 X 20</p>
          </div>
          <div className=" flex flex-row gap-3">
            {" "}
            <p>4</p>
            <Link className=" hover:underline" href="/">
              <p>Приседания со штангой</p>
            </Link>
            <p>4 X 10</p>
          </div> */}
        </div>
        <div>
          <h1>Комментарии</h1>
          <p className=" text-sm pt-2">{description}</p>
        </div>
      </div>
    </article>
  );
};

export default Train;
