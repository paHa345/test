import { IAppSlice } from "../../store/appStateSlice";
import { IExercise } from "../../types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import SmallExerciseCard from "../SmallExerciseCardSection/SmallExerciseCard";
import { IUserSlice } from "@/app/store/userSlice";
import DeleteExerciseModal from "../DeleteExerciseSection2/DeleteExerciseModal";

const ExercisesMainSection = () => {
  const currentExercises = useSelector(
    (state: IAppSlice) => state.appState.currentExercisesByGroup
  );

  const userId = useSelector((state: IUserSlice) => state.userState.currentUser.id);
  const deleteExerciseModal = useSelector(
    (state: IAppSlice) => state.appState.deleteExerciseStatus
  );

  const bestExercisesCard = currentExercises.map((exercise: IExercise) => {
    return (
      <div key={exercise._id}>
        <SmallExerciseCard
          isCurrentUser={userId === exercise.createdUserId ? true : false}
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
        ></SmallExerciseCard>
      </div>
    );
  });

  return (
    <section className="pb-10">
      {deleteExerciseModal && <DeleteExerciseModal></DeleteExerciseModal>}
      <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {bestExercisesCard}
      </div>
    </section>
  );
};

export default ExercisesMainSection;
