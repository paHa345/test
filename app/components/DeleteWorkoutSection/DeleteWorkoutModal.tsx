import { AppDispatch } from "@/app/store";
import { appStateActions } from "@/app/store/appStateSlice";
import { IUserSlice, deleteWorkoutAndUpdateState } from "@/app/store/userSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const DeleteWorkoutModal = ({ deletedWorkoutId }: any) => {
  const dispatch = useDispatch<AppDispatch>();

  const deleteWorkoutHandler = async () => {
    await dispatch(deleteWorkoutAndUpdateState(deletedWorkoutId));
    dispatch(appStateActions.stopDeleteWorkout());
  };

  const stopDeleteWorkout = () => {
    dispatch(appStateActions.stopDeleteWorkout());
  };

  const deleteWorkoutStatus = useSelector(
    (state: IUserSlice) => state.userState.deleteWorkoutStatus
  );

  return (
    <div className="modal-overlay">
      <div className=" delete-modal-wrapper">
        <div className="modal">
          <div className="delete-modal-header">
            <h1>{`Удалить тренировку ${deletedWorkoutId}`}</h1>
          </div>
          <div className="flex justify-center gap-5">
            <button onClick={deleteWorkoutHandler} className=" buttonStandart">
              Удалить тренировку{" "}
            </button>
            <button className="delete-buttonStandart" onClick={stopDeleteWorkout}>
              Отмена
            </button>
          </div>
          <div className=" py-4">
            {deleteWorkoutStatus === "loading" && (
              <h1 className=" text-center px-3 rounded-md py-3 bg-cyan-200">Удаление тренировки</h1>
            )}
            {deleteWorkoutStatus === "resolve" && (
              <h1 className=" text-center rounded-md   px-3 py-3 bg-green-200">
                Тренировка успешно удалена
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

export default DeleteWorkoutModal;
