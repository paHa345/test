import Image from "next/image";
import Link from "next/link";
import React, { Suspense, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faIdCard, faDumbbell, faMusic } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import HeaderSerchButton from "./SearchSection/HeaderSerchButton";
import { useDispatch } from "react-redux";
import ReduxProvider from "../ReduxProvider";

function SearchButtonFallback() {
  return (
    <>
      <h1>Placeholder</h1>
    </>
  );
}

const Header = () => {
  const session = useSession();
  return (
    <ReduxProvider>
      <header className=" bg-mainColor  py-4 pb-16 md:pb-4">
        <nav className=" relative flex flex-row items-center justify-center mx-6 gap-5">
          <Link className=" h-12 mr-12" href="/">
            <div className=" h-12 w-24">
              <Image
                className=" w-full h-full"
                src="/logo.jpg"
                alt="mainLogo"
                height={100}
                width={100}
                // layout="responsive"
              ></Image>
            </div>
          </Link>
          <Suspense fallback={<SearchButtonFallback />}>
            <HeaderSerchButton></HeaderSerchButton>
          </Suspense>
          <div></div>
          <div className="pr-0 flex justify-end md:pr-10 md:justify-end gap-10 basis-1/2">
            <div className="">
              {" "}
              <Link
                href="/catalog"
                className=" text-2xl text-headerButtonColor hover:text-headerButtonHoverColor transition duration-800 ease-out "
              ></Link>
            </div>
            {session.data && (
              <div>
                <Link
                  href="/my"
                  className=" text-2xl text-headerButtonColor hover:text-headerButtonHoverColor transition duration-800 ease-out "
                >
                  <FontAwesomeIcon icon={faIdCard} />
                  <p className=" text-xs">User</p>
                </Link>
              </div>
            )}

            {!session.data && (
              <div>
                {" "}
                <Link
                  href="/login"
                  className=" text-2xl text-headerButtonColor hover:text-headerButtonHoverColor transition duration-800 ease-out "
                >
                  <FontAwesomeIcon className="" icon={faUser} />
                  <p className=" text-xs">Login</p>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>
    </ReduxProvider>
  );
};

export default Header;
