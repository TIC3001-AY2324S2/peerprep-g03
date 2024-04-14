import { ormCreateMatch as _createMatch } from "../model/match-orm.js";
import { ormDeleteMatch as _deleteMatch } from "../model/match-orm.js";
// import { ormFindUserByEmail as _findUserByEmail } from "../model/user-orm.js";
// import { ormUpdateUser as _updateUser } from "../model/user-orm.js";
// import { ormUpdateUserPrivilege as _updateUserPrivilege } from "../model/user-orm.js";
// import { ormFindAllUsers as _findAllUsers } from "../model/user-orm.js";
import { ormFindAllMatches as _findAllMatches } from "../model/match-orm.js";

export async function createMatch(req, res) {
    try {
        const { topic, difficulty } = req.body;

        if (topic && difficulty) {
            console.log(`CREATE MATCH: Topic Obtained: ${topic}`);
            const resp = await _createMatch(topic, difficulty);
            console.log(resp);
            if (resp.err) {
                return res.status(409).json({
                    message:
                        "Could not create a new match! (Possibly topic Already Exists!)",
                });
            } else {
                console.log(`Created new match ${topic} successfully!`);
                return res
                    .status(201)
                    .json({ message: `Created new match ${topic} successfully!` });
            }
        } else {
            return res.status(400).json({
                message: "Topic or Difficulty are missing!",
            });
        }
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Database failure when creating new match!" });
    }
}

export async function deleteMatch(req, res) {
    try {
      const { topic } = req.body;
      if (topic) {
        console.log(`DELETE MATCH: Topic Obtained: ${topic}`);
        const response = await _deleteMatch(topic);
        console.log(response);
        if (response.err) {
          return res.status(400).json({ message: "Could not delete the match!" });
        } else if (!response) {
          console.log(`Match with ${topic} not found!`);
          return res
            .status(404)
            .json({ message: `Match with ${topic} not found!` });
        } else {
          console.log(`Deleted match ${topic} successfully!`);
          return res
            .status(200)
            .json({ message: `Deleted match ${topic} successfully!` });
        }
      } else {
        return res.status(400).json({
          message: "Topic is missing!",
        });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Database failure when deleting user!" });
    }
  }

export async function getAllMatches(req, res) {
    console.log(`GET ALL USERS`);
  
    const response = await _findAllMatches();
  
    console.log(response);
  
    if (response === null) {
      return res.status(404).json({ message: `No match exist!` });
    } else if (response.err) {
      return res.status(400).json({ message: "Could not find matches!" });
    } else {
      console.log(`Matches found!`);
      return res.status(200).json({
        message: `Found matches!`,
        matches: response,
      });
    }
  }