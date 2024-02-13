import { connectMongoDB } from "@/app/libs/MongoConnect";
import Workout from "@/app/models/WorkoutModel";
import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
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
    const workout = await req.json();

    const addedWorkout = await Workout.create(workout);

    return NextResponse.json({ message: "sucess", result: addedWorkout });
  } catch (error: any) {
    return NextResponse.json({ message: error?.message }, { status: 400 });
  }
}
