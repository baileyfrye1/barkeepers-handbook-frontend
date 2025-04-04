import { createServerFn } from '@tanstack/react-start';
import { supabaseServerClient } from './supabase';
import { toast } from 'sonner';
import {
  AuthState,
  SignInSchema,
  SignUpSchema,
  UserMetaSchema,
} from '@/schemas/AuthSchemas';

export const signUpUser = createServerFn({ method: 'POST' })
  .validator(SignUpSchema)
  .handler(async ({ data: { email, password, username } }) => {
    const { data, error } = await supabaseServerClient().auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username,
        },
      },
    });

    if (error) {
      switch (error.code) {
        case 'email_exists':
          toast.error('Email already exists. Please log in.');
          throw new Error('Email already exists. Please log in.');
        case 'weak_password':
          toast.error('Password is too weak. Please try a stronger password.');
          throw new Error(
            'Password is too weak. Please try a stronger password.',
          );
        default:
          throw new Error(error.message);
      }
    }

    if (data.user) {
      return data.user.id;
    }

    throw new Error('Something went wrong. Please try again.');
  });

export const signInUser = createServerFn({ method: 'POST' })
  .validator(SignInSchema)
  .handler(async ({ data: { email, password } }) => {
    const { error } = await supabaseServerClient().auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }
  });

export const signOut = createServerFn().handler(async () => {
  await supabaseServerClient().auth.signOut();
});

export const getUser = createServerFn().handler<AuthState>(async () => {
  const {
    data: { user },
  } = await supabaseServerClient().auth.getUser();

  if (!user) {
    return { isAuthenticated: false };
  }

  return {
    isAuthenticated: true,
    user: {
      email: user.email,
      meta: { username: user.user_metadata.username },
    },
  };
});

export const updateUser = createServerFn()
  .validator(UserMetaSchema)
  .handler(async ({ data }) => {
    const { error } = await supabaseServerClient().auth.updateUser({
      data: { email: data.email, username: data.username },
    });

    if (error) {
      throw new Error(error.message);
    }
  });
