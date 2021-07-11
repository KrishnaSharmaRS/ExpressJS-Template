import { Router } from "express";

// ---------------------------- CONTROLLERS -------------------------------
import { createOrUpdateUser, deleteUserById, getUserById } from "../../controllers/usersController";

// ---------------------------- MIDDLEWARES -------------------------------
import { emailValidation, firstNameValidation, idValidation, lastNameValidation, passwordValidation, requiredAttributes, validateAttributes } from "../../middlewares/validators.middleware";

const usersRouter = Router();

// POST REQUEST TO GET USER.
usersRouter.post("/:userId", validateAttributes([idValidation("userId", "User ID")]), getUserById);
// PUT REQUEST TO CREATE USER.
usersRouter.put("/", requiredAttributes(["username"]), validateAttributes([emailValidation, firstNameValidation, lastNameValidation, passwordValidation]), createOrUpdateUser);
// PATCH REQUEST TO UPDATE USER.
usersRouter.patch("/:userId", validateAttributes([emailValidation, firstNameValidation, lastNameValidation, passwordValidation, idValidation("userId", "User ID")]), createOrUpdateUser);
// DELETE REQUEST TO DELETE USER.
usersRouter.delete("/:userId", validateAttributes([idValidation("userId", "User ID")]), deleteUserById);

export default usersRouter;