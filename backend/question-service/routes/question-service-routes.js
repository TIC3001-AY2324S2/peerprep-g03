import express from "express";

import {createQuestion, deleteQuestion, getQuestionByComplexity, updateQuestion} from "../controller/question-cotroller.js";

const router = express.Router();

router.post("/", createQuestion);

router.delete("/", deleteQuestion);

router.get("/complexity/", getQuestionByComplexity);

router.patch("/", updateQuestion);

export default router;