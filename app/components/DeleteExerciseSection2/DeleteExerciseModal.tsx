import { AppDispatch } from "@/app/store";
import { appStateActions } from "@/app/store/appStateSlice";
import {
  IUserSlice,
  deleteExerciseAndUpdateState,
  deleteWorkoutAndUpdateState,
} from "@/app/store/userSlice";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const DeleteExerciseModal = ({ deletedExerciseId }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const deleteExerciseHandler = async () => {
    console.log(deletedExerciseId);
    await dispatch(deleteExerciseAndUpdateState(deletedExerciseId));
    dispatch(appStateActions.stopDeleteExercise());
    // router.reload();
  };

  const stopDeleteExercise = () => {
    dispatch(appStateActions.stopDeleteExercise());
  };

  const deleteExerciseStatus = useSelector(
    (state: IUserSlice) => state.userState.deleteExerciseStatus
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
            {deleteExerciseStatus === "loading" && (
              <h1 className=" text-center px-3 rounded-md py-3 bg-cyan-200">Удаление упражнения</h1>
            )}
            {deleteExerciseStatus === "resolve" && (
              <h1 className=" text-center rounded-md   px-3 py-3 bg-green-200">
                Упражнение успешно удалено
              </h1>
            )}
            {deleteExerciseStatus === "error" && (
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
