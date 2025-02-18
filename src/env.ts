import { z } from "zod";

const envShema = z.object({
  PORT: z.coerce.number().default(3333),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  POSTGRES_URL: z.string().url(),
  REDIS_URL: z.string().url(),
});

export const env = envShema.parse(process.env);
