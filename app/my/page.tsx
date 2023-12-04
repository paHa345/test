import MyPage from "../components/MyPage";
import React from "react";
import Aside from "../components/Aside";

const My = () => {
  return (
    <div className="mx-auto">
      <div className=" grid  grid-cols-mainGrid gap-3">
        <div className="col-span-2  mx-auto py-10">
          <h1 className=" text-4xl font-bold">Личный кабинет</h1>
        </div>
        {/* <div className=" col-span-2 md:col-span-1">
          <Aside></Aside>
        </div> */}
        <div className=" col-span-2  md:col-span-2">
          <MyPage></MyPage>
        </div>
      </div>
    </div>
  );
};

export default My;
