import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const GET = async (
  req: NextRequest,
  context: { params: { roomId: string; cleaningId: string } }
) => {
  const { roomId, cleaningId } = context.params;

  const cleaning = await prisma.cleaning.findMany({
    where: { roomId, cleaningId: Number(cleaningId) },
  });

  if (!cleaning || cleaning.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(cleaning, { status: 200 });
};

export { GET };