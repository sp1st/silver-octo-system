import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import { DotGothic16 } from "next/font/google";
import { auth } from "@/auth";
import Home from "@/components/home";
import { SessionProvider } from "next-auth/react";

const font = DotGothic16({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Room Pikapika Game",
  description: "年に一度、年末の大掃除をRPGのように楽しめる大掃除×ゲーミフィケーションアプリ。",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="ja">
      <body className={font.className}>
        <SessionProvider>
          <Header />
          <main>
              {!session && <Home />}
              {session && children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
