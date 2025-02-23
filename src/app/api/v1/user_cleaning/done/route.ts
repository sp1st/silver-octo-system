import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


const PUT = async (req: NextRequest) => {
  try {
    const { userId, cleaningId, done: doneStatus } = await req.json();
    const userCleaning = await prisma.user_cleaning.updateMany({
      where: {
        AND: [
          { userId: userId },
          { cleaningId: cleaningId }
        ]
      },
      data: {
        done: doneStatus,
      },
    })

    console.log(userCleaning)
    return NextResponse.json(userCleaning, { status: 200 });
  } catch (e) {
    return NextResponse.json({error: e, status: 500 });
  }
}

export { PUT }