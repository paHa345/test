import { faHourglass1 } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import Select from "./Select";
import AddButton from "./AddButton";
import { useDispatch } from "react-redux";
import { appStateActions } from "@/store/appStateSlice";
import { addExerciseActions } from "@/store/addExerciseSlice";

interface IInputLabelElProps {
  nameEn: string;
  nameRu: string;
  type: string;
  optionsArr: { nameRu: string; nameEn: string }[] | undefined;
}

const InputLabelEl = ({ nameEn, nameRu, type, optionsArr }: IInputLabelElProps) => {
  const dispatch = useDispatch();
  const [onFocusStatus, setInFocusStatus] = useState(false);
  const [elementValue, setElementValue] = useState("");

  const [selectedValue, setSelectedValue] = useState<string | undefined>();

  const [addadMuscleGroup, setAddedMuscleGroup] = useState<string[]>([]);

  const changeNameHandler = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch(
      addExerciseActions.changeAddedExercise({
        id: e.currentTarget.id,
        value: e.currentTarget.value,
      })
    );
    setElementValue(e.currentTarget.value);
  };

  const changeTextareaNameHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
    dispatch(
      addExerciseActions.changeAddedExercise({
        id: e.currentTarget.id,
        value: e.currentTarget.value,
      })
    );
    setElementValue(e.currentTarget.value);
  };

  const focusElHandler = (e: React.FocusEvent<HTMLElement>) => {
    setInFocusStatus(true);
  };

  const focusOutElHandler = (e: React.FocusEvent<HTMLElement>) => {
    setInFocusStatus(false);
  };

  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(e.currentTarget.firstChild?.nodeName);
  };

  const selectElHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      addExerciseActions.changeAddedExercise({
        id: e.currentTarget.id,
        value: e.currentTarget.value,
      })
    );
    setSelectedValue(e.target.value);
  };

  const addMuscleGroupHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(
      addExerciseActions.addMuscleGroup({
        id: e.currentTarget.id,
        value: elementValue,
      })
    );
    setAddedMuscleGroup((prev) => {
      return [...prev, elementValue];
    });
    setElementValue("");
  };
  const deleteMuscleGroup = (e: React.MouseEvent<HTMLButtonElement>) => {
    const index = e.currentTarget.dataset.index;
    const currentNuscleGroups = [...addadMuscleGroup];
    currentNuscleGroups.splice(Number(index), 1);

    dispatch(addExerciseActions.deleteMuscleGroup(e.currentTarget.dataset.index));

    setAddedMuscleGroup([...currentNuscleGroups]);
  };

  return (
    <div className=" relative py-4">
      {type === "text" && (
        <TextInput
          focusOutElHandler={focusOutElHandler}
          focusElHandler={focusElHandler}
          onFocusStatus={onFocusStatus}
          clickHandler={clickHandler}
          changeNameHandler={changeNameHandler}
          elementValue={elementValue}
          nameEn={nameEn}
          nameRu={nameRu}
        ></TextInput>
      )}

      {type === "textarea" && (
        <TextArea
          focusOutElHandler={focusOutElHandler}
          focusElHandler={focusElHandler}
          onFocusStatus={onFocusStatus}
          clickHandler={clickHandler}
          elementValue={elementValue}
          nameEn={nameEn}
          nameRu={nameRu}
          changeTextareaNameHandler={changeTextareaNameHandler}
        ></TextArea>
      )}

      {type === "select" && (
        <Select
          nameEn={nameEn}
          nameRu={nameRu}
          optionsArr={optionsArr}
          type={type}
          selectElHandler={selectElHandler}
        ></Select>
      )}

      {type === "addedButton" && (
        <AddButton
          focusElHandler={focusElHandler}
          focusOutElHandler={focusOutElHandler}
          changeNameHandler={changeNameHandler}
          nameEn={nameEn}
          elementValue={elementValue}
          addMuscleGroupHandler={addMuscleGroupHandler}
          addadMuscleGroup={addadMuscleGroup}
          deleteMuscleGroup={deleteMuscleGroup}
        ></AddButton>
      )}
    </div>
  );
};

export default InputLabelEl;
