import CatalogMain from "../components/CatalogSection/CatalogMain";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/authOptions";

const catalog = async () => {
  const session = await getServerSession(authOptions);
  console.log(session?.user?.name);

  const posts = await fetch(`${process.env.HOST}/api/exercises/allExercises`, {
    next: {
      revalidate: 10,
    },
  });
  const blog = await posts.json();

  const blogEl = blog.result.map((el: any) => {
    return (
      <div key={el.name}>
        <p>{el.name}</p>
      </div>
    );
  });

  return (
    <div className="">
      {blogEl}
      <CatalogMain></CatalogMain>
    </div>
  );
};

export default catalog;
