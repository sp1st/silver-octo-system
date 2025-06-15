"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();
  return (
    <header className="bg-black text-white h-[70px] border-b">
      <div className="container mx-auto h-full flex items-center justify-between px-3">
        <Link href="/"><h1 className="text-[1.5rem] font-bold">
          <span className="text-blue-500">R</span>oom <span className="text-blue-500">P</span>ikapika <span className="text-blue-500">G</span>ame</h1></Link> 
        {!session && (
          <button
            onClick={() => signIn("google")}
            className="hover:underline"
          >
            ログイン
          </button>
        )}
        {session && (
          <button
            onClick={() => signOut()}
            className="hover:underline"
          >
            ログアウト
          </button>
        )}
      </div>
    </header>
  );
}