import { ormCreateMatch as _createMatch } from "../model/match-orm.js";
// import { ormDeleteUser as _deleteUser } from "../model/match-orm.js";
// import { ormFindUserByEmail as _findUserByEmail } from "../model/user-orm.js";
// import { ormUpdateUser as _updateUser } from "../model/user-orm.js";
// import { ormUpdateUserPrivilege as _updateUserPrivilege } from "../model/user-orm.js";
// import { ormFindAllUsers as _findAllUsers } from "../model/user-orm.js";

export async function createPotentialMatch(req, res) {
    try {
        const { topic, difficulty } = req.body;

        // const salt = bcrypt.genSaltSync(10);
        // const hashedPassword = bcrypt.hashSync(password, salt);

        if (topic && difficulty) {
            console.log(`CREATE USER: Email Obtained: ${topic}`);
            const resp = await _createMatch(topic, difficulty);
            console.log(resp);
            if (resp.err) {
                return res.status(409).json({
                    message:
                        "Could not create a new match! (Possibly topic Already Exists!)",
                });
            } else {
                console.log(`Created new user ${topic} successfully!`);
                return res
                    .status(201)
                    .json({ message: `Created new user ${topic} successfully!` });
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