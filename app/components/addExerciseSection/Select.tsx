import React from "react";

const Select = ({ nameEn, nameRu, optionsArr, type, selectElHandler }: any) => {
  const selectEl =
    type === "select"
      ? optionsArr?.map((el: any) => {
          return (
            <option key={el.nameEn} value={el.nameEn}>
              {el.nameRu}
            </option>
          );
        })
      : "";

  return (
    <>
      <div className="px-2 flex justify-center py-5  hover:border-slate-400 focus:border-slate-400 border-solid rounded border-2  border-slate-200">
        <label className=" px-5 " htmlFor={nameEn}>
          {nameRu}
        </label>

        <select onChange={selectElHandler} name={nameEn} id={nameEn}>
          <option value={"NOT"}>Выберете значение</option>

          {selectEl}
        </select>
      </div>
    </>
  );
};

export default Select;
