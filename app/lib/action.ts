'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CategoriesField, QuestionsField } from '@/app/lib/definitions';
import axios from 'axios';
import { CreateUserSuccess } from '@/app/ui/CreateUserSuccess';

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
    revalidatePath('/');
    redirect('/');
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
    revalidatePath('/');
    redirect('/');
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
    revalidatePath('/');
    redirect('/');
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
    revalidatePath('/');
    redirect('/');

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

        const accessToken = response.data.accessToken;
        revalidatePath('/matching')
        redirect('/matching')
        // return {success: true, accessToken}

        // const url2 = 'http://localhost:3001/users/';
        // const response2 = await axios.get(url2, {
        //     headers: {
        //         Authorization: `Bearer ${accessToken}`,                
        //     },
        //     data: {
        //         email: formData.email,
        //     },            
        // });

        // if (response2.data) {
        //     console.log('User data:', response2.data);
        // } else {
        //     console.warn('No user data found in response');
        // }

        // const userData = response2.data;

        // return userData;
        
    } catch (error) {
        console.error('Error:', error.message);
    }
}
