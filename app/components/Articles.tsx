import Link from "next/link";
import React, { useEffect } from "react";

const Articles = async () => {
  const getAllArticles = async () => {
    const response = await fetch(`${process.env.HOST}/api/exercises/allExercises`);
    const exercises = await response.json();
    return exercises.result;
  };
  const articles = await getAllArticles();

  const articlesEl = articles.map((article: any) => {
    return (
      <div key={article._id}>
        <Link href={`./articles/${article._id}`}>{article._id}</Link>
      </div>
    );
  });

  return <div>{articlesEl}</div>;
};

export default Articles;
