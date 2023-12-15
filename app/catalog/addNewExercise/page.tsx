import React from "react";
import AddExerciseForm from "../../components/addExerciseSection/AddExerciseForm";

const addNewExercise = () => {
  return (
    <div className="mx-auto">
      <div className=" grid  grid-cols-mainGrid gap-3">
        <div className="col-span-2  mx-auto py-10">
          <h1 className=" text-4xl font-bold">Добавить упражнение</h1>
        </div>
      </div>
      <AddExerciseForm></AddExerciseForm>
    </div>
  );
};

export default addNewExercise;
