require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const plainPassword = process.env.ADMIN_PASSWORD;

  const passwordHash = await bcrypt.hash(plainPassword, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {}, // do nothing if exists
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
