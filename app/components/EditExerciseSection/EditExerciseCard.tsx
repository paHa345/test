"use client";
import { IUserSlice, userActions } from "@/app/store/userSlice";
import { IExercise } from "@/app/types";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const EditExerciseCard = () => {
  const dispatch = useDispatch();
  const [addedMuscleGroup, setAddedMuscleGroup] = useState("");
  const [addedExerciseVideo, setAddedExerciseVideo] = useState("");
  const inputFileRef = useRef<HTMLInputElement>(null);


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
  const deleteMuscleGroup = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.dataset.index);
    dispatch(userActions.deleteEditedExerciseMuscleGroup(e.currentTarget.dataset.index));
  };

  const addMuscleGroupHandler = () => {
    dispatch(userActions.addEditedExerciseMuscleGroup(addedMuscleGroup));
  };

  const changeEditedExerciseAddedMuscleGroup = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddedMuscleGroup(String(e.currentTarget.value));
  };

  const changeEditedExerciseVideo = (e: any) => {
    setAddedExerciseVideo(e.currentTarget.value);
  };

  const setEditedExerciseVideo = (e: React.MouseEvent<HTMLButtonElement>) => {
    // console.log(e.currentTarget.value);
    dispatch(userActions.setEditedexerciseVideo(addedExerciseVideo));
  };

  const editedExerciseChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // console.log(e.currentTarget.value);
    dispatch(userActions.setEditedExerciseDescription(e.currentTarget.value));
  };

  const selecteditedexerciseImage = (e: React.ChangeEvent<HTMLInputElement>)=>{
    // if(editedExercise){
    //   if(editedExercise.exerciseImage){
    //     return <Image src={editedExercise.exerciseImage} alt="Exercise Image" width="100%" height="100%" />
    //   }
    // }
    console.log(e.currentTarget.files)
  }

  const editedExerciseMuscleGroups: any = editedExercise?.muscleGroups
    ? editedExercise.muscleGroups.map((muscleGroup, index) => {
        return (
          <div
            key={muscleGroup}
            className=" rounded-md w-fit bg-neutral-400 flex gap-3 px-2 py-2 mx-2 my-2"
          >
            {" "}
            <p>{muscleGroup}</p>
            <button className="  hover:font-bold" data-index={index} onClick={deleteMuscleGroup}>
              X
            </button>
          </div>
        );
      })
    : [];
  // if(editedExercise?.muscleGroups){

  //   editedExerciseMuscleGroups = editedExercise.muscleGroups.map(()=>{

  //   })
  // }

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
              className="absolute transition-all ease-in-out z-10 -top-4 left-2 bg-white scale-95"
            >
              Название
            </label>
          </span>
        </div>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 ">
        <div className=" relative px-2 py-10 hover:border-slate-400 focus:border-slate-400 border-solid rounded border-2  border-slate-200  flex flex-col gap-5 items-center justify-around">

       
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
                <div className=" pt-10 pb-10">
        {/* {exerciseInputEl} */}
        <input onChange={selecteditedexerciseImage} name="file" ref={inputFileRef}  type="file" required />

      </div>
          <span className=" ">
              <label
                htmlFor="type"
                className="absolute transition-all ease-in-out z-10 -top-4 text-2xl font-bold left-0 bg-white scale-95"
              >
                Изображение
              </label>
            </span>
        </div>
        </div>
        <div className=" self-center">
          <div className=" relative px-2 py-10 hover:border-slate-400 focus:border-slate-400 border-solid rounded border-2  border-slate-200  flex flex-col gap-5 items-center justify-around">
            <select
              className=" hover:border-slate-400 focus:border-slate-400 border-solid rounded border-2  border-slate-200"
              onChange={selectTypeHandler}
              name={"type"}
              id={"type"}
            >
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

            <span className=" ">
              <label
                htmlFor="type"
                className="absolute transition-all ease-in-out z-10 -top-4 text-2xl font-bold left-0 bg-white scale-95"
              >
                Тип упражнения
              </label>
            </span>

            {/* <div className="">
              Рейтинг: <span className=" text-lg font-bold">{editedExercise?.raiting}</span>
            </div> */}
          </div>

          <div className=" relative my-8 px-2 py-9 hover:border-slate-400 focus:border-slate-400 border-solid rounded border-2  border-slate-200">
            {/* <h1 className=" text-center font-bold pt-7 pb-4"> Мышечные группы</h1> */}

            <input
              className=" w-2/4  py-3 z-0 hover:border-slate-400 focus:border-slate-400 border-solid rounded border-2  border-slate-200"
              id={"addEditedExerciseMuscleGroup"}
              type="email"
              onChange={changeEditedExerciseAddedMuscleGroup}
              value={addedMuscleGroup}
              placeholder="Добавляйте мышечные группы по одной"
            />
            <button
              onClick={addMuscleGroupHandler}
              className=" bg-baseColour   self-center mx-3 my-3 py-1 px-2 rounded-md hover:shadow-cardElementShadow "
            >
              Добавить
            </button>
            <div className=" text-xl leading-7">{editedExerciseMuscleGroups}</div>

            <span className=" ">
              <label
                htmlFor="muscleGroups"
                className="absolute transition-all ease-in-out z-10 -top-4 text-2xl font-bold left-0 bg-white scale-95"
              >
                Мышечные группы
              </label>
            </span>
          </div>
        </div>
        <div>
          {/* <div className="relative">
            <div className=" text-center text-2xl font-bold pb-6">
              <input
                className=" px-2  w-full  py-3 z-0 hover:border-slate-400 focus:border-slate-400 border-solid rounded border-2  border-slate-200"
                onChange={changeEditedExerciseVideo}
                type="text"
                value={editedExercise?.video}
              />

              <span className=" ">
                <label
                  htmlFor="video"
                  className="absolute transition-all ease-in-out z-10 bottom-3/4 left-0  bg-white   scale-75"
                >
                  Сменить видео
                </label>
              </span>
            </div>
          </div> */}

          <div className=" relative my-4 px-2 py-2 hover:border-slate-400 focus:border-slate-400 border-solid rounded border-2  border-slate-200 ">
            <div className=" my-3">
              <input
                className=" w-2/4  py-3 z-0 hover:border-slate-400 focus:border-slate-400 border-solid rounded border-2  border-slate-200"
                id={"addEditedExerciseVideo"}
                type="text"
                onChange={changeEditedExerciseVideo}
                value={addedExerciseVideo}
                placeholder="Вставьте ссылку на видео с YouTube"
              />
              <button
                onClick={setEditedExerciseVideo}
                className=" bg-baseColour   self-center mx-3 my-3 py-1 px-2 rounded-md hover:shadow-cardElementShadow "
              >
                Добавить видео
              </button>
            </div>
            {editedExercise?.video ? (
              <div className=" flex w-full justify-center self-center">
                <iframe
                  width="560"
                  height="315"
                  src={editedExercise?.video}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <h1 className=" ">Видео не добавлено</h1>
            )}
          <span className=" ">
              <label
                htmlFor="video"
                className="absolute transition-all ease-in-out z-10 -top-4 text-2xl font-bold left-0 bg-white scale-95"
              >
                Видео
              </label>
            </span>
          </div>
        </div>

        <div className=" py-7 pb-6">
          <div className="relative">
            <div className=" mx-2 ">
              <textarea
                onChange={editedExerciseChangeDescription}
                className="px-2  w-full  py-3 z-0 hover:border-slate-400 focus:border-slate-400 border-solid rounded border-2  border-slate-200"
                id={"editedExerciseDescription"}
                value={editedExercise?.description}
                rows={5}
              />
              <span className=" ">
                <label
                  htmlFor="login"
                  className="absolute transition-all ease-in-out z-10 -top-4 text-2xl font-bold left-2 bg-white scale-95"
                  >
                  Описание
                </label>
              </span>
            </div>
          </div>

          {/* 
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
