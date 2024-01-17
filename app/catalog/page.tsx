import CatalogMain from "../components/CatalogSection/CatalogMain";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/authOptions";

const catalog = async () => {
  const session = await getServerSession(authOptions);
  console.log(session?.user?.name);

  return (
    <div className="">
      <CatalogMain></CatalogMain>
    </div>
  );
};

export default catalog;
