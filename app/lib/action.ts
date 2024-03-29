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

    console.log(JSON.stringify(formData));

    // todo: createQuestion on server

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
    // todo: deleteQuestion on server
}

export async function deleteCategory(id: string) {    
    try {
        const response = await axios.delete(`http://localhost:5000/categories/${id}`);
        console.log(response.data);
        // return response.data; 
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to delete the category.');
    }
}