"use client";

import { IAppSlice } from "@/app/store/appStateSlice";
import { IUserSlice } from "@/app/store/userSlice";
import { IExercise, IUser } from "@/app/types";
import React from "react";
import { useSelector } from "react-redux";
import CatalogMain from "../CatalogSection/CatalogMain";
import Link from "next/link";
import EditExerciseCard from "./EditExerciseCard";
import { IEditExerciseSlice } from "@/app/store/editExerciseSlice";

const EditExerciseMain = () => {
  const editedExercise: IExercise | null = useSelector(
    (state: IEditExerciseSlice) => state.editExerciseState.editedExercise
  );

  if (!editedExercise) {
    return (
      <>
        <div className=" py-40 h-3/4 flex flex-col gap-5 items-center">
          <h1>Ошибка. Выберете упражнение для редактирования</h1>
          <Link className=" hover:underline" href={"./"}>
            Каталог упражнений
          </Link>
        </div>
      </>
    );
  } else {
    return <EditExerciseCard></EditExerciseCard>;
  }
};

export default EditExerciseMain;
