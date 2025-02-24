import Link from "next/link";

type CleaningData = {
    roomId: string;
    cleaningId: string;
    cleaningName: string;
}

export default async function Room({params} : {params: Promise<{roomId : string}>}){
    const { roomId } = await params;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const cleanings = await fetch(`${baseUrl}/api/v1/room/${roomId}`);
    const cleaningsData = await cleanings.json();

    return (
        <div className="flex flex-col items-center my-4">
            <h1 className="flex flex-col items-start my-4">掃除内容を選ぶ</h1>
            <div className="bg-black text-white p-4 border-double border-8 border-white rounded-md">
                {cleaningsData.map(
                    (cleaningData :CleaningData) => (
                        <Link href={`/room/${cleaningData.roomId}/${cleaningData.cleaningId}`} key={cleaningData.cleaningId}>
                            <div className="p-2 bg-black text-white">{cleaningData.cleaningName}</div>
                        </Link>
                    )
                )}
            </div>
        </div>
    )
}