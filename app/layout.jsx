import "./globals.css";

export const metadata = {
  title: "Usfranc Wallet",
  description: "Usfranc Wallet by BFINIT Pvt Ltd",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
