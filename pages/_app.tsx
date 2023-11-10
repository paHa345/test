import "@/styles/globals.css";
import type { AppProps } from "next/app";

store;

// import Font Awesome CSS
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Head from "next/head";
import MainLayout from "@/components/Layout/MainLayout";
import { Provider } from "react-redux";
import store from "@/store";
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <Head>
          {/* <link href="https://fonts.cdnfonts.com/css/uni-sans" rel="stylesheet"></link> */}
        </Head>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </Provider>
    </>
  );
}
