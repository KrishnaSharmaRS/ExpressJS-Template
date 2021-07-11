import { Request, Response } from "express";

import User from "../../models/userModel";
import { IUserInstance } from "../../models/userModel/types";

export const getUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const user = await User.findOne({
            where: {
                id: userId
            }
        });

        if (!user) {
            res.status(400).send({ error: "No User found with this email!" });
            return;
        }

        res.send({ message: "Success.", data: user._attributes });
    } catch (error) {
        console.error(error.massage, error);
        res.status(500).send({ error: "Something went wrong! Please try again later." });
    }
}

export const createOrUpdateUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { firstName, lastName, email, password, username, phone, sponserId, language } = req.body;

    const userData = {
        email,
        firstName,
        password, // It wil be HASHED automatically from the SEQUELIZE  MODE.
        lastName,
        username,
        phone,
        ipAddress: req.ip,
        sponserId,
        language
    };

    // What not to UPDATE :-
    if (userId) {
        delete userData.email;
        delete userData.password;
        delete userData.username;
        delete userData.sponserId;
    }

    try {
        const newUser = !userId ? await User.create(userData) : await User.update(userData, { where: { id: userId } });

        res.send({
            message: "Your account created successfully.",
            data: {
                id: userId || (newUser as IUserInstance)._attributes.id
            }
        });
    } catch (error) {
        console.error(error.message, error);

        const emailError = error.parent?.errno === 1062;

        res.status(emailError ? 409 : 500).send({ error: emailError ? "This email is already registered!" : "Something went wrong! Please try again later." });
    }
};

export const deleteUserById = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        await User.destroy({
            where: {
                id: userId
            }
        });

        res.send({ message: "Deleted the User Account successfully." })
    } catch (error) {
        console.error(error.massage, error);
        res.status(500).send({ error: "Something went wrong! Please try again later." });
    }
}