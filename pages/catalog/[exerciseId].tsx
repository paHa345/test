import ExerciseCardMain from "@/components/ExerciseCardSection/ExerciseCardMain";
import { Router, useRouter } from "next/router";

import React from "react";

const Exercise = () => {
  const router = useRouter();
  console.log(router.query.exerciseId);
  return (
    <div className="mx-auto">
      <div className="col-span-2  mx-auto py-10"></div>
      <ExerciseCardMain></ExerciseCardMain>
    </div>
  );
};

export default Exercise;
