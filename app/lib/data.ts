import axios from 'axios';

export async function fetchQuestions() {
    try {
        const response = await axios.get('http://localhost:3010/questions/all');       
        return response.data.question; // This will be your JSON response
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch all questions.');
    }
}