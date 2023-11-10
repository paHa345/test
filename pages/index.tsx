import Image from "next/image";
import { Inter } from "next/font/google";
import Aside from "@/components/Aside";
import MainComponent from "@/components/MainComponent";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IAppSlice, appStateActions, fetchBestExercisesAndSet } from "../store/appStateSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import LoadingCards from "@/components/LoadingCardSection/LoadingCards";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // const [bestExercises, setBestExercises] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const bestExercises = useSelector((state: IAppSlice) => state.appState.exercises);
  const fetchStatus = useSelector((state: IAppSlice) => state.appState.fetchBestExercisesStatus);

  useEffect(() => {
    dispatch(fetchBestExercisesAndSet());
  }, []);

  return (
    <div className="mx-auto">
      <div className=" grid  grid-cols-mainGrid gap-3">
        <div className="col-span-2  mx-auto py-10">
          <h1 className=" text-4xl font-bold">Лучшие упражнения</h1>
        </div>
        <div className=" col-span-2 md:col-span-1">
          <Aside></Aside>
        </div>
        <div className=" col-span-2  md:col-span-1">
          {fetchStatus === "loading" && (
            <section className="pb-10">
              <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <LoadingCards></LoadingCards>
              </div>
            </section>
          )}
          {bestExercises && <MainComponent></MainComponent>}
          {fetchStatus === "error" && (
            <h1 className=" text-center text-xl font-bold my-32">
              Ошибка. Не удалось получить данные с сервера. Повторите попытку позже
            </h1>
          )}{" "}
        </div>
      </div>
    </div>
  );
}
