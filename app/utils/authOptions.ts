import { compare } from "bcryptjs";
// import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { AuthOptions } from "next-auth";
import User from "../models/UserModel";
import { connectMongoDB } from "../libs/MongoConnect";
import jwt, { decode } from "jsonwebtoken";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/auth",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" },
      },
      async authorize(credentials, req) {
        await connectMongoDB();
        if (credentials?.email.trim().length === 0 || credentials?.password.trim().length === 0) {
          throw new Error("Введите логин/пароль");
        }
        const user = await User.findOne({ email: credentials?.email });
        if (!user) {
          throw new Error("Такого пользователя не существует");
        }
        if (credentials) {
          const validPassword = await compare(credentials?.password, user.password);
          console.log(
            await compare(
              "54.rykhtapa@rosstat.gov.ru",
              "$2a$12$cMC8nr5pLBwbPVu5UOGfi.EBuwr3CHX2lgFmFgu0BXqSzdzbtpbGa"
            )
          );
          // const pass: any = decode(
          //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjU0LnJ5a2h0YXBhQHJvc3N0YXQuZ292LnJ1IiwibmFtZSI6IjU0LnJ5a2h0YXBhQHJvc3N0YXQuZ292LnJ1IiwicGFzc3dvcmQiOiIkMmEkMTIkY01DOG5yNXBMQndiUFZ1NVVPR2ZpLkVCdXdyM0NIWDJsZ0ZtRmd1MEJYcVN6ZHpidHBiR2EiLCJpYXQiOjE3MTI3MjA3MzQsImV4cCI6MTcxMjcyNDMzNH0.nEG3CK2iYOPZa4G5h76doVFVTSRd0CHfH6dADEPGB8A"
          // );

          // console.log(pass.password);

          if (!validPassword) {
            throw new Error("Неверный пароль");
          }
        }

        if (user) {
          console.log(user);
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};
