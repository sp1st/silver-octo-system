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

  return (
    <div className="flex flex-wrap justify-center my-4">
        {
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
