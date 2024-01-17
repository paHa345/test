import CatalogMain from "../components/CatalogSection/CatalogMain";
import React from "react";
import dynamic from "next/dynamic";

const DynamicCatalogMain = dynamic(() => import("../components/CatalogSection/CatalogMain"));

const catalog = () => {
  return (
    <div className="">
      <DynamicCatalogMain></DynamicCatalogMain>
    </div>
  );
};

export default catalog;
