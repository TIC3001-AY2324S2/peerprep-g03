import express from "express";

import {createQuestion, deleteQuestion, getQuestionByComplexity, updateQuestion, getQuestion, getQuestionById} from "../controller/question-cotroller.js";

const router = express.Router();

router.post("/", createQuestion);

router.delete("/", deleteQuestion);

router.get("/complexity/", getQuestionByComplexity);

router.get("/all/", getQuestion);

router.get("/:id", getQuestionById);

router.patch("/", updateQuestion);

export default router;