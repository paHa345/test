import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonRunning, faRankingStar, faWeightHanging } from "@fortawesome/free-solid-svg-icons";

const Aside = () => {
  return (
    <div className=" mx-auto  py-5 flex justify-center flex-raw md:flex-col gap-10 text-center bg-secoundaryColor w-4/6 rounded-md shadow-exerciseCardHowerShadow">
      <div className=" flex flex-col">
        <FontAwesomeIcon icon={faPersonRunning} />
        <p>20/40</p>
      </div>
      <div className=" flex flex-col">
        <FontAwesomeIcon icon={faRankingStar} />

        <p>1/4</p>
      </div>

      <div className=" flex flex-col">
        <FontAwesomeIcon icon={faWeightHanging} />

        <p>12/9</p>
      </div>
    </div>
  );
};

export default Aside;
