import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { appStateActions } from "@/app/store/appStateSlice";
import { IUserSlice } from "@/app/store/userSlice";
import { IWorkout } from "@/app/types";

const EditWorkoutModal = () => {
  const dispatch = useDispatch();
  const stopEditWorkoutHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(appStateActions.stopEditWorkouts());
  };
  const editedWorkout: IWorkout = useSelector(
    (state: IUserSlice) => state.userState.currentUser.editedWorkout
  );
  console.log(editedWorkout);
  return (
    <div className="modal-overlay">
      <div className=" modal-wrapper">
        <div className="modal">
          <div className="modal-header">
            <a
              className=" bg hover:bg-slate-400 px-2 py-1 rounded-full  hover:border-slate-400 border-solid border-2  border-slate-200"
              onClick={stopEditWorkoutHandler}
              href=""
            >
              <FontAwesomeIcon icon={faXmark} />
            </a>
          </div>
          <div className=" overflow-auto h-2/6">{editedWorkout._id}</div>

          {/* <AddExercisesSection></AddExercisesSection> */}
          <div className="modal-body"></div>
        </div>
      </div>
    </div>
  );
};

export default EditWorkoutModal;
