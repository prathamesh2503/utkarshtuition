import "dotenv/config";
import process from "node:process";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const plainPassword = process.env.ADMIN_PASSWORD;
  const passwordHash = hash(plainPassword, 10);
  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      passwordHash,
    },
  });

  console.log("User Created/Exists", user);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })

  .finally(async () => {
    await prisma.$disconnect();
  });
