"use client";

import React, { useState } from "react";
import InputLabelEl from "./InputLabelEl";
import { useDispatch, useSelector } from "react-redux";
import {
  IAddExerciseSlice,
  addExerciseActions,
  addExerciseAndImage,
  addExerciseFetchStatus,
} from "@/store/addExerciseSlice";
import { AppDispatch } from "@/store";
import AddButton from "./AddButton";

const AddExerciseForm = () => {
  const exerciseFields = [
    {
      nameEn: "name",
      nameRu: "Имя",
      type: "text",
    },
    {
      nameEn: "type",
      nameRu: "Тип",
      type: "select",
      optionsArr: [
        { nameRu: "Базовое", nameEn: "base" },
        { nameRu: "Изолированное", nameEn: "isolated" },
      ],
    },
    {
      nameEn: "muscleGroups",
      nameRu: "Мышечные группы",
      type: "addedButton",
    },
    {
      nameEn: "video",
      nameRu: "Видео",
      type: "text",
    },
    {
      nameEn: "description",
      nameRu: "Описание",
      type: "textarea",
    },
    {
      nameEn: "mainGroup",
      nameRu: "Основная мышечная группа",
      type: "select",
      optionsArr: [
        { nameRu: "Бицепс", nameEn: "biceps" },
        { nameRu: "Трицепс", nameEn: "triceps" },
        { nameRu: "Грудь", nameEn: "chest" },
        { nameRu: "Ноги", nameEn: "legs" },
        { nameRu: "Плечи", nameEn: "shoulders" },
        { nameRu: "Спина", nameEn: "back" },
      ],
    },
  ];

  const addedExercise = useSelector(
    (state: IAddExerciseSlice) => state.addExerciseState.currentAddedExercise
  );
  const dispatch = useDispatch<AppDispatch>();
  const uploadImageDispatch = useDispatch();

  const exerciseInputEl = exerciseFields.map((el) => {
    return (
      <div key={el.nameEn}>
        <InputLabelEl
          nameEn={el.nameEn}
          nameRu={el.nameRu}
          type={el.type}
          optionsArr={el?.optionsArr}
        ></InputLabelEl>
      </div>
    );
  });

  const uploadImageHandler = (e: any) => {
    console.log(e.target.files?.[0]);
    uploadImageDispatch(addExerciseActions.changeUploadedImage(e.target.files?.[0]));
    // (e) => setFile(e.target.files?.[0])
  };

  const addExerciseButtonHandler = () => {
    console.log(addedExercise);
    dispatch(addExerciseAndImage(addedExercise));
  };

  const addExerciseStatus: "ready" | "loading" | "resolve" | "error" = useSelector(
    (state: IAddExerciseSlice) => state.addExerciseState.fetchAddExerciseStatus
  );

  const uploadImage = useSelector(
    (state: IAddExerciseSlice) => state.addExerciseState.currentAddedExercise.imageFile
  );

  const [file, setFile] = useState<File>();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error(await res.text());
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className=" pt-10 pb-10">
        {/* <div className="pb-6">
        <h1 className=" text-center text-2xl font-bold">Регистрация в личном кабинете</h1>
    </div> */}

        {exerciseInputEl}
        <form action="" onSubmit={onSubmit}>
          <input type="file" name="file" onChange={(e) => setFile(e.target.files?.[0])} />
          <input type="submit" value="Upload" />
        </form>
      </div>

      {addExerciseStatus === "loading" && <p>Loading</p>}
      {addExerciseStatus === "resolve" && <p>Resolve</p>}
      {addExerciseStatus === "error" && <p>Error</p>}
      <div className=" flex justify-center pb-20 ">
        <button onClick={addExerciseButtonHandler} className=" self-center buttonStandart">
          Добавить упражнение
        </button>
      </div>
    </>
  );
};

export default AddExerciseForm;
