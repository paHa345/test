"use client";

import { AppDispatch } from "@/app/store";
import { IAuthSlice, loginUser, registerNewUser } from "@/app/store/authSlice";
import jwt, { JsonWebTokenError, decode } from "jsonwebtoken";
import { redirect, useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmEmailNotifications from "./ConfirmEmailNotifications";
import { setCurrentUserWorkouts } from "@/app/store/appStateSlice";

const ConfirmEmailMain = () => {
  const loginUserStatus = useSelector((state: IAuthSlice) => state.authState.loginUserstatus);
  const params: any = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const token: any = decode(params.confirmToken);
  useEffect(() => {
    dispatch(registerNewUser(params.confirmToken));
    dispatch(loginUser({ login: token.email, password: token.password }));

    dispatch(setCurrentUserWorkouts());
  }, []);

  useEffect(() => {
    if (loginUserStatus === "resolve") {
      redirect("/my");
    }
  }, [loginUserStatus]);
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
