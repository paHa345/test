import { IAddExerciseSlice, addExerciseActions } from "@/app/store/addExerciseSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ExerciseName = () => {
  const [onFocusStatus, setInFocusStatus] = useState(false);

  const focusElHandler = (e: React.FocusEvent<HTMLElement>) => {
    setInFocusStatus(true);
  };

  const focusOutElHandler = (e: React.FocusEvent<HTMLElement>) => {
    setInFocusStatus(false);
  };

  const dispatch = useDispatch();
  const exerciseName = useSelector(
    (state: IAddExerciseSlice) => state.addExerciseState.currentAddedExercise.name
  );
  const changeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(addExerciseActions.setName(e.currentTarget.value));
  };
  return (
    <div className=" relative py-4">
      <div>
        <input
          onFocus={focusElHandler}
          onBlur={focusOutElHandler}
          onChange={changeNameHandler}
          className=" w-full  py-3 z-0 hover:border-slate-400 focus:border-slate-400 border-solid rounded border-2  border-slate-200"
          type="text"
          id="name"
          value={exerciseName}
        />
        <span className="">
          <label
            htmlFor="name"
            className={` absolute transition-all ease-in-out ${
              onFocusStatus || exerciseName.length > 0
                ? "z-10 top-1 left-0  bg-white   scale-75"
                : " top-1/3 left-2"
            }`}
          >
            Имя
          </label>
        </span>
      </div>
    </div>
  );
};

export default ExerciseName;
