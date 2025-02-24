import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";

interface Room {
  roomId: string;
  roomName: string;
}

export default async function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const rooms = await fetch(`${baseUrl}/api/v1/room`);
  const roomsData = await rooms.json();
  const session = await auth();

  return (
    <div className="flex flex-wrap justify-center my-4">
        {
          !session && 
          <div>
            <div className="text-4xl font-extrabold text-center my-11">
              Room Pikapika Game
            </div>
            <div>～クエストをクリアして、年始までに大掃除を終わらせよう！～</div>
            <div className="flex justify-center my-6">
                <Image src="/yusha.gif" alt="勇者のGIF" width={200} height={300} unoptimized />
            </div>
          </div>
          
        }
        {
          session &&
          roomsData.map(
            (room: Room) => (
              <Link href={`/room/${room.roomId}`} key={room.roomId} className="m-1">
                <div className="relative text-black">
                  <Image src={"/doukutu.png"} alt="どうくつの画像" width={240} height={170} className="rounded"></Image>
                  <div className="absolute left-[70px] top-[100px]">{room.roomName}</div>
                </div>
              </Link>
            )
          )
        }
    </div>
  );
}
