// import {question, askQuestionById} from '../../../lib/placeholder-data.js';

export async function createQuestion(req, res) {
    try {
        console.log("Create question function call.");
        return res
            .status(201)
            .json({message: 'Created dummy question successful!'});
    } catch (error) {
        
    }
}

export async function deleteQuestion(req, res) {
    try {
        console.log("Delete question function call.");
        return res
            .status(200)
            .json({message: 'Deleted dummy question successful!'});
    } catch (error) {
        
    }
}

export async function getQuestionByComplexity(req, res) {
    try {
        console.log("GetQuestionByComplexity function call.");
        return res
            .status(200)
            .json({message: 'Get Question by complexity dummy successful!'});
    } catch (error) {
        
    }
}

export async function updateQuestion(req, res) {
    try {
        console.log("updateQuestion function call.");
        return res
            .status(200)
            .json({message: 'Update question dummy successful!'});
    } catch (error) {
        
    }
}

export async function getQuestion(req, res) {

    try {
        console.log("getQuestion function call.");
        return res
            .status(200)
            .json({message: question});
    } catch (error) {
        
    }
}

export async function getQuestionById(req, res) {
    const { id } = req.params;
   
    const askQuestionById = askQuestionById(id);
    try {
        console.log("getQuestionById function call.");
        return res
            .status(200)
            .json({message: askQuestionById});
    } catch (error) {
        
    }
}