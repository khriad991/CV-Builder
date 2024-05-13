import "./globals.css";
import NextTopLoader from "nextjs-toploader";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
      {children}
      <NextTopLoader color="#0284c7" showSpinner={true}  height={3}  />
      </body>
    </html>
  );
}
