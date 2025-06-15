import { PrismaClient } from "@prisma/client"

// const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
// export const prisma = globalForPrisma.prisma || new PrismaClient()
// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export { prisma }; // prisma を名前付きエクスポート

if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}