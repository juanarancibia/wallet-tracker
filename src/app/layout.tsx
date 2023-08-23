"use client";

import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { RecoilRoot } from "recoil";
import "./globals.css";

//TODO Fix ssr with recoil

// export const metadata: Metadata = {
//   title: "Wallet Tracker",
//   description: "Track all your wallets!",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="mb-8">
        <RecoilRoot>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            {children}
          </ThemeProvider>
        </RecoilRoot>
      </body>
    </html>
  );
}
