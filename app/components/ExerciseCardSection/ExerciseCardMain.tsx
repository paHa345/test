"use client";
import Image from "next/image";
import React, { useEffect } from "react";

import { useState } from "react";
import Review from "./Review";
import ReviewForm from "./ReviewForm";
import { IExercise } from "../../types";
import Reviews from "./Reviews";
import { useDispatch, useSelector } from "react-redux";
import { ICurrentExerciseSlice, currentExrciseActions } from "@/app/store/currentExerciseSlice";

const ExerciseCardMain = ({
  id,
  type,
  _id,
  name,
  image,
  isBest,
  raiting,
  video,
  description,
  muscleGroups,
  mainGroup,
  mainGroupRu,
  comments,
}: IExercise) => {
  const imageName = image || "";

  const muscleGroupsEl = muscleGroups?.map((el) => {
    return (
      <li key={el} className=" list-none pl-9">
        {el}
      </li>
    );
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(currentExrciseActions.setCurrentExercise(comments));
  }, []);

  return (
    <div className=" py-7">
      <div>
        <h1 className=" text-center text-2xl font-bold pb-6">{name}</h1>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 ">
        <div className=" w-4/5 justify-self-center pb-5">
          {imageName.startsWith("https://") ? (
            <img src={imageName} alt={imageName} />
          ) : (
            <Image
              className=" w-full"
              src={imageName}
              alt={imageName}
              width={200}
              height={200}
            ></Image>
          )}
        </div>
        <div className=" self-center">
          <div className=" flex items-center justify-around">
            <div className=" flex gap-5 flex-col md:flex-row">
              {type === "base" ? (
                <p className="  bg-baseColour py-1 px-2 rounded-md">Базовое</p>
              ) : (
                <p className=" bg-isolatedColour py-1 px-2 rounded-md text-slate-50">
                  Изолированное
                </p>
              )}
              <p className=" text-center   bg-mainGroupColour py-1 px-2 rounded-md">
                {mainGroupRu}
              </p>
            </div>

            <div className="">
              Рейтинг: <span className=" text-lg font-bold">{raiting}</span>
            </div>
          </div>

          <div className=" text-xl leading-7">
            <ul className=" text-center font-bold pt-7 pb-4"> Мышечные группы</ul>

            {muscleGroupsEl}
          </div>
        </div>
        <div>
          <div className=" flex w-full justify-center self-center">
            <iframe
              width="560"
              height="315"
              src={video}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div>
          <div>
            <h2 className=" text-center font-bold text-xl my-6">Описание</h2>
            <p>{description}</p>
          </div>
        </div>
        <div>
          <div></div>
          <ReviewForm></ReviewForm>
        </div>
        <div className=" ">
          <h1 className=" text-center font-bold text-xl pb-3">Оценки</h1>
          <Reviews></Reviews>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCardMain;
