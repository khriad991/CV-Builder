import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import {Toaster} from "react-hot-toast";
import React from "react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
      {children}
      <NextTopLoader color="#0284c7" height={4}  />
      <Toaster position={"top-center"} reverseOrder={false} />
      </body>
    </html>
  );
}
