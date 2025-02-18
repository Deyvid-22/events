import { z } from "zod";

const envShema = z.object({
  PORT: z.coerce.number().default(3333),
});

export const env = envShema.parse(process.env);
