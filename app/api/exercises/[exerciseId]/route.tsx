import { NextRequest, NextResponse } from "next/server";
import Exercise from "@/app/models/ExerciseModel";
import { connectMongoDB } from "@/app/libs/MongoConnect";

export async function GET(req: NextRequest, { params }: { params: { exerciseId: string } }) {
  try {
    await connectMongoDB();
    const exercise = await Exercise.findById(params.exerciseId).populate("commentsArr");
    return NextResponse.json({ status: "Success", result: exercise });
    // return NextResponse.json({ message: "Olol" });
  } catch (error: any) {
    return NextResponse.json({ message: error?.message, status: "Error" }, { status: 400 });
  }
}
