"use client";
import React, { useState } from "react";
import Login from "./Login";
import Registration from "./Registration";
import ForgetPassword from "./ForgetPassword";

const LoginComponent = () => {
  return (
    <>
      <div className="  mx-auto py-8">
        <Login></Login>
        <Registration></Registration>
        <ForgetPassword></ForgetPassword>
      </div>
    </>
  );
};

export default LoginComponent;
