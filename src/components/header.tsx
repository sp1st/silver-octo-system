import { auth, signIn, signOut } from "@/auth";
import Link from "next/link";

export default async function Header() {
  const session = await auth();
  return (
    <header className="bg-black text-white h-[70px] border-b">
      <div className="container mx-auto h-full flex items-center justify-between px-3">
        <Link href="/"><h1 className="text-[1.5rem] font-bold">
          <span className="text-blue-500">R</span>oom <span className="text-blue-500">P</span>ikapika <span className="text-blue-500">G</span>ame</h1></Link> 
        {!session && <form
          action={async () => {
            "use server"
            await signIn("google");
          }}
        >
          <button
            type="submit"
            // className="bg-yellow-300 py-1 px-3 rounded-full font-bold 
            //  hover:bg-yellow-400 hover:shadow-md 
            //  transition-all duration-200 ease-in-out 
            //  active:scale-95"
            className="hover:underline"
          >ログイン</button>
        </form>}

        {session && <form
          action={async () => {
            "use server"
            await signOut();
          }}
        >
          <button
            // type="submit"
            // className="bg-yellow-300 py-1 px-3 rounded-full font-bold 
            //  hover:bg-yellow-400 hover:shadow-md 
            //  transition-all duration-200 ease-in-out 
            //  active:scale-95"
            className="hover:underline"
          >ログアウト</button>
        </form>}
      </div>
    </header>
  );
}