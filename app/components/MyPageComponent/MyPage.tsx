"use client";

import React, { useEffect } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Train from "./../TrainSection/Train";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { IUserSlice, getUserWorkouts, userActions } from "@/app/store/userSlice";
import { IWorkout } from "@/app/types";
import { AppDispatch } from "@/app/store";
import { IAppSlice, setCurrentUserWorkouts } from "@/app/store/appStateSlice";
import LoadingCards from "../LoadingCardSection/LoadingCards";
import WorkoutLoadingCards from "../LoadingCardSection/WorkoutLoadingCards";

const MyPage = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  const workouts = useSelector((state: IUserSlice) => state.userState.currentUser.workoutsArr);

  console.log(workouts);

  const loadWorkoutsStatus = useSelector(
    (state: IAppSlice) => state.appState.fetchUserWorkoutsStatus
  );

  useEffect(() => {
    dispatch(setCurrentUserWorkouts());
  }, []);

  // const getWorkoutsHandler = async () => {
  //   await dispatch(setCurrentUserWorkouts());
  //   console.log("first");
  //   console.log(workouts);
  // };

  const arr = ["10", "11", "12"];
  const workoutsEl = workouts.map((workout: IWorkout, index: number) => {
    return (
      <div key={index}>
        <div>
          <Train
            name={workout.name}
            description={workout.comments}
            date={workout.date}
            exercises={workout.exercisesArr}
          ></Train>
        </div>
      </div>
    );
  });

  // const workoutsEl = workouts.map((workout: IWorkout, index: number) => {
  //   return (
  //     <>
  //       <div key={index}>
  //         <Train
  //           name={workout.name}
  //           description={workout.comments}
  //           date={workout.date}
  //           exercises={workout.exercisesArr}
  //         ></Train>
  //       </div>
  //     </>
  //   );
  // });

  return (
    <>
      <section className=" container mx-auto">
        <div>
          <h1 className=" text-right text-4xl font-bold py-10">
            {" "}
            {`Привет, ${session?.user?.name}`}{" "}
          </h1>
        </div>
        <div>
          {" "}
          <button className=" my-5" onClick={() => signOut()}>
            Выйти
          </button>
        </div>
        <div>
          <Link className=" buttonStandart" rel="stylesheet" href="/my/addNewWorkout">
            Добавить тренировку
          </Link>
        </div>

        <div className=" py-5">
          <Link className=" buttonStandart" rel="stylesheet" href="/catalog/addNewExercise">
            Добавить упражнение
          </Link>
        </div>

        <div>
          <h1 className=" text-center text-4xl font-bold py-10"> Мои тренировки</h1>
        </div>
        {/* {loadWorkoutsStatus} */}

        {loadWorkoutsStatus === "loading" && <WorkoutLoadingCards></WorkoutLoadingCards>}
        {loadWorkoutsStatus === "error" && (
          <h1>"Не удалоcь загрузить список тренировок, повторите попытку позже"</h1>
        )}

        <div className=" flex flex-col gap-5 pb-7">
          {loadWorkoutsStatus === "resolve" && workoutsEl}
          {/* <Train></Train>
          <Train></Train> */}
        </div>
      </section>
    </>
  );
};

export default MyPage;
