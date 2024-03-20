"use server";

import { revalidatePath } from "next/cache";

export const editExerciseRevalidateServerAction = async (id: string | undefined) => {
  console.log("start");
  revalidatePath(`/catalog/${id}`);
  console.log("finish");
};
