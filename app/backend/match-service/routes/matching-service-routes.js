import express from "express";
import { ormCreateUser as _createUser } from "../model/match-orm.js";
import { ormDeleteMatch as _deleteMatch } from "../model/match-orm.js";
import { createMatch, getAllMatches, deleteMatch } from "../controller/matching-cotroller.js";

const router = express.Router();

router.post("/", createMatch);

router.get("/all", getAllMatches)

router.delete("/", deleteMatch);

export default router;