"use client";
import { IAppSlice } from "@/app/store/appStateSlice";
import { ISearchExerciseSlice, findExerciseAndSetInState } from "@/app/store/searchExerciseSlice";
import { useSearchParams } from "next/navigation";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ISmallExerciseProps } from "../SmallExerciseCardSection/SmallExerciseCard";
import { AppDispatch } from "@/app/store";

const SearchMainComponent = () => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  console.log(searchParams.get("query"));
  const findedExercises = useSelector(
    (state: ISearchExerciseSlice) => state.searchExerciseState.searchExercises
  );
  console.log(findedExercises);
  // useEffect(() => {
  //   if (searchParams.get("query") !== null) {
  //     dispatch(findExerciseAndSetInState(searchParams.get("query")));
  //   }
  // }, []);
  return (
    <>
      {searchParams.get("query") ? (
        <div className="py-5 flex justify-center">
          <h1 className=" mx-auto">
            {" "}
            По запросу {searchParams.get("query")}{" "}
            {findedExercises?.length
              ? `найдено ${findedExercises?.length} упражнений`
              : `упражнений не найдено`}
          </h1>
        </div>
      ) : (
        <h1>Введите поисковый запрос</h1>
      )}
      {/* <p>{testSearch}</p> */}
    </>
  );
};

export default SearchMainComponent;
