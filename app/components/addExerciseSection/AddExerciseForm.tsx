"use client";

import React, { useEffect, useRef, useState } from "react";
import InputLabelEl from "./InputLabelEl";
import { useDispatch, useSelector } from "react-redux";
import {
  IAddExerciseSlice,
  addExerciseActions,
  addExerciseAndImage,
  addExerciseFetchStatus,
} from "../../store/addExerciseSlice";
import { AppDispatch } from "../../store";
import AddButton from "./AddButton";
import UploadImageForm from "./UploadImageForm";
import type { PutBlobResult } from "@vercel/blob";
import ExerciseName from "./ExerciseName";

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

  // const [file, setFile] = useState<File>();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [imageURL, setImageURL] = useState("");
  const [addImageNotification, setAddImageNotification] = useState("");
  const [addedExerciseImage, setAddedExerciseImage] = useState<string | undefined>(undefined);

  const addedExercise = useSelector(
    (state: IAddExerciseSlice) => state.addExerciseState.currentAddedExercise
  );

  const errorMessage = useSelector(
    (state: IAddExerciseSlice) => state.addExerciseState.addExerciseErrorMessage
  );

  const image = useSelector(
    (state: IAddExerciseSlice) => state.addExerciseState.currentAddedExercise.image
  );
  const dispatch = useDispatch<AppDispatch>();
  // const uploadImageDispatch = useDispatch();

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

  const changeImageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (!inputFileRef.current?.files) {
      return;
    }
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    if (inputFileRef.current?.files[0].size > 100000) {
      setAddImageNotification("Слишком большой объём выбранного изображения");
      return;
    }

    const objectURL = URL.createObjectURL(e.target.files[0]);
    // console.log(objectURL);
    setAddedExerciseImage(objectURL);
    setAddImageNotification("Изображение добавлено");
  };

  const addExerciseButtonHandler = async () => {
    // console.log(addedExercise);
    dispatch(addExerciseActions.setAddExerciseStatusToLoading());
    //добавляем загрузку изображения и далее берём его имя и загружаем его в упражнение
    await uploadImage();
    // console.log(blob?.url);

    await addCurrentUserIDToExercise();

    // await dispatch(addExerciseActions.changeUploadedImage(blob?.url));

    await dispatch(addExerciseAndImage({ addedExercise: addedExercise, imageURL: imageURL }));
  };

  const addExerciseStatus: "ready" | "loading" | "resolve" | "error" = useSelector(
    (state: IAddExerciseSlice) => state.addExerciseState.fetchAddExerciseStatus
  );

  const addCurrentUserIDToExercise = async () => {
    const currentUserReq = await fetch("/api/users/getUserByEmail");
    const currentUser = await currentUserReq.json();
    console.log(currentUser.result._id);
    dispatch(addExerciseActions.setCreatedUserID(currentUser.result._id));
  };

  const uploadImage = async () => {
    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }

    const file = inputFileRef.current.files[0];

    const response = await fetch(`/api/upload?filename=${file.name}`, {
      method: "POST",
      body: file,
    });

    const newBlob = (await response.json()) as PutBlobResult;

    console.log(newBlob.url);
    setBlob(() => {
      return newBlob;
    });
    setImageURL(() => {
      return newBlob.url;
    });
    dispatch(addExerciseActions.changeUploadedImage(newBlob.url));

    //это простой пример загрузки изображения на локальный сервер
    //
    // if (!file) return;

    // try {
    //   const data = new FormData();
    //   data.append("file", file, `${image}`);
    //   const res = await fetch("/api/upload", {
    //     method: "POST",
    //     body: data,
    //   });

    //   if (!res.ok) throw new Error(await res.text());
    // } catch (error: any) {
    //   console.log(error.message);
    // }
    //
    //
  };

  useEffect(() => {
    if (addExerciseStatus === "resolve" || addExerciseStatus === "error") {
      setTimeout(() => {
        dispatch(addExerciseActions.setAddExerciseStatusToReady());
      }, 3000);
    }
  }, [addExerciseStatus]);

  return (
    <>
      {/* <ExerciseName></ExerciseName> */}
      <div className=" pt-10 pb-10">
        {exerciseInputEl}
        <input name="file" onChange={changeImageHandler} ref={inputFileRef} type="file" required />
        {addImageNotification && <h1 className=" py-2">{addImageNotification}</h1>}

        {addedExerciseImage && (
          <div className=" sm:w-2/5 w-4/5 justify-self-center pt-5 pb-5">
            <img
              className=" w-full"
              src={addedExerciseImage}
              alt={addedExerciseImage}
              width={200}
              height={200}
            />
          </div>
        )}

        {/* {blob && (
          <div>
            Blob url: <a href={blob.url}>{blob.url}</a>
          </div>
        )} */}
        {/* <UploadImageForm file={file} setFile={setFile}></UploadImageForm> */}
        {/* <button onClick={uploadImage}>Click</button> */}
      </div>

      {/* {addExerciseStatus === "ready" && (
        <h1 className=" my-3 text-center px-3 rounded-md py-3 bg-cyan-200">Загрузка тренировки</h1>
      )} */}
      {addExerciseStatus === "loading" && (
        <h1 className=" my-3 text-center px-3 rounded-md py-3 bg-cyan-200">Загрузка упражнения</h1>
      )}
      {addExerciseStatus === "resolve" && (
        <h1 className=" my-3 text-center px-3 rounded-md py-3 bg-green-200">
          Упражнение успешно загружено
        </h1>
      )}
      {addExerciseStatus === "error" && (
        <div>
          <h1 className=" text-center rounded-md   px-3 py-3 bg-rose-500">{errorMessage}</h1>
          <br />
          <h1 className=" text-center rounded-md   px-3 py-3 bg-rose-500">
            Ошибка загрузки. Повторите попытку позже
          </h1>
          <br />
        </div>
      )}
      <div className=" flex justify-center pb-20 ">
        <button onClick={addExerciseButtonHandler} className=" self-center buttonStandart">
          Добавить упражнение
        </button>
      </div>
    </>
  );
};

export default AddExerciseForm;
