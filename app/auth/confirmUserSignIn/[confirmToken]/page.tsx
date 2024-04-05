import { useParams } from "next/navigation";
import React from "react";

const ConfirmUserSignIn = () => {
  const params = useParams();
  const token = params.confirmToken;
  return <div>{token}</div>;
};

export default ConfirmUserSignIn;
