import Image from "next/image";
import Link from "next/link";
import React from "react";
import SmallExerciseCard from "./SmallExerciseCardSection/SmallExerciseCard";
import { useSelector } from "react-redux";
import { IAppSlice } from "@/store/appStateSlice";
import { IExercise } from "@/types";

const MainComponent = () => {
  const bestExercises = useSelector((state: IAppSlice) => state.appState.exercises);

  const bestExercisesCard = bestExercises.map((exercise: IExercise) => {
    return (
      <div key={exercise._id}>
        <SmallExerciseCard
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
      <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {bestExercisesCard}
      </div>
    </section>
  );
};

export default MainComponent;
