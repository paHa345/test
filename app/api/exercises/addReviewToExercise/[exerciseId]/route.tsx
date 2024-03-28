import { connectMongoDB } from "@/app/libs/MongoConnect";
import Exercise from "@/app/models/ExerciseModel";
import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: { exerciseId: string } }) {
  const session = await getServerSession(authOptions);
  //   console.log(session?.user?.email);
  if (!session) {
    return NextResponse.json(
      { message: "Только для зарегистрированных пользователей" },
      { status: 401 }
    );
  }
  try {
    await connectMongoDB();
    const body = await req.json();
    const currentExercise = await Exercise.findById(params.exerciseId);
    if (!currentExercise) {
      return NextResponse.json({ message: "Упражнение не найдено" }, { status: 404 });
    }
    console.log(currentExercise);

    const updatedExercise = await Exercise.findByIdAndUpdate(params.exerciseId, {
      $push: { commentsArr: body.reviewId },
    });

    if (!updatedExercise) {
      return NextResponse.json({ message: "Не удалось обновить упражнение" }, { status: 400 });
    }

    return NextResponse.json({ message: "Success", result: updatedExercise });
  } catch (error: any) {
    return NextResponse.json({ message: error?.message }, { status: 400 });
  }
}
