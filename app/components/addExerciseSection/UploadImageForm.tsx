import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExerciseActions } from "../../store/addExerciseSlice";
import IAddExerciseSlice from "../../store/addExerciseSlice";
const UploadImageForm = ({ setFile, file }: any) => {
  const image = useSelector(
    (state: IAddExerciseSlice) => state.addExerciseState.currentAddedExercise.image
  );

  const changeUoloadImage = async (e: any) => {
    setFile((prevState) => {
      return e.target.files?.[0];
    });
    console.log(file);
    dispatch(addExerciseActions.changeUploadedImage(`/${Date.now()}_${e.target.files?.[0].name}`));
  };
  return (
    <>
      <br />
      <br />
      <h1>Выберете изображение</h1>
      <br />
      <form>
        <input onChange={changeUoloadImage} type="file" name="file" />
        <br />
      </form>
    </>
  );
};

export default UploadImageForm;
