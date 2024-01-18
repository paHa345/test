import { connectMongoDB } from "@/app/libs/MongoConnect";
import Exercise from "@/app/models/ExerciseModel";
import { MongoClient } from "mongodb";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();
    const allExercises = await Exercise.find();
    const response = NextResponse.json({ message: "Success", result: allExercises });
    response.headers.set("Cache-Control", "no-store");

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error?.message }, { status: 400 });
  }

  // let client;
  // let db;
  // try {
  //   client = await MongoClient.connect(
  //     `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/bnjpnqkq0agsple?replicaSet=rs0`
  //   );

  //   db = client.db();
  // } catch (error) {
  //   return NextResponse.json(
  //     {
  //       message: "Не удалось подключиться к базе данных",
  //     },
  //     { status: 500 }
  //   );
  // }

  // if (req.method === "GET") {
  //   try {
  //     const result = await db.collection("exercises").find().toArray();
  //     return NextResponse.json({
  //       message: "sucess",
  //       result: result,
  //     });
  //   } catch (error: any) {
  //     NextResponse.json({ message: `${error.message}` }, { status: 400 });
  //   }
  // }
  // client.close();
}
