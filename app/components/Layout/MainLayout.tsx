"use client";
import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import Provider from "../SessionProviderSection/SessionProvider";

const MainLayout = (props: any) => {
  return (
    <>
      <Provider>
        <Header></Header>
        <main
          className=" w-11/12
        mx-auto"
        >
          {props.children}
        </main>
        <Footer></Footer>
      </Provider>
    </>
  );
};

export default MainLayout;
