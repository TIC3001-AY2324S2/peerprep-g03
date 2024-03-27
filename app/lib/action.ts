'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CategoriesField, QuestionsField } from '@/app/lib/definitions';

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


export async function updateQuestion (rawFormData: QuestionsField[]){
    
    console.log(rawFormData);
    // todo: updateQuestion on server

    revalidatePath('/');
    redirect('/');        
}

export async function deleteQuestion(id: string) {
    // todo: deleteQuestion on server
  }