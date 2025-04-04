import { z } from "zod";

export const UserSchema = z.object({
  created_at: z.string(),
  email: z.string().email(),
  id: z.string(),
  phone: z.string(),
  role: z.string(),
  updated_at: z.string(),
});
