import nodemailer from "nodemailer";

import User from "@/app/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const hashedPassword = await hash(body.password, 12);

    const addedUser = await User.create({
      name: body.name,
      email: body.email,
      password: hashedPassword,
    });

    // const secret =

    let transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.mail.ru",
      auth: {
        user: "pav.345@mail.ru",
        pass: "LJ1YPtKcVshZxGuE9cgB",
      },
      secure: true,
    });

    await new Promise((resolve, reject) => {
      // verify connection configuration
      transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log("Server is ready to take our messages");
          resolve(success);
        }
      });
    });

    const mailData = {
      from: "pav.345@mail.ru",
      to: "pav.345@mail.ru",
      subject: `Message From paHa store Admin`,
      text: " | Sent from: " + "pav.345@mail.ru",
      html: `<div>Для восстановления пароля перейдите по ссылке</div>
`,
    };

    await new Promise((resolve, reject) => {
      // send mail
      transporter.sendMail(mailData, (err, info) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log(info);
          resolve(info);
        }
      });
    });

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
