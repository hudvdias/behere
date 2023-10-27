import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FunctionComponent, PropsWithChildren } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Be Here",
  description: "App de notificação de tempo.",
};

const RootLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
