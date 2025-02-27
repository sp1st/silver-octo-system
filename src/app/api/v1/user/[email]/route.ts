import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

const GET = async(req: NextRequest, {params}: {params : Promise<{email: string}>}) => {
  const { email } = await params
  const userId = await prisma.user.findUnique({
      where:{
          email
      },
      select:{
          id: true
      }
  })

  if (!userId) {
    return NextResponse.json(userId, { status: 404 });
}

  return NextResponse.json(userId, { status: 200 });
}

export { GET }