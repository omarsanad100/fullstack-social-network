import { PrismaClient } from "@prisma/client";
// This is a singleton pattern to ensure that we only have one instance of PrismaClient

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma; // Keeps a single, reusable client instance.

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
