import React from "react";

const TextArea = ({
  onFocusStatus,
  clickHandler,
  focusElHandler,
  focusOutElHandler,
  changeTextareaNameHandler,
  elementValue,
  nameEn,
  nameRu,
}: any) => {
  return (
    <>
      <div onClick={clickHandler}>
        <textarea
          onFocus={focusElHandler}
          onBlur={focusOutElHandler}
          onChange={changeTextareaNameHandler}
          className=" w-full  py-3 z-0 hover:border-slate-400 focus:border-slate-400 border-solid rounded border-2  border-slate-200"
          id={nameEn}
          value={elementValue}
          rows={5}
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

export default TextArea;
