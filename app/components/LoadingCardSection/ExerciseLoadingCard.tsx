import React from "react";

const ExerciseLoadingCard = () => {
  return (
    <div className=" py-7 animate-pulse ">
      <div>
        <h1 className=" h-10 bg-slate-200 rounded mt-4 text-center text-2xl font-bold pb-6"></h1>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 ">
        <div className=" w-4/5 justify-self-center pb-5">
          <p className=" h-60 w-10/12  bg-slate-200 rounded mt-4"></p>
        </div>
        <div className=" self-center">
          <div className=" flex items-center justify-around">
            <div className=" flex gap-5 flex-col md:flex-row w-full">
              <p className=" h-6 w-1/3  bg-baseColour self-center py-1 px-2 rounded-md"></p>

              <p className=" h-6 w-1/3  bg-mainColor self-center py-1 px-2 rounded-md"></p>
            </div>

            <div className=" w-full">
              <p className=" h-6 w-full   bg-slate-200 self-center py-1 px-2 rounded-md"></p>
            </div>
          </div>

          <div className=" text-xl leading-7 py-4 w-full">
            <p className=" h-6 w-full   bg-slate-200 self-center px-2 rounded-md py-4"></p>

            <p className=" h-6 w-3/5   bg-slate-200 self-cente px-2 rounded-md my-4"></p>
            <p className=" h-6 w-3/5   bg-slate-200 self-cente px-2 rounded-md my-4"></p>

            <p className=" h-6 w-3/5   bg-slate-200 self-cente px-2 rounded-md my-4"></p>
          </div>
        </div>
        <div>
          <div className=" flex justify-center self-center w-full">
            <p className=" h-60 w-10/12  bg-slate-200 rounded mt-4"></p>
          </div>
        </div>
        <div className=" w-full ">
          <div className="flex flex-col">
            <div className=" h-6 w-1/3  bg-slate-200 my-3 self-center pt-1"></div>
            <div className=" h-6 w-full  bg-slate-200 my-3 self-end pt-1"></div>
            <div className=" h-6 w-full  bg-slate-200 my-3 self-end pt-1"></div>
          </div>
        </div>
        <div>
          <div className=" w-full ">
            <div className="flex flex-col">
              <div className=" h-6 w-1/3  bg-slate-200 my-3 self-center pt-1"></div>
              <p className=" h-60 w-10/12  bg-slate-200 self-center rounded mt-4"></p>
            </div>
          </div>
        </div>
        <div className=" w-full ">
          <div className="flex flex-col">
            <div className=" h-6 w-1/3  bg-slate-200 my-3 self-center pt-1"></div>
            <p className=" h-32 w-10/12  bg-slate-200 self-center rounded mt-4"></p>
            <p className=" h-32 w-10/12  bg-slate-200 self-center rounded mt-4"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseLoadingCard;
