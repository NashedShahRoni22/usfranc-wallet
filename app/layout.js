import CryptoFooter from "./components/CryptoFooter";
import CryptoNavbar from "./components/CryptoNavbar";
import "./globals.css";

export const metadata = {
  title: "Usfranc Wallet",
  description: "Usfranc Wallet by BFINIT Pvt Ltd",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CryptoNavbar/>
        {children}
        <CryptoFooter/>
      </body>
    </html>
  );
}
