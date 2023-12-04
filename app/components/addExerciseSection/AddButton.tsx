import { IAddExerciseSlice } from "../../store/addExerciseSlice";
import React from "react";
import { useSelector } from "react-redux";

const AddButton = ({
  focusElHandler,
  focusOutElHandler,
  changeNameHandler,
  nameEn,
  elementValue,
  addMuscleGroupHandler,
  addadMuscleGroup,
  deleteMuscleGroup,
}: any) => {
  const addedMuscleGroup = useSelector(
    (state: IAddExerciseSlice) => state.addExerciseState.currentAddedExercise.muscleGroups
  );

  const addedMuscleGroupEl = addedMuscleGroup.map((el: any, index: any) => {
    return (
      <div key={el} className=" rounded-md w-fit bg-neutral-400 flex gap-3 px-2 py-2 mx-2 my-2">
        {" "}
        <p>{el}</p>
        <button className="  hover:font-bold" data-index={index} onClick={deleteMuscleGroup}>
          X
        </button>
      </div>
    );
  });

  return (
    <>
      <div>
        <input
          onFocus={focusElHandler}
          onBlur={focusOutElHandler}
          onChange={changeNameHandler}
          className=" w-2/4  py-3 z-0 hover:border-slate-400 focus:border-slate-400 border-solid rounded border-2  border-slate-200"
          id={nameEn}
          type="email"
          value={elementValue}
          placeholder="Добавляйте мышечные группы по одной"
        />
        <button
          onClick={addMuscleGroupHandler}
          className=" bg-baseColour
        }   self-center mx-3 my-3 py-1 px-2 rounded-md hover:shadow-cardElementShadow "
        >
          Добавить
        </button>
      </div>
      <p>Мышечные группы</p>
      {addedMuscleGroupEl}
    </>
  );
};

export default AddButton;
