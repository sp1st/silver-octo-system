import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const GET = async (req: NextRequest, { params }: { params: Promise<{userId:string, cleaningId: string}>}) => {
  try {
    const { userId, cleaningId } = await params;
    const userCleaning = await prisma.user_cleaning.findMany({
      where: {
          userId: userId,
          cleaningId: Number(cleaningId),
      }
      //,
      //select: {
      //  do: true,
      //  done: true,
      //}
    });
    return NextResponse.json(userCleaning, { status: 200 });
  } catch (e) {
    console.error("Error in GET request:", e);
    return NextResponse.json({error: e, status: 500 });
  }
}

export { GET }