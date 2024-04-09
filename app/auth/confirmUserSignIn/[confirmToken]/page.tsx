import ConfirmEmailMain from "@/app/components/ConfirmEmail/ConfirmEmailMain";
import { AppDispatch } from "@/app/store";
import { IAuthSlice, registerNewUser } from "@/app/store/authSlice";
import jwt, { JsonWebTokenError, decode } from "jsonwebtoken";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ConfirmUserSignIn = () => {
  return (
    <>
      <ConfirmEmailMain></ConfirmEmailMain>
    </>
  );
};

export default ConfirmUserSignIn;
