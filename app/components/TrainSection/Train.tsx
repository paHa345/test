import Link from "next/link";
import React from "react";

const Train = () => {
  return (
    <article className=" transition-shadow px-5 py-5 bg-gradient-to-tr from-secoundaryColor to-slate-200 rounded-sm shadow-exerciseCardShadow hover:shadow-exerciseCardHowerShadow">
      <div className=" flex flex-col gap-6">
        <div className=" flex flex-row justify-between ">
          <div>
            <h1 className=" text-xl font-bold">Грудь, ноги</h1>
          </div>
          <div> 10.08.23</div>
        </div>
        <div className=" flex flex-col gap-4">
          <div className=" flex flex-row gap-3">
            <p>1</p>
            <Link className=" hover:underline" href="/">
              <p>Жим штанги лёжа</p>
            </Link>
            <p>4 X 10</p>
          </div>
          <div className=" flex flex-row gap-3">
            <p>2</p>
            <Link className=" hover:underline" href="/">
              <p>Жим гантелей лёжа</p>
            </Link>
            <p>3 X 14</p>
          </div>
          <div className=" flex flex-row gap-3">
            <p>3</p>
            <Link className=" hover:underline" href="/">
              <p>Отжимания от пола</p>
            </Link>
            <p> 4 X 20</p>
          </div>
          <div className=" flex flex-row gap-3">
            {" "}
            <p>4</p>
            <Link className=" hover:underline" href="/">
              <p>Приседания со штангой</p>
            </Link>
            <p>4 X 10</p>
          </div>
        </div>
        <div>
          <h1>Комментарии</h1>
          <p className=" text-sm pt-2">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur quidem ipsam
            nesciunt dolore eveniet dicta voluptas tenetur modi culpa odio saepe quis dolorum nulla
            facere qui, earum aut veritatis id!
          </p>
        </div>
      </div>
    </article>
  );
};

export default Train;
