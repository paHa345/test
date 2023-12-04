import { NextRequest, NextResponse } from "next/server";
import Exercise from "@/app/models/ExerciseModel";
import { connectMongoDB } from "@/app/libs/MongoConnect";

export async function GET(req: NextRequest, { params }: { params: { mainGroup: string } }) {
  try {
    await connectMongoDB();
    const exercises = await Exercise.find({
      mainGroup: params.mainGroup,
    }).populate("commentsArr");
    return NextResponse.json({ message: "Success", result: exercises });
  } catch (error: any) {
    return NextResponse.json({ message: error?.message }, { status: 400 });
  }
}
// import { MongoClient, ObjectId } from "mongodb";
// import { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   let client;
//   let db;
//   try {
//     client = await MongoClient.connect(
//       `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/bnjpnqkq0agsple?replicaSet=rs0`
//     );

//     db = client.db();
//   } catch (error) {
//     res.status(500).json({
//       message: "Не удалось подключиться к базе данных",
//     });
//     return;
//   }

//   if (req.method === "GET") {
//     try {
//       const result = await db
//         .collection("exercises")
//         .find({ mainGroup: req.query.mainGroup })
//         .toArray();

//       res.status(200).json({
//         message: "sucess",
//         result: result,
//       });
//       return;
//     } catch (error: any) {
//       res.status(400).json({ message: `${error.message}` });
//       return;
//     }
//   }
//   client.close();
// }
