"use server";

import { revalidatePath } from "next/cache";

export const editExerciseRevalidateServerAction = async (id: string | undefined) => {
  revalidatePath(`/catalog/${id}`);
};
