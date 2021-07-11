import { hashSync } from "bcryptjs";
import { DataTypes, ModelDefined } from "sequelize";

import sequelize from "../../database/sequelize";
import { IUser, IUserCreation, IUserInstance } from "./types";

const User: ModelDefined<IUser, IUserCreation> = sequelize.define<IUserInstance>("User", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    firstName: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    },
    username: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING,
        set(value) {
            this.setDataValue("password", hashSync(value as string));
        }
    },
    phone: {
        type: DataTypes.INTEGER.UNSIGNED
    },
    profilePictureUrl: {
        type: DataTypes.STRING
    },
    sponserId: {
        type: DataTypes.STRING
    },
    language: {
        type: DataTypes.STRING
    },
    ipAddress: {
        type: DataTypes.STRING
    },
    passwordResetToken: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    },
    deletedAt: {
        type: DataTypes.DATE
    },
}, {
    paranoid: true
});

export default User;