import { auth } from "@/auth";
import MapModoruLink from "@/components/mapModoru";
import Link from "next/link";

type CleaningData = {
    roomId: string;
    cleaningId: string;
    cleaningName: string;
    do: boolean;
    done: boolean
}

export default async function Room({params} : {params: Promise<{roomId : string}>}){
    const { roomId } = await params;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const cleanings = await fetch(`${baseUrl}/api/v1/room/${roomId}`);
    const cleaningsData = await cleanings.json();

    var dataList = [];

    const session = await auth();

    for (const c of cleaningsData){

        const userCleaning = await fetch(`${baseUrl}/api/v1/room/${roomId}/${c.cleaningId}/${session?.user?.id}`);
        const userCleaningData = await userCleaning.json();

        if (userCleaningData.length === 0){
            continue //userCleaningに、該当idの行がない場合
        }
        
        const cleaningAndStatus = {...c, do : userCleaningData[0].do, done:userCleaningData[0].done}

        if (cleaningAndStatus.do){
            dataList.push(cleaningAndStatus);
        } 
    }

    if (dataList.length === 0){
        return (
            <div className="p-3 text-center">
                ここには なにもないようだ...
                <div className="flex justify-center">
                    <MapModoruLink />
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center my-4">
            <h1 className="flex flex-col items-start my-4">掃除内容を選ぶ</h1>
            <div className="bg-black text-white p-4 border-double border-8 border-white rounded-md">
                {dataList.map(
                    (cleaningData: CleaningData) => (
                        <Link href={`/room/${cleaningData.roomId}/${cleaningData.cleaningId}`} key={cleaningData.cleaningId}>
                            <div className="p-2 bg-black text-white flex items-center">
                                <div>{cleaningData.cleaningName} </div>
                                {cleaningData.done 
                                ? <div className="bg-gray-100 p-1 w-[50px] h-[50px] text-black text-[10px]">完了<br/>バッジ</div> 
                                : ""}
                            </div>
                        </Link>
                    )
                )}
            </div>
            <MapModoruLink />
        </div>
    )
}