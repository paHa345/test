import { IAddExerciseSlice, addExerciseActions } from "@/store/addExerciseSlice";
import { IAppSlice } from "@/store/appStateSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const TextInput = ({
  onFocusStatus,
  clickHandler,
  focusElHandler,
  focusOutElHandler,
  changeNameHandler,
  elementValue,
  nameEn,
  nameRu,
}: any) => {
  const dispatch = useDispatch();

  const clickHand = () => {};
  return (
    <>
      <div onClick={clickHand}>
        <input
          onFocus={focusElHandler}
          onBlur={focusOutElHandler}
          onChange={changeNameHandler}
          className=" w-full  py-3 z-0 hover:border-slate-400 focus:border-slate-400 border-solid rounded border-2  border-slate-200"
          id={nameEn}
          type="text"
          value={elementValue}
        />
        <span className=" ">
          <label
            htmlFor="login"
            className={` absolute transition-all ease-in-out ${
              onFocusStatus || elementValue.length > 0
                ? "z-10 top-1 left-0  bg-white   scale-75"
                : " top-1/3 left-2"
            }`}
          >
            {nameRu}
          </label>
        </span>
      </div>
    </>
  );
};

export default TextInput;
