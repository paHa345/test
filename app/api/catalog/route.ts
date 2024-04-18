import { connectMongoDB } from "@/app/libs/MongoConnect";
import Comment from "@/app/models/CommentModel";
import Workout from "@/app/models/WorkoutModel";
import mongoose from "mongoose";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

// Handles GET requests to /api
export async function GET(request: Request) {
  await connectMongoDB();
  const exerciseAvgUserRaiting = await Comment.aggregate([
    { $match: { exerciseId: "6618edf4b6415631e4b207f7" } },
    { $group: { _id: null, avgRaiting: { $avg: "$score" } } },
  ]);
  console.log(exerciseAvgUserRaiting);

  return new Response("Hello, Next.js!", {
    status: 200,
  });
}
