import {categories, askCategoryById} from '../../../lib/placeholder-data.js';

export async function createCategory(req, res) {
    try {
        console.log("Create question function call.");
        return res
            .status(201)
            .json({message: 'Created dummy question successful!'});
    } catch (error) {
        
    }
}

export async function deleteCategory(req, res) {
    try {
        console.log("Delete question function call.");
        return res
            .status(200)
            .json({message: 'Deleted dummy question successful!'});
    } catch (error) {
        
    }
}

export async function updateCategory(req, res) {
    try {
        console.log("updateQuestion function call.");
        return res
            .status(200)
            .json({message: 'Update question dummy successful!'});
    } catch (error) {
        
    }
}

export async function getCategories(req, res) {
   
    try {
        console.log("getQuestion function call.");
        return res
            .status(200)
            .json({message: categories});
    } catch (error) {
        
    }
}

export async function getCategoryById(req, res) {
    const { id } = req.params;
   
    const getcatById = askCategoryById(id);
    try {
        console.log("getQuestionById function call.");
        return res
            .status(200)
            .json({message: getcatById});
    } catch (error) {
        
    }
}