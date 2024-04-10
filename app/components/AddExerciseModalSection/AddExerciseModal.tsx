import { appStateActions } from "@/app/store/appStateSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AddExercisesSection from "@/app/components/AddWorkoutSection/AddExercisesSection";
import { IAddWorkoutSlice, IAddedExercises, addWorkoutActions } from "@/app/store/addWorkoutSlice";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

const AddExerciseModal = () => {
  const dispatch = useDispatch();
  const hideAddExerciseModalHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(appStateActions.hideAddExerciseModal());
  };

  const addedExercises = useSelector(
    (state: IAddWorkoutSlice) => state.addWorkoutState.currentAddedWorkout.exercises
  );

  const changeSetsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      addWorkoutActions.changeSetsAmount({
        value: e.target.value,
        exerciseId: e.target.dataset.exerciseid,
        index: e.target.dataset.index,
      })
    );
  };
  const changeRepsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      addWorkoutActions.changeRepsAmount({
        value: e.target.value,
        exerciseId: e.target.dataset.exerciseid,
        index: e.target.dataset.index,
      })
    );
  };

  const addedExercisesElement =
    addedExercises.length === 0 ? (
      <h1>Не добавлено упражнений</h1>
    ) : (
      addedExercises?.map((addedExercise: IAddedExercises, index) => {
        return (
          <div className="flex flex-row" key={`${addedExercise.exercise}_${index}`}>
            <div className=" w-3/5">
              <Link href={`../catalog/${addedExercise.exercise}`}>{addedExercise.name}</Link>
            </div>
            <div className=" w-1/5 flex flex-col justify-center">
              <label htmlFor="">Подходов</label>
              <div className=" self-center">
                <input
                  data-index={index}
                  data-exerciseid={addedExercise.exercise}
                  className="w-4/5  hover:border-slate-400 focus:border-slate-400 border-solid rounded border-2  border-slate-200"
                  onChange={changeSetsHandler}
                  type="number"
                  value={addedExercise.sets}
                />
              </div>
            </div>
            <div className=" w-1/5">
              <label htmlFor="">Повторений</label>
              <div className=" self-center">
                <input
                  data-index={index}
                  data-exerciseid={addedExercise.exercise}
                  className="w-4/5  hover:border-slate-400 focus:border-slate-400 border-solid rounded border-2  border-slate-200"
                  onChange={changeRepsHandler}
                  type="number"
                  value={addedExercise.reps}
                />
              </div>
            </div>
          </div>
        );
      })
    );
  return (
    <div className="modal-overlay">
      <div className=" modal-wrapper">
        <div className="modal">
          <div className="modal-header">
            <a
              className=" bg hover:bg-slate-400 px-2 py-1 rounded-full  hover:border-slate-400 border-solid border-2  border-slate-200"
              onClick={hideAddExerciseModalHandler}
              href=""
            >
              <FontAwesomeIcon icon={faXmark} />
            </a>
          </div>
          <div className=" overflow-auto h-2/6">{addedExercisesElement}</div>

          <AddExercisesSection></AddExercisesSection>
          <div className="modal-body"></div>
        </div>
      </div>
    </div>
  );
};

export default AddExerciseModal;
