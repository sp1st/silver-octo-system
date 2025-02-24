import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const GET = async (req: NextRequest, { params }: { params: { roomId: string, cleaningId: string } }) => {
    const { roomId, cleaningId } = params;

    const cleaning = await prisma.cleaning.findMany({ where: { roomId: roomId, cleaningId: Number(cleaningId) } });

    if (!cleaning) {
        return NextResponse.json(cleaning, { status: 404 });
    }

    return NextResponse.json(cleaning, { status: 200 });
}

export { GET }