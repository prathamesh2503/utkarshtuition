import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function test() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("DB connected!");
  } catch (err) {
    console.error(err);
  }
}

test();
