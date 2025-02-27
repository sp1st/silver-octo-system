import Link from "next/link";
import getRoomStatus from "./data/getRoomStatus";
import { auth } from "@/auth";
import HoverableImage from "@/components/hoverableImage";

interface Room {
  roomId: string;
  roomName: string;
  roomStatus : string
}

export default async function Home() {
  const session = await auth();
  const userId = session?.user?.id;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const rooms = await fetch(`${baseUrl}/api/v1/room`);
  const roomsData = await rooms.json();

  var roomsDataAndStatus = []

  for (const room of roomsData){
    const roomStatus = await getRoomStatus(room.roomId, userId);
    // washroomの画像ができたら、以下の行に戻してください。
    //if (roomStatus !== "No Cleanings"){
    if (roomStatus !== "No Cleanings" && room.roomId!="washroom"){
      roomsDataAndStatus.push({...room, roomStatus: roomStatus})
    }
  }
  
  return (
    <div className="flex flex-wrap justify-center my-4">      
        {
          roomsDataAndStatus.map(
            (room: Room) => (
              <Link href={`/room/${room.roomId}`} key={room.roomId} className="m-1">
                  { room.roomStatus === "Completed"
                    ? <HoverableImage roomName = {room.roomName} nothovered={`/${room.roomId}_clean.png`} hovered={`/${room.roomId}_clean_yusha.png`}/>
                    : <HoverableImage roomName = {room.roomName} nothovered={`/${room.roomId}_dirty.png`} hovered={`/${room.roomId}_dirty_yusha.png`}/>
                  }
                  <div className="left-[70px] top-[100px]">{room.roomName}</div>
               </Link>
            )
          )
        }
    </div>
  );
}
