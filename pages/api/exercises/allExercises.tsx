import { MongoClient } from "mongodb";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let client;
  let db;
  try {
    client = await MongoClient.connect(
      `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/bnjpnqkq0agsple?replicaSet=rs0`
    );

    db = client.db();
  } catch (error) {
    res.status(500).json({
      message: "Не удалось подключиться к базе данных",
    });
    return;
  }

  if (req.method === "GET") {
    try {
      const result = await db.collection("exercises").find().toArray();
      res.status(200).json({
        message: "sucess",
        result: result,
      });
      return;
    } catch (error: any) {
      res.status(400).json({ message: `${error.message}` });
      return;
    }
  }
  client.close();
}
