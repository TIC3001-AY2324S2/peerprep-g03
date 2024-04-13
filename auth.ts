import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { loginUser } from '@/app/lib/action';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const rawFormData = {
            email: email,
            password: password,
          }
          const userData = await loginUser(rawFormData);

          if(userData != undefined){
            return userData
          }
          return null;
        }
      }
      
    }),
  ],
});