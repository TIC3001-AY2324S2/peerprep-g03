import {
  createMatch,
  createUser,
  deleteUser,
  deleteMatch,
  findUserByEmail,
  updateUser,
  updateUserPrivilege,
  findAllUsers,
  findAllMatches,
} from "./repository.js";

//need to separate orm functions from repository to decouple business ldifficultygic from persistence
export async function ormCreateMatch(topic, difficulty) {
  try {
    const newMatch = await createMatch({ topic, difficulty });
    await newMatch.save();
    return true;
  } catch (err) {
    console.log("ERROR: Could not create new match");
    return { err };
  }
}

export async function ormCreateUser(username, email, password) {
  try {
    const newUser = await createUser({ username, email, password });
    await newUser.save();
    return true;
  } catch (err) {
    console.log("ERROR: Could not create new user");
    return { err };
  }
}

export async function ormDeleteUser(email) {
  try {
    const result = await deleteUser(email);

    // Checking if User existed
    if (result.deletedCount === 0) {
      return false;
    }

    return true;
  } catch (err) {    
    console.log("ERROR: Could not delete user");
    return { err };
  }
}

export async function ormDeleteMatch(topic) {
  try {
    // console.log("topic: ", topic);
    const result = await deleteMatch(topic);

    // Checking if Match existed
    if (result.deletedCount === 0) {
      return false;
    }

    return true;
  } catch (err) {    
    console.log("ERROR: Could not delete match");
    return { err };
  }
}

export async function ormFindUserByEmail(email) {
  try {
    const result = await findUserByEmail(email);

    // Checking if User exists
    if (result) {
      return result;
    }

    return null;
  } catch (err) {
    console.log("ERROR: Could not find user");
    return { err };
  }
}

export async function ormUpdateUser(id, username, email, password) {
  try {
    const result = await updateUser(id, username, email, password);
    console.log(result);

    // Checking if User Details Modified
    if (result.modifiedCount === 0) {
      return false;
    }

    return true;
  } catch (err) {
    console.log("ERROR: Could not update user data");
    return { err };
  }
}

export async function ormUpdateUserPrivilege(email, isAdmin) {
  try {
    const result = await updateUserPrivilege(email, isAdmin);
    console.log(result);

    // Checking if User Details Modified
    if (result.modifiedCount === 0) {
      return false;
    }

    return true;
  } catch (err) {
    console.log("ERROR: Could not update user privilege");
    return { err };
  }
}

export async function ormFindAllUsers() {
  try {
    const result = await findAllUsers();

    // Checking if Users exist
    if (result.length !== 0) {
      return result;
    }

    return null;
  } catch (err) {
    console.log("ERROR: Could not find users");
    return { err };
  }
}

export async function ormFindAllMatches() {
  try {
    const result = await findAllMatches();

    // Checking if Match exist
    if (result.length !== 0) {
      return result;
    }

    return null;
  } catch (err) {
    console.log("ERROR: Could not find matches");
    return { err };
  }
}