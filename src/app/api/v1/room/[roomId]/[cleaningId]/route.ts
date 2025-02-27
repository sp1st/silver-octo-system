import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const GET = async (
  req: NextRequest, { params }: { params: Promise<{cleaningId: string}> }
) => {
    const { cleaningId } = await params;

    const cleaning = await prisma.cleaning.findMany({
      where: {cleaningId: Number(cleaningId)}
    });

    if (!cleaning) {
        return NextResponse.json(cleaning, { status: 404 });
    }

    return NextResponse.json(cleaning, { status: 200 });
}

export { GET }