import { connectMongoDB } from "@/app/libs/MongoConnect";
import Exercise from "@/app/models/ExerciseModel";
import User from "@/app/models/UserModel";
import { authOptions } from "@/app/utils/authOptions";
import { MongoClient } from "mongodb";
import { getServerSession } from "next-auth";

import { NextRequest, NextResponse } from "next/server";
export const revalidate = 0;

export async function GET(req: NextRequest, { params }: { params: { searchQuery: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { message: "Только для зарегистрированных пользователей" },
      { status: 401 }
    );
  }
  if (params.searchQuery.length < 3) {
    return NextResponse.json(
      { message: "Слишком короткий поисковый запрос. Запрос должен быть более 2 символов" },
      { status: 415 }
    );
  }
  try {
    await connectMongoDB();
    const currentUser = await User.findOne({ email: session?.user?.email });
    const allExercises = await Exercise.find({
      $and: [
        { $or: [{ isBest: true }, { createdUserId: currentUser?._id }] },
        { name: { $regex: new RegExp(params.searchQuery.trim(), "i") } },
      ],
    });
    // const response = NextResponse.json({ message: "Success", result: allExercises });
    // response.headers.set("Cache-Control", "no-store");
    return NextResponse.json({ message: "Success", result: allExercises });
  } catch (error: any) {
    return NextResponse.json({ message: error?.message }, { status: 400 });
  }
}
