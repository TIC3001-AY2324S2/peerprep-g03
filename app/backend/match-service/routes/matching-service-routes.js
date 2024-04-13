import express from "express";
import { ormCreateUser as _createUser } from "../model/user-orm.js";
import { ormDeleteUser as _deleteUser } from "../model/user-orm.js";
import {createQuestion as createPotentialMatch, deleteQuestion, getQuestionByComplexity, updateQuestion, getQuestion, getQuestionById} from "../controller/question-cotroller.js";

const router = express.Router();

router.post("/", createPotentialMatch);


export default router;