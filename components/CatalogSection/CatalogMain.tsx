import React, { useState } from "react";
import ExercisesMainSection from "../ExerciseSection/ExercisesMainSection";

const CatalogMain = () => {
  const muscleGroups = ["Все", "Трицепс", "Ноги", "Спина", "Грудные", "Плечи", "Бицепс"];
  const [muscleGroup, setMuscleGroup] = useState(0);

  const selectMuscleGroupHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setMuscleGroup(Number(e.target.value));
  };

  return (
    <>
      <div className="mx-auto py-8">
        <h1 className=" text-center text-2xl font-bold">Каталог упражнений</h1>
      </div>
      <div>
        <form className=" w-min pb-4" action="">
          {/* <label htmlFor="">{muscleGroups[muscleGroup]}</label> */}
          <select
            className=" bg-secoundaryColor py-3 px-4 mx-1 rounded-md shadow-exerciseCardHowerShadow border-solid border-2"
            onChange={selectMuscleGroupHandler}
            name=""
            id=""
          >
            <option value="0">Выберите мышечную группу</option>
            <option value="1">Трицепс</option>
            <option value="2">Ноги</option>
            <option value="3">Спина</option>
            <option value="4">Грудные</option>
            <option value="5">Плечи</option>
            <option value="6">Бицепс</option>
          </select>
        </form>
      </div>

      <div className=" mx-auto text-center text-2xl font-bold pb-5">
        <h1>{muscleGroups[muscleGroup]}</h1>
      </div>

      <div>
        <ExercisesMainSection></ExercisesMainSection>
      </div>
    </>
  );
};

export default CatalogMain;
