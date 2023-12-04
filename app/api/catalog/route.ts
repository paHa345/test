import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

// Handles GET requests to /api
export async function GET(request: Request) {
  return new Response("Hello, Next.js!", {
    status: 404,
  });
}
