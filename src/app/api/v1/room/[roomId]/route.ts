import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const GET = async (req: NextRequest, { params }: { params: Promise<{roomId: string}> }) => {
    const { roomId } = await params

    const cleanings = await prisma.cleaning.findMany({where: {roomId: roomId}});

    if (!cleanings) {
        return NextResponse.json(cleanings, { status: 404 });
    }

    return NextResponse.json(cleanings, { status: 200 });
}

export { GET }