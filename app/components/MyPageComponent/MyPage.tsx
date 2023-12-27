"use client";

import React, { useEffect } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Train from "./../TrainSection/Train";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const MyPage = () => {
  const { data: session } = useSession();
  console.log(session);

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
        <div className=" flex flex-col gap-5 pb-7">
          <Train></Train>
          <Train></Train>
        </div>
      </section>
    </>
  );
};

export default MyPage;
