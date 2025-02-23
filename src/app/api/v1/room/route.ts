import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const GET = async () => {
    const allRooms = await prisma.room.findMany() // 非同期処理
    return NextResponse.json(allRooms)
}

export { GET }