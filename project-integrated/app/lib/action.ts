'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {cookies} from 'next/headers'
import { CategoriesField, QuestionsField } from '@/app/lib/definitions';
import axios from 'axios';
import { CreateUserSuccess } from '@/app/ui/CreateUserSuccess';
import { access } from 'fs';

export async function createQuestion(rawFormData: {
    rawFormData: {
        title: string;
        description: string;
        categories: string;
        complexity: string;
    }[]
}) {

    try {
        const json = JSON.stringify([rawFormData]);
        const url = 'http://127.0.0.1:5000/questions';
        const response = await axios.post(url, json, {
            headers: {
                'Content-Type': 'application/json', // Set the Content-Type header
            },
        });
        console.log('Response data:', response.data);
    } catch (error) {
        console.error('Failed to Create the questions:', error.message);
    }
    revalidatePath('/dashboard');
    redirect('/dashboard');
}

export async function createCategories(formData: FormData) {
    try {
        const json = JSON.stringify(formData);
        const url = 'http://127.0.0.1:5000/categories';
        const response = await axios.post(url, json, {
            headers: {
                'Content-Type': 'application/json', // Set the Content-Type header
            },
        });
        console.log('Response data:', response.data);
    } catch (error) {
        console.error('Failed to Create the category:', error.message);
    }
    revalidatePath('/dashboard');
    redirect('/dashboard');
}


export async function updateQuestion(rawFormData, id) {
    try {
        const json = JSON.stringify(rawFormData);
        const url = `http://127.0.0.1:5000/questions/${id}`;
        const response = await axios.patch(url, json, {
            headers: {
                'Content-Type': 'application/json', // Set the Content-Type header
            },
        });
        console.log('Response data:', response.data);
    } catch (error) {
        console.error('Failed to Update the questions:', error.message);
    }
    revalidatePath('/dashboard');
    redirect('/dashboard');
}

export async function updateCategory(rawFormData: {
    rawFormData: {
        label: string;
        value: string;
    }[]
}) {

    try {
        const json = JSON.stringify(rawFormData);
        console.log(rawFormData);
        const id = rawFormData.value;
        const url = `http://127.0.0.1:5000/categories/${id}`;
        const response = await axios.patch(url, json, {
            headers: {
                'Content-Type': 'application/json', // Set the Content-Type header
            },
        });
        console.log('Response data:', response.data);
    } catch (error) {
        console.error('Failed to Create the category:', error.message);
    }
    revalidatePath('/dashboard');
    redirect('/dashboard');

}

export async function deleteQuestion(id: string) {
    try {
        const response = await axios.delete(`http://127.0.0.1:5000/questions/${id}`);
        console.log(response.data);
        revalidatePath('/');
    } catch (err) {
        console.error('Database Error:', err);
        // throw new Error('Failed to delete the question.');
    }
}

export async function deleteCategory(id: string) {
    try {
        const response = await axios.delete(`http://127.0.0.1:5000/categories/${id}`);
        // console.log(response.data);
        revalidatePath('/');
    } catch (err) {
        console.error('Database Error:', err);
        // throw new Error('Failed to delete the category.');
    }
}

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
        console.log(response.data)
        if (response.status === 200 && response.data.accessToken) {
            const { accessToken } = response.data;
            cookies().set('accessToken', accessToken)

            return { success: true, token: accessToken };
        } else {
            // If the response is ok but no token is present, consider it a failure
            return { success: false, message: "Login successful but no access token was provided." };
        }
    } catch (error) {
        // Catch and handle errors, such as network issues or server errors
        if (axios.isAxiosError(error)) {
            // If the error is an AxiosError, you can extract more detailed info
            return { success: false, message: error.response?.data.message || "An unexpected error occurred." };
        } else {
            // Generic error handling if the error is not from Axios
            return { success: false, message: error.message };
        }
    }
}


export async function getUsername(token: string) {
    try {
      const url = 'http://127.0.0.1:3001/auth/verify-token';
      console.log(`Verifying token with: ${token}`);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('Verification response status: ', response.status);
      if (response.ok) {
        const userData = await response.json();
        console.log('User data retrieved: ', userData)
        return userData.verifiedUser.username;
      }
      return null;
    } catch (error) {
      console.error('Error verifying token:', error);
      return null;
    }
  }