import { prisma } from "@/lib/prisma";

export default async function getRoomStatus(roomId: string, userId: string): Promise<"No Cleanings" | "Completed" | "Not Completed"> {

    // 1. 指定されたroomIdに紐づく全てのcleaningIdを取得
    const cleaningsInRoom = await prisma.cleaning.findMany({
        where: {
            roomId: roomId
        },
        select: {
            cleaningId: true
        }
    });

    // 部屋に清掃項目が定義されていなければ "No Cleanings"
    if (cleaningsInRoom.length === 0) {
        return "No Cleanings";
    }

    const roomCleaningIds = cleaningsInRoom.map(c => c.cleaningId);

    // 2. 関連するuser_cleaningの状態を一度に取得
    const userCleaningStates = await prisma.user_cleaning.findMany({
        where: {
            userId: userId,
            cleaningId: {
                in: roomCleaningIds
            }
        },
        select: {
            do: true,
            done: true
        }
    });

    // 3. doCountとdoneCountを計算
    let doCount = 0;
    let doneCount = 0;

    for (const state of userCleaningStates) {
        if (state.do) {
            doCount++;
        }
        if (state.done) {
            doneCount++;
        }
    }

    // 4. 状態に応じて結果を返す
    if (doCount === 0) {
        return "No Cleanings";
    }

    if (doCount === doneCount) {
        return "Completed";
    }

    return "Not Completed";
}