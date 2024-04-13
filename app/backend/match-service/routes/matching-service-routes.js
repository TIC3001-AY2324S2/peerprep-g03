import express from "express";
import { ormCreateUser as _createUser } from "../model/match-orm.js";
import { ormDeleteUser as _deleteUser } from "../model/match-orm.js";
import { createPotentialMatch } from "../controller/matching-cotroller.js";

const router = express.Router();

router.post("/", createPotentialMatch);


export default router;