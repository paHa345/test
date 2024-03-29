import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "@/app/libs/MongoConnect";
import Workout from "@/app/models/WorkoutModel";
import User from "@/app/models/UserModel";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/utils/authOptions";
import { IExercise, IUser, IWorkout } from "@/app/types";
import Exercise from "@/app/models/ExerciseModel";

export async function PATCH(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);
  console.log(session?.user?.email);
  if (!session) {
    return NextResponse.json(
      { message: "Только для зарегистрированных пользователей" },
      { status: 401 }
    );
  }

  try {
    await connectMongoDB();
    const body = await req.json();
    console.log(body);
    const currentUser: IUser | null = await User.findOne({ email: session.user?.email });
    const currentExercise: IExercise | null = await Exercise.findById(body.exerciseId);

    // console.log(currentExercise);

    if (!currentExercise) {
      throw new Error("Не найдено упражнения");
    }

    if (String(currentExercise?.createdUserId) !== String(currentUser?._id)) {
      return NextResponse.json(
        { message: "У вас нет прав для редактирования этого упражнения" },
        { status: 403 }
      );
    }

    const updatedExercise: IExercise | null = await Exercise.findOneAndUpdate(
      { _id: body.exerciseId },
      { $pull: { commentsArr: { $in: [body.reviewId] } } }
    );

    console.log(updatedExercise);

    // if (!updatedExercise) {
    //     throw new Error("Не найдено упражнения");
    //   }

    return NextResponse.json({ message: "Success", result: updatedExercise });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
