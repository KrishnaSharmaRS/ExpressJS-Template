import { Optional, Model } from "sequelize";

import { IModel, OptionalCreationAttributes } from "..";

type OptionalAttributes = "profilePictureUrl" | "passwordResetToken";
type UserOptionalAttributes = OptionalAttributes | OptionalCreationAttributes;

export interface IUser extends IModel {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    phone: number;
    profilePictureUrl: string;
    sponserId: string;
    language: string;
    ipAddress: string;
    passwordResetToken: string;
}

export interface IUserInstance extends Model<IUser, IUserCreation> { }

export interface IUserCreation extends Optional<IUser, UserOptionalAttributes> { }