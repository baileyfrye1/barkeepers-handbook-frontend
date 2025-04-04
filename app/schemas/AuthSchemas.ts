import { z } from 'zod';

export const UserMetaSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(20),
});

export const SignUpSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(20),
  password: z.string(),
});

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type AuthState =
  | {
      isAuthenticated: false;
    }
  | {
      isAuthenticated: true;
      user: {
        email?: string;
        meta: {
          username?: string;
        };
      };
    };
