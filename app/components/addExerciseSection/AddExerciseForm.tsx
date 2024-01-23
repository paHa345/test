"use client";

// import type { PutBlobResult } from "@vercel/blob";
// import { useState, useRef } from "react";

// export default function AddExerciseForm() {
//   const inputFileRef = useRef<HTMLInputElement>(null);
//   const [blob, setBlob] = useState<PutBlobResult | null>(null);
//   return (
//     <>
//       <h1>Upload Your Avatar</h1>

//       <form
//         onSubmit={async (event) => {
//           event.preventDefault();

//           if (!inputFileRef.current?.files) {
//             throw new Error("No file selected");
//           }

//           const file = inputFileRef.current.files[0];

//           const response = await fetch(`/api/upload?filename=${file.name}`, {
//             method: "POST",
//             body: file,
//           });

//           const newBlob = (await response.json()) as PutBlobResult;

//           setBlob(newBlob);
//         }}
//       >
//         <input name="file" ref={inputFileRef} type="file" required />
//         <button type="submit">Upload</button>
//       </form>
//       {blob && (
//         <div>
//           Blob url: <a href={blob.url}>{blob.url}</a>
//         </div>
//       )}
//     </>
//   );
// }

import React, { useRef, useState } from "react";
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

  const [file, setFile] = useState<File>();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [imageURL, setImageURL] = useState("");

  const addedExercise = useSelector(
    (state: IAddExerciseSlice) => state.addExerciseState.currentAddedExercise
  );

  const image = useSelector(
    (state: IAddExerciseSlice) => state.addExerciseState.currentAddedExercise.image
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

  const addExerciseButtonHandler = async () => {
    console.log(addedExercise);
    //добавляем загрузку изображения и далее берём его имя и загружаем его в упражнение
    await uploadImage();
    console.log(blob?.url);

    // await dispatch(addExerciseActions.changeUploadedImage(blob?.url));

    await dispatch(addExerciseAndImage({ addedExercise: addedExercise, imageURL: imageURL }));
  };

  const addExerciseStatus: "ready" | "loading" | "resolve" | "error" = useSelector(
    (state: IAddExerciseSlice) => state.addExerciseState.fetchAddExerciseStatus
  );

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

  return (
    <>
      <div className=" pt-10 pb-10">
        {/* <div className="pb-6">
        <h1 className=" text-center text-2xl font-bold">Регистрация в личном кабинете</h1>
    </div> */}

        {exerciseInputEl}
        <input name="file" ref={inputFileRef} type="file" required />
        {blob && (
          <div>
            Blob url: <a href={blob.url}>{blob.url}</a>
          </div>
        )}
        {/* <UploadImageForm file={file} setFile={setFile}></UploadImageForm> */}
        <button onClick={uploadImage}>Click</button>
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
