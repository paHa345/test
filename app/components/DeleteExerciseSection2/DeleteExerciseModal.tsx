import { AppDispatch } from "@/app/store";
import { appStateActions } from "@/app/store/appStateSlice";
import { IUserSlice, deleteWorkoutAndUpdateState } from "@/app/store/userSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const DeleteExerciseModal = ({ deletedWorkoutId }: any) => {
  const dispatch = useDispatch<AppDispatch>();

  const deleteExerciseHandler = async () => {
    // await dispatch(deleteWorkoutAndUpdateState(deletedWorkoutId));
    // dispatch(appStateActions.stopDeleteWorkout());
  };

  const stopDeleteExercise = () => {
    dispatch(appStateActions.stopDeleteExercise());
  };

  const deleteWorkoutStatus = useSelector(
    (state: IUserSlice) => state.userState.deleteWorkoutStatus
  );

  return (
    <div className="modal-overlay">
      <div className=" delete-modal-wrapper">
        <div className="modal">
          <div className="delete-modal-header">
            <h1>{`Удалить упражнение`}</h1>
          </div>
          <div className=" flex flex-col sm:flex-row justify-center gap-5 ">
            <button onClick={deleteExerciseHandler} className=" buttonStandart">
              Удалить упражнение{" "}
            </button>
            <button className="delete-buttonStandart" onClick={stopDeleteExercise}>
              Отмена
            </button>
          </div>
          <div className=" py-4">
            {deleteWorkoutStatus === "loading" && (
              <h1 className=" text-center px-3 rounded-md py-3 bg-cyan-200">Удаление упражнения</h1>
            )}
            {deleteWorkoutStatus === "resolve" && (
              <h1 className=" text-center rounded-md   px-3 py-3 bg-green-200">
                Упражнение успешно удалено
              </h1>
            )}
            {deleteWorkoutStatus === "error" && (
              <h1 className=" text-center rounded-md   px-3 py-3 bg-rose-500">
                Ошибка удаления. Повторите попытку позже
              </h1>
            )}
          </div>

          <div className="modal-body"></div>
        </div>
      </div>
    </div>
  );
};

export default DeleteExerciseModal;
