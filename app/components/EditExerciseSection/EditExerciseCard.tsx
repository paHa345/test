"use client";
import { IUserSlice, userActions } from "@/app/store/userSlice";
import { IExercise } from "@/app/types";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const EditExerciseCard = () => {
  const dispatch = useDispatch();
  const editedExercise: IExercise | null = useSelector(
    (state: IUserSlice) => state.userState.currentUser.editedExercise
  );
  const changeEditedExerciseName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(userActions.setEditedExerciseName(e.currentTarget.value));
  };

  const selectTypeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.currentTarget.value);
    dispatch(userActions.setEditedExerciseType(e.currentTarget.value));
  };

  return (
    <div className=" py-7">
      <div className="relative">
        <div className=" text-center text-2xl font-bold pb-6">
          <input
            className=" px-2  w-full  py-3 z-0 hover:border-slate-400 focus:border-slate-400 border-solid rounded border-2  border-slate-200"
            onChange={changeEditedExerciseName}
            type="text"
            value={editedExercise?.name}
          />

          <span className=" ">
            <label
              htmlFor="login"
              className="absolute transition-all ease-in-out z-10 bottom-3/4 left-0  bg-white   scale-75"
            >
              Имя
            </label>
          </span>
        </div>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 ">
        <div className=" w-4/5 justify-self-center pb-5">
          {
            editedExercise !== null && (
              <img
                className=" w-full"
                src={editedExercise.image}
                alt={editedExercise.image}
                width={200}
                height={200}
              />
            )
            //    {editedExercise?.image.startsWith("https://") ? (
            //     <img src={editedExercise?.image} alt={editedExercise?.image} />
            //   ) : (
            //     <Image
            //       className=" w-full"
            //       src={editedExercise?.image}
            //       alt={editedExercise?.image}
            //       width={200}
            //       height={200}
            //     ></Image>
            //   )}
          }
        </div>
        <div className=" self-center">
          <div className=" flex flex-col gap-5 items-center justify-around">
            <select onChange={selectTypeHandler} name={"type"} id={"type"}>
              <option value={"NOT"}>Выберете значение</option>

              <option key={"base"} value={"base"}>
                Базовое
              </option>
              <option key={"isolated"} value={"isolated"}>
                Изолированное
              </option>
            </select>
            {editedExercise?.type === "base" ? (
              <p className="  bg-baseColour py-1 px-2 rounded-md">Базовое</p>
            ) : (
              <p className=" bg-isolatedColour py-1 px-2 rounded-md text-slate-50">Изолированное</p>
            )}

            <div className="">
              Рейтинг: <span className=" text-lg font-bold">{editedExercise?.raiting}</span>
            </div>
          </div>

          <div className=" text-xl leading-7">
            <ul className=" text-center font-bold pt-7 pb-4"> Мышечные группы</ul>

            {/* {muscleGroupsEl} */}
          </div>
          {/* 
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
        <Review></Review>
        <Review></Review>
    */}
        </div>
      </div>
    </div>
  );
};

export default EditExerciseCard;
