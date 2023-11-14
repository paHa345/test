import ExerciseCardMain from "@/components/ExerciseCardSection/ExerciseCardMain";
import React from "react";

import { IResponseOneExercise } from "@/types";

interface IExerciseProps {
  status: "error" | "success";
  exercise: IResponseOneExercise;
}

const Exercise = ({ status, exercise }: IExerciseProps) => {
  console.log(exercise);

  return (
    <div className="mx-auto">
      <div className="col-span-2  mx-auto py-10"></div>
      {status === "error" && (
        <h1 className=" text-center text-xl font-bold my-32">Упражнение не найдено</h1>
      )}
      {/* {status === "success" && (
        <ExerciseCardMain
          id={exercise.result?.id}
          type={exercise.result?.type}
          _id={exercise.result?._id}
          name={exercise.result?.name}
          image={exercise.result?.image}
          isBest={exercise.result?.isBest}
          raiting={exercise.result?.raiting}
          video={exercise.result?.video}
          description={exercise.result?.description}
          muscleGroups={exercise.result?.muscleGroups}
          mainGroup={exercise.result?.mainGroup}
          mainGroupRu={exercise.result?.mainGroupRu}
        ></ExerciseCardMain>
      )} */}
    </div>
  );
};

// export async function getServerSideProps(context: any) {
// const req = await fetch(`${process.env.HOST}api/${context.query.exerciseId}`);
// if (!req.ok) {
//   return {
//     props: { status: "error" },
//   };
// }
// const data: IResponseOneExercise = await req.json();

//   return {
//     props: { status: "success", exercise: "uyuy" },
//   };
// }

export default Exercise;
