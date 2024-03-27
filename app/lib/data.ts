import axios from 'axios';

export async function fetchQuestions() {
    try {
        const response = await axios.get('http://localhost:3010/questions/all');
        return response.data.message; // This will be your JSON response
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch all questions.');
    }
}

export async function fetchQuestionById(id: string) {
    try {
        const response = await axios.get(`http://localhost:3010/questions/${id}`);        
        const questionById = response.data.message;        
        return questionById; // This will be your JSON response
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch the question by Id.');
    }
}