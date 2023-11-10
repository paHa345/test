import { IExercise } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SmallExerciseCard = ({
  name,
  _id,
  id,
  image,
  isBest,
  type,
  raiting,

  muscleGroups,
  mainGroup,
  mainGroupRu,
}: IExercise) => {
  const muscleGroupsEl = muscleGroups.map((el) => {
    return (
      <li key={el} className=" list-none pl-9">
        {el}
      </li>
    );
  });

  return (
    <article className="  transition-shadow px-5 py-5 bg-gradient-to-tr from-secoundaryColor to-slate-200 rounded-lg shadow-exerciseCardShadow hover:shadow-exerciseCardHowerShadow">
      <div className=" flex flex-col">
        <Link href={`./catalog/${_id}`}>
          <div className=" flex flex-col gap-2 mb-3">
            <h1 className=" grow text-2xl text font-bold pl-7 pt-7">{name}</h1>
            {type === "base" ? (
              <p className="  bg-baseColour self-center py-1 px-2 rounded-md">Базовое</p>
            ) : (
              <p className="  bg-isolatedColour self-center py-1 px-2 rounded-md text-cyan-50">
                Изолированное
              </p>
            )}
            <p className="  bg-mainGroupColour self-center py-1 px-2 rounded-md">{mainGroupRu}</p>
          </div>
          <div className=" flex flex-row justify-center">
            <div className=" basis-3/4">
              <Image
                className=" w-full"
                src={image}
                alt="exercise-image"
                width={60}
                height={60}
              ></Image>
            </div>
          </div>
        </Link>

        <div className=" flex flex-col">
          <div className=" self-end pt-7">
            Рейтинг: <span className=" text-lg font-bold">{raiting}</span>
          </div>
          <div className=" text-xl leading-7">
            <ul className=" text-center font-bold pt-7 pb-4"> Мышечные группы</ul>
            {muscleGroupsEl}
          </div>
        </div>
      </div>
    </article>
  );
};

export default SmallExerciseCard;
