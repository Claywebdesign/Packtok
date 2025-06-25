// packages/db/prisma/seed.ts
import bcrypt from "bcrypt";
import { prisma, Role } from "../src/index";

async function main() {
  const superAdminEmail = "founder@packtok.io";

  const existing = await prisma.user.findUnique({
    where: { email: superAdminEmail },
  });
  if (existing) return;

  await prisma.user.create({
    data: {
      name: "Founder",
      email: superAdminEmail,
      password: await bcrypt.hash("ChangeMe!", 12),
      verified: true,
      role: Role.SUPER_ADMIN,
    },
  });
}
main();
