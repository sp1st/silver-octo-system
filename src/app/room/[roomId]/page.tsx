import { auth } from "@/auth";
import CommandInRoom from "@/components/commandInRoom";
import MapModoruLink from "@/components/mapModoru";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

type CleaningData = {
    roomId: string;
    cleaningId: number;
    cleaningName: string;
    do: boolean;
    done: boolean
}

export default async function Room({params} : {params: Promise<{roomId : string}>}){
    const { roomId } = await params;
    // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    // const cleanings = await fetch(`${baseUrl}/api/v1/room/${roomId}`);
    // const cleaningsData = await cleanings.json();

    // const session = await auth();

    const session = await auth();
    const userId = session?.user?.id;

    // Prisma で一括取得＆フィルタリング
    const cleaningsData = await prisma.cleaning.findMany({
        where: { roomId },
    });

    const dataList: CleaningData[] = [];
    for (const c of cleaningsData) {
        const userCleaningData = await prisma.user_cleaning.findMany({
            where: {
                userId: userId,
                cleaningId: Number(c.cleaningId),
            },
            select: {
                do: true,
                done: true,
            }
        });

        if (userCleaningData.length === 0){
            continue //userCleaningに、該当idの行がない場合
        }
        
        // const cleaningAndStatus = {...c, do : userCleaningData[0].do, done:userCleaningData[0].done}
        // if (cleaningAndStatus.do){
        //     dataList.push(cleaningAndStatus);
        // } 
        dataList.push({
            roomId: c.roomId,
            cleaningId: c.cleaningId,
            cleaningName: c.cleaningName,
            do: userCleaningData[0].do,
            done: userCleaningData[0].done
        });
    }

    if (dataList.length === 0) {
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
                        <Link 
                            href={`/room/${cleaningData.roomId}/${cleaningData.cleaningId}`}
                            key={cleaningData.cleaningId}
                        >
                            <div className="p-2 bg-black text-white flex items-center">
                                <CommandInRoom label={cleaningData.cleaningName} done={cleaningData.done}/>
                            </div>
                        </Link>
                    )
                )}
            </div>
            <MapModoruLink />
        </div>
    )
}