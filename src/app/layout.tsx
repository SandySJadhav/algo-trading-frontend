import "./globals.css";
import HeaderWrapper from "@components/Header";
import PageLoader from "@components/PageLoader";
import classNames from "classnames";
import { Poppins } from "next/font/google";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const poppins = Poppins({ weight: "500", subsets: ["devanagari"] });

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/x-icon"
          href="/favicon.ico"
          sizes="96x96"
        />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta charSet="utf-8" />
        <link rel="apple-touch-icon" href="/logo.jpg" sizes="any" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={classNames(
          poppins.className,
          "flex flex-col min-h-screen justify-between"
        )}
        id="app-body"
      >
        <HeaderWrapper />
        <main id="login-main">
          <PageLoader />
          {children}
        </main>
        {/* <footer
          data-testid="footer"
          className="relative p-4 text-sm border-solid border border-[#c4c4c4] border-x-0 border-b-0 md:flex md:items-center md:justify-between"
        >
          Footer
        </footer> */}
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover={false}
          theme="light"
        />
      </body>
    </html>
  );
};

export default RootLayout;
