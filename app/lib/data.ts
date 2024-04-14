import axios from 'axios';

export async function fetchMatches() {
    try {
        const response = await axios.get('http://localhost:6000/matching/all');
        // console.log(response.data.matches);
        return response.data.matches;
    } catch (err) {
        console.error('Database Error:', err);
        // throw new Error('Failed to fetch all questions.');
    }
}

export async function fetchQuestions() {
    try {
        const response = await axios.get('http://127.0.0.1:5000/questions');
        return response.data;
    } catch (err) {
        console.error('Database Error:', err);
        // throw new Error('Failed to fetch all questions.');
    }
}

export async function fetchCategories() {
    try {
        const response = await axios.get('http://127.0.0.1:5000/categories');
        return response.data;
    } catch (err) {
        console.error('Database Error:', err);
        // throw new Error('Failed to fetch all categories.');
    }
}

export async function fetchQuestionById(id: string) {
    try {
        const response = await axios.get(`http://127.0.0.1:5000/questions/${id}`);
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
        const response = await axios.get(`http://127.0.0.1:5000/categories/${id}`);
        const resultById = response.data;
        return resultById; // This will be your JSON response
    } catch (err) {
        console.error('Database Error:', err);
        // throw new Error('Failed to fetch the category by Id.');
    }
}