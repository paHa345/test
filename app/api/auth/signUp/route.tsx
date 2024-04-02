import User from "@/app/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const hashedPassword = await hash(body.password, 12);
    console.log(hashedPassword);

    const addedUser = await User.create({
      name: body.name,
      email: body.email,
      password: hashedPassword,
    });
    console.log(addedUser);

    return NextResponse.json({ message: "Success", result: addedUser });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ message: "Такой пользователь уже существует" }, { status: 400 });
    } else {
      return NextResponse.json(
        { message: "Длинна логина/пароля должна быть более 6 символов" },
        { status: 422 }
      );
    }
  }
}
