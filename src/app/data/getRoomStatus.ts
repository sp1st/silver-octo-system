import { prisma } from "@/lib/prisma";

export default async function getRoomStatus(roomId: string, userId: string){
    // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    // const res = await fetch(`${baseUrl}/api/v1/room/${roomId}`);
    // const data = await res.json();

    const data = await prisma.cleaning.findMany({
        where: {
            roomId: roomId
        },
        select: {
            cleaningId: true
        }
    });

    if (data.length === 0){
        return "No Cleanings"
    }

    let doCount = 0;
    let doneCount = 0;

    for (const d of data){
        // const res = await fetch(`${baseUrl}/api/v1/room/${roomId}/${d.cleaningId}/${userId}`);
        // const data = await res.json();
        const data = await prisma.user_cleaning.findMany({
            where: {
                cleaningId: d.cleaningId,
                userId: userId
            },
            select: {
                do: true,
                done: true
            }
        });

        if (data.length === 0){
            continue;
        }

        if (data[0].do){doCount += 1};
        if (data[0].done){doneCount += 1};
    }

    if (doCount === 0){
        return "No Cleanings"
    } 

    if (doCount === doneCount){
        return "Completed"
    }
    
    return "Not Completed"
}