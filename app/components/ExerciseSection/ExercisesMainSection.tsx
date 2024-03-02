import { IAppSlice, appStateActions } from "../../store/appStateSlice";
import { IExercise } from "../../types";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SmallExerciseCard from "../SmallExerciseCardSection/SmallExerciseCard";
import { IUserSlice } from "@/app/store/userSlice";
import DeleteExerciseModal from "../DeleteExerciseSection2/DeleteExerciseModal";
import { useSession } from "next-auth/react";

const ExercisesMainSection = () => {
  const session = useSession()
  const currentExercises = useSelector(
    (state: IAppSlice) => state.appState.currentExercisesByGroup
  );

  const [deletedExerciseId, setDeletedExerciseId] = useState("");

  const deleteExerciseHandler = async (e: any) => {
    e.preventDefault();
    console.log(e.currentTarget.dataset.workoutid);
    // setDeletedExerciseId(String(e.currentTarget.dataset.workoutid));

    // dispatch(appStateActions.startDeleteExercise());
  };

  const userId = useSelector((state: IUserSlice) => state.userState.currentUser.id);
  const deleteExerciseModal = useSelector(
    (state: IAppSlice) => state.appState.deleteExerciseStatus
  );

  const bestExercisesCard = currentExercises.map((exercise: IExercise) => {
    return (
      <div key={exercise._id}>
        <SmallExerciseCard
          isCurrentUser={(userId === exercise.createdUserId && session.data ) ? true : false}
          name={exercise.name}
          _id={exercise._id}
          id={exercise.id}
          image={exercise.image}
          isBest={exercise.isBest}
          type={exercise.type}
          raiting={exercise.raiting}
          video={exercise.video}
          description={exercise.description}
          muscleGroups={exercise.muscleGroups}
          mainGroupRu={exercise.mainGroupRu}
          mainGroup={exercise.mainGroup}
          deleteExerciseHandler={deleteExerciseHandler}
          setDeletedExerciseId={setDeletedExerciseId}
        ></SmallExerciseCard>
      </div>
    );
  });

  return (
    <section className="pb-10">
      {deleteExerciseModal && (
        <DeleteExerciseModal deletedExerciseId={deletedExerciseId}></DeleteExerciseModal>
      )}
      <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {bestExercisesCard}
      </div>
    </section>
  );
};

export default ExercisesMainSection;
