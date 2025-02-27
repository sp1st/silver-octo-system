import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const POST = async (req: NextRequest) => {
  try {
    const { userId, cleaningId } = await req.json();
    const userCleaning = await prisma.user_cleaning.upsert({
      where:{
        userId_cleaningId: {
          userId: userId,
          cleaningId: cleaningId,
        }
      },
      update: {},
      create: {
        userId: userId,
        cleaningId: cleaningId,
        do: true,
        done: false,
      },
    })

    console.log(userCleaning)
    return NextResponse.json(userCleaning, { status: 200 });
  } catch (e) {
    return NextResponse.json({error: e, status: 500 });
  }
}

export { POST }