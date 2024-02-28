import React from "react";
import { useSelector } from "react-redux";
import { IAppSlice } from "../store/appStateSlice";
import CatalogMain from "../components/CatalogSection/CatalogMain";
import EditExerciseMain from "../components/EditExerciseSection/EditExerciseMain";

const page = () => {
  return <EditExerciseMain></EditExerciseMain>;
};

export default page;
