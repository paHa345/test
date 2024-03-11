import ExerciseCardMain from "../../components/ExerciseCardSection/ExerciseCardMain";
import React, { Suspense, cache } from "react";

import { IResponseOneExercise } from "../../types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";

// async function Playlists({ artistID }: { artistID: string }) {
//     // Wait for the playlists
//     const playlists = await getArtistPlaylists(artistID)

//     return (
//       <ul>
//         {playlists.map((playlist) => (
//           <li key={playlist.id}>{playlist.name}</li>
//         ))}
//       </ul>
//     )
//   }

export async function generateStaticParams() {
  const data = await fetch(`${process.env.HOST}/api/exercises/allExercises`);
  const exercises = await data.json();
  return exercises.result.map((exercise: any) => ({
    slug: exercise._id,
  }));
}

export default async function Page({ params: { exerciseId } }: { params: { exerciseId: string } }) {
  const data = await fetch(`${process.env.HOST}/api/exercises/${exerciseId}`,{cache:'reload', next: { tags: ['collection'] } }
  );
  const exercise = await data.json();

  return (
    <>
      <div className="mx-auto">
        <Suspense fallback={<div>Loading...</div>}>
          {exercise.status === "Error" && (
            <h1 className=" text-center text-xl font-bold my-32">Упражнение не найдено</h1>
          )}
          {exercise.status === "Success" && (
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
          )}
        </Suspense>
      </div>
    </>
  );
}

// interface IExerciseProps {
//   status: "error" | "success";
//   exercise: IResponseOneExercise;
// }

// const Exercise = ({ status, exercise }: IExerciseProps) => {
//   console.log(exercise);
//   return (
//     <div className="mx-auto">
//       <div className="col-span-2  mx-auto py-10"></div>
//       {status === "error" && (
//         <h1 className=" text-center text-xl font-bold my-32">Упражнение не найдено</h1>
//       )}
//       {status === "success" && (
//         <ExerciseCardMain
//           id={exercise.result?.id}
//           type={exercise.result?.type}
//           _id={exercise.result?._id}
//           name={exercise.result?.name}
//           image={exercise.result?.image}
//           isBest={exercise.result?.isBest}
//           raiting={exercise.result?.raiting}
//           video={exercise.result?.video}
//           description={exercise.result?.description}
//           muscleGroups={exercise.result?.muscleGroups}
//           mainGroup={exercise.result?.mainGroup}
//           mainGroupRu={exercise.result?.mainGroupRu}
//         ></ExerciseCardMain>
//       )}
//     </div>
//   );
// };

// export async function getStaticPaths() {
//   const res = await fetch(`${process.env.HOST}api/exercises/allExercises`);
//   const exercises = await res.json();

//   const paths = exercises.result.map((exercise: any) => ({
//     params: { exerciseId: exercise._id },
//   }));

//   return { paths, fallback: false };
// }

// export async function getStaticProps({ params }: any) {
//   const req = await fetch(`${process.env.HOST}api/exercises/${params.exerciseId}`);
//   if (!req.ok) {
//     return {
//       props: { status: "error" },
//     };
//   }
//   const data: IResponseOneExercise = await req.json();
//   console.log(data);

//   return {
//     props: { status: "success", exercise: data },
//   };
// }

// export async function getServerSideProps(context: any) {
//   const req = await fetch(`${process.env.HOST}api/exercises/${context.query.exerciseId}`);
//   if (!req.ok) {
//     return {
//       props: { status: "error" },
//     };
//   }
//   const data: IResponseOneExercise = await req.json();
//   console.log(data);

//   return {
//     props: { status: "success", exercise: data },
//   };
// }

// export default Exercise;
