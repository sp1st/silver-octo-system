import Link from "next/link";

export default async function Room({params} : {params:{roomId : string}}){

    const cleanings = await fetch(`http://localhost:3000/api/v1/room/${params.roomId}`);
    const cleaningsData = await cleanings.json();

    return (
        <div>
            <h1>ここに部屋名を入れたい</h1>
            {cleaningsData.map(
                (cleaningData) => (
                    <Link href={`/room/${cleaningData.roomId}/${cleaningData.cleaningId}`} key={cleaningData.cleaningId}>
                        <div className="p-2 bg-black text-white">{cleaningData.cleaningName}</div>
                    </Link>
                )
            )}
        </div>
    )
}