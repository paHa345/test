import Link from "next/link";
import React from "react";
import Articles from "../components/Articles";

export const revalidate = 10;

const articles = async () => {
  // const getallArticles = async () => {
  //   try {
  //     const response = await fetch(`${process.env.HOST}/api/exercises/allExercises`);
  //     const articles = await response.json();
  //     if (!response.ok) {
  //       throw new Error("Error");
  //     }
  //     console.log(articles);
  //     return articles;
  //   } catch (error: any) {
  //     return error.message;
  //   }
  // };

  // const articles = await getallArticles();

  // const articlesEl = articles.result.map((article: any) => {
  //   return (
  //     <div key={article._id}>
  //       <Link href={`./articles/${article._id}`}>{article._id}</Link>
  //     </div>
  //   );
  // });

  return (
    <>
      <div>articlesss</div>
      <Articles></Articles>

      <Link href={`./api/exercises/allExercises`}>Link</Link>
    </>
  );
};

export default articles;
