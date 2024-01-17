import React from "react";

// export async function generateStaticParams() {
//   const data = await fetch(`${process.env.HOST}/api/exercises/allExercises`);
//   const exercises = await data.json();
//   return exercises.result.map((exercise: any) => ({
//     slug: exercise._id,
//   }));
// }

const article = async ({ params: { articleId } }: { params: { articleId: string } }) => {
  const getArticle = async () => {
    const data = await fetch(`${process.env.HOST}/api/exercises/${articleId}`);
    const exercise = await data.json();
    return exercise;
  };
  const article = await getArticle();

  return <div>{article.result.description}</div>;
  return <div>{articleId}</div>;
};

export default article;
