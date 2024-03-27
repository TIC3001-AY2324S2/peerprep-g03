'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createQuestion (rawFormData: {rawFormData: {
    title: string;
    description: string;
    category: string;
    complexity: string;
}[]}){
            
    
    // console.log(rawFormData);
    
    // todo: createQuestion on server

    revalidatePath('/');
    redirect('/');        
}


export async function updateQuestion (id: string, formData: FormData){
    const rawFormData = {
        title: formData.get('title'),
        description: formData.get('description'),
        category: formData.get('category'),
        complexity: formData.get('complexity'),
    }
    console.log("id: " + id);
    console.log(rawFormData);
    // todo: updateQuestion on server

    revalidatePath('/');
    redirect('/');        
}

export async function deleteQuestion(id: string) {
    // todo: deleteQuestion on server
  }