import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || 3001,
  jwt: {
    secret: process.env.JWT_SECRET!,
    accessExpiration: "15m",
    refreshExpiration: "7d",
  },
  supabase: {
    url: process.env.SUPABASE_URL!,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    jwtSecret: process.env.SUPABASE_JWT_SECRET!,
  },
  resend: {
    apiKey: process.env.RESEND_API_KEY!,
    fromEmail: process.env.RESEND_FROM_EMAIL!,
  },
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000",
  nodeEnv: process.env.NODE_ENV || "development",
};

export default config;
