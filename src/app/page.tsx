import Link from "next/link";
import getRoomStatus from "./data/getRoomStatus";
import { auth } from "@/auth";

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
    if (roomStatus !== "No Cleanings"){
      roomsDataAndStatus.push({...room, roomStatus: roomStatus})
    }
  }
  
  return (
    <div className="flex flex-wrap justify-center my-4">      
        {
          roomsDataAndStatus.map(
            (room: Room) => (
              <Link href={`/room/${room.roomId}`} key={room.roomId} className="m-1">
                  { room.roomStatus === "Not Completed" 
                    ? <div className="bg-[url(/kitchen_dirty.png)] hover:bg-[url(/kitchen_dirty_yusha.png)] bg-cover w-[150px] h-[150px]"></div>
                    : <div className="bg-[url(/kitchen_clean.png)] hover:bg-[url(/kitchen_clean_yusha.png)] bg-cover w-[150px] h-[150px]"></div>}
                  <div className="left-[70px] top-[100px]">{room.roomName}</div>
               </Link>
            )
          )
        }
    </div>
  );
}
