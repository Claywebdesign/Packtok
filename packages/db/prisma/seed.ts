// packages/db/prisma/seed.ts
import { createClient } from "@supabase/supabase-js";
import { prisma, Role } from "../src/index";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

async function main() {
  const email = "founder@packtok.io";
  if (await prisma.user.findUnique({ where: { email } })) return;

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password: "ChangeMe!",
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
main();
