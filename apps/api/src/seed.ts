import { prisma, Role } from "@packtok/db";
import { createClient } from "@supabase/supabase-js";

/*
  Seed script: Creates a SUPER_ADMIN account (Founder) if it doesn’t exist.
  Run:
    pnpm --filter @packtok/api run seed
*/

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: { autoRefreshToken: false, persistSession: false },
  }
);

async function main() {
  const email = "founder@packtok.io";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return;

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password: "ChangeMe!", // change after first login
    email_confirm: true,
    user_metadata: { name: "Founder" },
  });
  if (error || !data.user) throw error;

  await prisma.user.create({
    data: {
      id: data.user.id,
      name: "Founder",
      email,
      role: Role.SUPER_ADMIN,
    },
  } as any);
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
