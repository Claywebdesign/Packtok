import { Permission, Role, User, prisma } from "@packtok/db";
import { ApiError } from "../utils/apiError";
import supabase from "../utils/supabaseClient";

export const createAdminUser = async (
  adminData: {
    name: string;
    email: string;
    phone_number?: string;
    password: string;
    country?: string;
  },
  permissions: Permission[]
): Promise<User> => {
  const existingUser = await prisma.user.findUnique({
    where: { email: adminData.email },
  });
  if (existingUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  const { data, error } = await supabase.auth.admin.createUser({
    email: adminData.email,
    password: adminData.password,
    email_confirm: true, // for admin we want to confirm email immediately
    phone: adminData.phone_number,
    user_metadata: {
      name: adminData.name,
      country: adminData.country,
    },
  });

  if (error || !data.user) {
    throw new ApiError(500, `Supabase user creation failed: ${error?.message}`);
  }

  const newAdmin = await prisma.user.create({
    data: {
      id: data.user.id, // Supabase UUID
      name: adminData.name,
      email: adminData.email,
      phone_number: adminData.phone_number,
      role: Role.ADMIN,
      country: adminData.country,
    },
  });

  if (permissions && permissions.length > 0) {
    await prisma.adminPermission.createMany({
      data: permissions.map((permission) => ({
        userId: newAdmin.id,
        permission,
      })),
    });
  }

  return newAdmin;
};
