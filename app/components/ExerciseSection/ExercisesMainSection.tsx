import { IAppSlice } from "../../store/appStateSlice";
import { IExercise } from "../../types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import SmallExerciseCard from "../SmallExerciseCardSection/SmallExerciseCard";

const ExercisesMainSection = () => {
  const currentExercises = useSelector(
    (state: IAppSlice) => state.appState.currentExercisesByGroup
  );

  const bestExercisesCard = currentExercises.map((exercise: IExercise) => {
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

        {/* <article className="  transition-shadow px-5 py-5 bg-gradient-to-tr from-secoundaryColor to-slate-200 rounded-lg shadow-exerciseCardShadow hover:shadow-exerciseCardHowerShadow">
          <div className=" flex flex-col">
            <Link href="/">
              <div className=" flex flex-row gap-2 mb-3">
                <h1 className=" grow text-2xl text font-bold pl-7 pt-7">
                  Жим штанги лежа узким хватом
                </h1>
                <p className="  bg-baseColour self-center py-1 px-2 rounded-md">Базовое</p>
              </div>
              <div className=" flex flex-row justify-center">
                <div className=" basis-3/4">
                  <Image
                    className=" w-full"
                    src="/bp02.jpeg"
                    alt="exercise-image"
                    width={60}
                    height={60}
                  ></Image>
                </div>
              </div>
            </Link>

            <div className=" flex flex-col">
              <div className=" self-end pt-7">
                Рейтинг: <span className=" text-lg font-bold">4.5</span>
              </div>
              <div className=" text-xl leading-7">
                <ul className=" text-center font-bold pt-7 pb-4"> Мышечные группы</ul>
                <li className=" list-none pl-9">трехглавая мышца плеча</li>
                <li className=" list-none pl-9">большие грудные мышщы</li>
                <li className=" list-none pl-9">передние пучки дельтовидных мышц</li>
              </div>
            </div>
          </div>
        </article>
        <article className="  transition-shadow px-5 py-5 bg-gradient-to-tr from-secoundaryColor to-slate-200 rounded-lg shadow-exerciseCardShadow hover:shadow-exerciseCardHowerShadow">
          <div className=" flex flex-col">
            <Link href="/">
              <div className=" flex flex-row gap-2 mb-3">
                <h1 className=" grow text-2xl text font-bold pl-7 pt-7">
                  Жим штанги лежа узким хватом
                </h1>
                <p className="  bg-baseColour self-center py-1 px-2 rounded-md">Базовое</p>
              </div>
              <div className=" flex flex-row justify-center">
                <div className=" basis-3/4">
                  <Image
                    className=" w-full"
                    src="/bp02.jpeg"
                    alt="exercise-image"
                    width={60}
                    height={60}
                  ></Image>
                </div>
              </div>
            </Link>

            <div className=" flex flex-col">
              <div className=" self-end pt-7">
                Рейтинг: <span className=" text-lg font-bold">4.5</span>
              </div>
              <div className=" text-xl leading-7">
                <ul className=" text-center font-bold pt-7 pb-4"> Мышечные группы</ul>
                <li className=" list-none pl-9">трехглавая мышца плеча</li>
                <li className=" list-none pl-9">большие грудные мышщы</li>
                <li className=" list-none pl-9">передние пучки дельтовидных мышц</li>
              </div>
            </div>
          </div>
        </article>
        <article className="  transition-shadow px-5 py-5 bg-gradient-to-tr from-secoundaryColor to-slate-200 rounded-lg shadow-exerciseCardShadow hover:shadow-exerciseCardHowerShadow">
          <div className=" flex flex-col">
            <Link href="/">
              <div className=" flex flex-row gap-2 mb-3">
                <h1 className=" grow text-2xl text font-bold pl-7 pt-7">
                  Жим штанги лежа узким хватом
                </h1>
                <p className="  bg-baseColour self-center py-1 px-2 rounded-md">Базовое</p>
              </div>
              <div className=" flex flex-row justify-center">
                <div className=" basis-3/4">
                  <Image
                    className=" w-full"
                    src="/bp02.jpeg"
                    alt="exercise-image"
                    width={60}
                    height={60}
                  ></Image>
                </div>
              </div>
            </Link>

            <div className=" flex flex-col">
              <div className=" self-end pt-7">
                Рейтинг: <span className=" text-lg font-bold">4.5</span>
              </div>
              <div className=" text-xl leading-7">
                <ul className=" text-center font-bold pt-7 pb-4"> Мышечные группы</ul>
                <li className=" list-none pl-9">трехглавая мышца плеча</li>
                <li className=" list-none pl-9">большие грудные мышщы</li>
                <li className=" list-none pl-9">передние пучки дельтовидных мышц</li>
              </div>
            </div>
          </div>
        </article>
        <article className="  transition-shadow px-5 py-5 bg-gradient-to-tr from-secoundaryColor to-slate-200 rounded-lg shadow-exerciseCardShadow hover:shadow-exerciseCardHowerShadow">
          <div className=" flex flex-col">
            <Link href="/">
              <div className=" flex flex-row gap-2 mb-3">
                <h1 className=" grow text-2xl text font-bold pl-7 pt-7">
                  Жим штанги лежа узким хватом
                </h1>
                <p className="  bg-baseColour self-center py-1 px-2 rounded-md">Базовое</p>
              </div>
              <div className=" flex flex-row justify-center">
                <div className=" basis-3/4">
                  <Image
                    className=" w-full"
                    src="/bp02.jpeg"
                    alt="exercise-image"
                    width={60}
                    height={60}
                  ></Image>
                </div>
              </div>
            </Link>

            <div className=" flex flex-col">
              <div className=" self-end pt-7">
                Рейтинг: <span className=" text-lg font-bold">4.5</span>
              </div>
              <div className=" text-xl leading-7">
                <ul className=" text-center font-bold pt-7 pb-4"> Мышечные группы</ul>
                <li className=" list-none pl-9">трехглавая мышца плеча</li>
                <li className=" list-none pl-9">большие грудные мышщы</li>
                <li className=" list-none pl-9">передние пучки дельтовидных мышц</li>
              </div>
            </div>
          </div>
        </article>
        <article className="  transition-shadow px-5 py-5 bg-gradient-to-tr from-secoundaryColor to-slate-200 rounded-lg shadow-exerciseCardShadow hover:shadow-exerciseCardHowerShadow">
          <div className=" flex flex-col">
            <Link href="/">
              <div className=" flex flex-row gap-2 mb-3">
                <h1 className=" grow text-2xl text font-bold pl-7 pt-7">
                  Жим штанги лежа узким хватом
                </h1>
                <p className="  bg-baseColour self-center py-1 px-2 rounded-md">Базовое</p>
              </div>
              <div className=" flex flex-row justify-center">
                <div className=" basis-3/4">
                  <Image
                    className=" w-full"
                    src="/bp02.jpeg"
                    alt="exercise-image"
                    width={60}
                    height={60}
                  ></Image>
                </div>
              </div>
            </Link>

            <div className=" flex flex-col">
              <div className=" self-end pt-7">
                Рейтинг: <span className=" text-lg font-bold">4.5</span>
              </div>
              <div className=" text-xl leading-7">
                <ul className=" text-center font-bold pt-7 pb-4"> Мышечные группы</ul>
                <li className=" list-none pl-9">трехглавая мышца плеча</li>
                <li className=" list-none pl-9">большие грудные мышщы</li>
                <li className=" list-none pl-9">передние пучки дельтовидных мышц</li>
              </div>
            </div>
          </div>
        </article>
        <article className="  transition-shadow px-5 py-5 bg-gradient-to-tr from-secoundaryColor to-slate-200 rounded-lg shadow-exerciseCardShadow hover:shadow-exerciseCardHowerShadow">
          <div className=" flex flex-col">
            <Link href="/">
              <div className=" flex flex-row gap-2 mb-3">
                <h1 className=" grow text-2xl text font-bold pl-7 pt-7">
                  Жим штанги лежа узким хватом
                </h1>
                <p className="  bg-baseColour self-center py-1 px-2 rounded-md">Базовое</p>
              </div>
              <div className=" flex flex-row justify-center">
                <div className=" basis-3/4">
                  <Image
                    className=" w-full"
                    src="/bp02.jpeg"
                    alt="exercise-image"
                    width={60}
                    height={60}
                  ></Image>
                </div>
              </div>
            </Link>

            <div className=" flex flex-col">
              <div className=" self-end pt-7">
                Рейтинг: <span className=" text-lg font-bold">4.5</span>
              </div>
              <div className=" text-xl leading-7">
                <ul className=" text-center font-bold pt-7 pb-4"> Мышечные группы</ul>
                <li className=" list-none pl-9">трехглавая мышца плеча</li>
                <li className=" list-none pl-9">большие грудные мышщы</li>
                <li className=" list-none pl-9">передние пучки дельтовидных мышц</li>
              </div>
            </div>
          </div>
        </article> */}
      </div>
    </section>
  );
};

export default ExercisesMainSection;
