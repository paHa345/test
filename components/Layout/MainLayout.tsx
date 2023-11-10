import React from "react";
import Header from "../Header";
import Footer from "../Footer";

const MainLayout = (props: any) => {
  return (
    <>
      <Header></Header>
      <main
        className=" w-11/12
       mx-auto"
      >
        {props.children}
      </main>
      <Footer></Footer>
    </>
  );
};

export default MainLayout;
