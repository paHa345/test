import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Review = () => {
  return (
    <div className=" flex flex-col py-3 px-3  mb-6 shadow-cardElementShadow">
      <div className=" flex flex-raw justify-between">
        <p>paHa345</p>
        <p>25.09.2023</p>
      </div>
      <div className=" mx-auto">
        {" "}
        <p>
          {" "}
          <span>
            {" "}
            <FontAwesomeIcon className=" text-headerButtonHoverColor" icon={faStar} />
          </span>
          - 5
        </p>
      </div>
      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam culpa fugit similique
          autem explicabo dolorum itaque doloremque voluptatibus corporis iure perspiciatis, saepe,
          vel velit incidunt magni labore commodi laudantium eaque.
        </p>
      </div>
    </div>
  );
};

export default Review;
