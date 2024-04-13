'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CategoriesField, QuestionsField } from '@/app/lib/definitions';
import axios from 'axios';
import { CreateUserSuccess } from '@/app/ui/CreateUserSuccess';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function createUser(formData: FormData) {
    try {
        const json = JSON.stringify(formData);
        const url = 'http://localhost:3001/users/';
        const response = await axios.post(url, json, {
            headers: {
                'Content-Type': 'application/json', // Set the Content-Type header
            },
        });
        console.log('Response data:', response.data);
    } catch (error) {
        console.error('Failed to Create the user:', error.message);
        revalidatePath('/app/not-found.tsx');
        redirect('/app/not-found.tsx');
    }

    revalidatePath('/user-service/login');
    redirect('/user-service/login');
}

export async function loginUser(formData: FormData) {
    try {
        const json = JSON.stringify(formData);
        const url = 'http://localhost:3001/auth/login';
        const response = await axios.post(url, json, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const accessToken = response.data.accessToken;

        const url2 = 'http://localhost:3001/users/';
        const response2 = await axios.get(url2, {
            headers: {
                Authorization: `Bearer ${accessToken}`,                
            },
            data: {
                email: formData.email,
            },            
        });


        const userData = response2.data;        

        return userData;
        
    } catch (error) {
        console.error('Error:', error.message);
    }
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {    
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
  }
