'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CategoriesField, QuestionsField } from '@/app/lib/definitions';
import axios from 'axios';

export async function createQuestion(rawFormData: {
    rawFormData: {
        title: string;
        description: string;
        categories: string;
        complexity: string;
    }[]
}) {

    console.log(JSON.stringify(rawFormData));

    // todo: createQuestion on server

    revalidatePath('/');
    redirect('/');
}

export async function createCategories(formData: FormData) {    
    const json = JSON.stringify(formData);
    const url = `http://localhost:5000/categories`;
    axios.post(url, json, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => {
            console.log('Response data: ', response.data.data);
            console.log('Content-Type:', response.data.headers['Content-Type']);
        })
        .catch((error) => {
            console.error('Error making POST request: ', error.message);
        });

    revalidatePath('/');
    redirect('/');
}


export async function updateQuestion(rawFormData: QuestionsField[]) {

    console.log(rawFormData);
    // todo: updateQuestion on server

    revalidatePath('/');
    redirect('/');
}

export async function updateCategory(rawFormData: QuestionsField[]) {

    console.log(rawFormData);
    // todo: updateQuestion on server

    revalidatePath('/');
    redirect('/');
}

export async function deleteQuestion(id: string) {
    try {
        const response = await axios.delete(`http://localhost:5000/questions/${id}`);
        console.log(response.data);
        revalidatePath('/');
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to delete the question.');
    }
}

export async function deleteCategory(id: string) {    
    try {
        const response = await axios.delete(`http://localhost:5000/categories/${id}`);
        // console.log(response.data);
        revalidatePath('/');        
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to delete the category.');
    }
}