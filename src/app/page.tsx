import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const rooms = await fetch("http://localhost:3000/api/v1/room")
  const roomsData = await rooms.json();

  return (
    <div className="flex flex-wrap">
        {
          roomsData.map(
            (room) => (
              <Link href={`/room/${room.roomId}`} key={room.roomId} className="m-1">
                <div className="relative">
                  <Image src={"/image.png"} alt="どうくつの画像" width={240} height={170} className="rounded"></Image>
                  <div className="absolute left-[70px] top-[100px]">{room.roomName}</div>
                </div>
              </Link>
            )
          )
        }
    </div>
  );
}
