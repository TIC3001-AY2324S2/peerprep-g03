import axios from 'axios';

export async function fetchQuestions() {
    try {
        const response = await axios.get('http://question-service:8000/questions');        
        return response.data; 
    } catch (err) {
        console.error('Database Error:', err);
        // throw new Error('Failed to fetch all questions.');
    }
}

export async function fetchCategories() {
    try {
        const response = await axios.get('http://question-service:8000/categories');        
        return response.data; 
    } catch (err) {
        console.error('Database Error:', err);
        // throw new Error('Failed to fetch all categories.');
    }
}

export async function fetchQuestionById(id: string) {
    try {
        const response = await axios.get(`http://question-service:8000/questions/${id}`);
        const resultById = response.data;
        // console.log(resultById);
        return resultById; // This will be your JSON response
    } catch (err) {
        console.error('Database Error:', err);
        // throw new Error('Failed to fetch the question by Id.');
    }
}

export async function fetchCategoryById(id: string) {
    try {
        const response = await axios.get(`http://question-service:8000/categories/${id}`);
        const resultById = response.data;
        return resultById; // This will be your JSON response
    } catch (err) {
        console.error('Database Error:', err);
        // throw new Error('Failed to fetch the category by Id.');
    }
}