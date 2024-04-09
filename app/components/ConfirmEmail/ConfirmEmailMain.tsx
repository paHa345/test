"use client";

import { AppDispatch } from "@/app/store";
import { IAuthSlice, registerNewUser } from "@/app/store/authSlice";
import jwt, { JsonWebTokenError, decode } from "jsonwebtoken";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmEmailNotifications from "./ConfirmEmailNotifications";

const ConfirmEmailMain = () => {
  console.log("Mount");
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const token: any = params.confirmToken;
  useEffect(() => {
    dispatch(registerNewUser(params.confirmToken));
  }, []);
  return (
    <>
      <div className=" my-10 h-screen">
        <h1 className=" text-lg text-center">Подтверждение регистрации</h1>
        <ConfirmEmailNotifications></ConfirmEmailNotifications>
      </div>
    </>
  );
};

export default ConfirmEmailMain;
