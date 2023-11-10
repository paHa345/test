import Image from "next/image";
import React from "react";

import { useState } from "react";
import Review from "./Review";
import ReviewForm from "./ReviewForm";

const ExerciseCardMain = () => {
  return (
    <div>
      <div>
        <h1 className=" text-center text-2xl font-bold pb-6">Жим лёжа на горизонтальной скамье</h1>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 ">
        <div className=" w-4/5 justify-self-center pb-5">
          <Image
            className=" w-full"
            src="/bp02.jpeg"
            alt="benchPress"
            width={200}
            height={200}
          ></Image>
        </div>
        <div className=" self-center">
          <div className=" flex items-center justify-around">
            <p className="  bg-baseColour py-1 px-2 rounded-md">Базовое</p>

            <div className="">
              Рейтинг: <span className=" text-lg font-bold">4.5</span>
            </div>
          </div>

          <div className=" text-xl leading-7">
            <ul className=" text-center font-bold pt-7 pb-4"> Мышечные группы</ul>
            <li className=" list-none pl-9">большие грудные мышщы</li>
            <li className=" list-none pl-9">трехглавая мышца плеча</li>
            <li className=" list-none pl-9">передние пучки дельтовидных мышц</li>
          </div>
        </div>
        <div>
          <div className=" flex w-full justify-center self-center">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/vthMCtgVtFw?si=e8IX2qeM4URTVArB"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div>
          <div>
            <h2 className=" text-center font-bold text-xl my-6">Описание</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur, perspiciatis illo.
              Cumque, exercitationem totam? Pariatur inventore magni nobis quas nesciunt veniam
              autem, voluptas obcaecati. Esse id cupiditate minus corporis eum.
            </p>
          </div>
        </div>
        <div>
          <div></div>
          <ReviewForm></ReviewForm>
        </div>
        <div className=" ">
          <h1 className=" text-center font-bold text-xl pb-3">Оценки</h1>
          <Review></Review>
          <Review></Review>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCardMain;
