"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

const SerchResult = () => {
  const serchParams = useSearchParams();
  console.log(serchParams.get("serchQuery"));
  return <div>serchParams</div>;
};

export default SerchResult;
