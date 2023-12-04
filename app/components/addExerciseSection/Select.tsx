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
      <label className=" px-5" htmlFor={nameEn}>
        {nameRu}
      </label>

      <select onChange={selectElHandler} name={nameEn} id={nameEn}>
        <option value={"NOT"}>Выберете значение</option>

        {selectEl}
      </select>
    </>
  );
};

export default Select;
