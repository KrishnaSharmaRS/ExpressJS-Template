import { NextFunction, Request, Response } from "express";

import { isValidEmail, isValidId, isValidName, isValidPassword } from "../utilities/customValidators";

export enum EFieldInRequest {
    body = "body",
    params = "params",
    query = "query"
}

export interface IExtraValidation {
    validator: (field: any) => boolean;
    title: string;
    field: string;
    fieldInRequest?: EFieldInRequest;
};

export const idValidation = (field: string, title: string, fieldInRequest: EFieldInRequest = EFieldInRequest.params): IExtraValidation => ({ field, title, validator: isValidId, fieldInRequest })
export const emailValidation: IExtraValidation = { field: "email", title: "Email", validator: isValidEmail };
export const firstNameValidation: IExtraValidation = { field: "firstName", title: "First Name", validator: isValidName };
export const lastNameValidation: IExtraValidation = { field: "lastName", title: "Last Name", validator: isValidName };
export const passwordValidation: IExtraValidation = { field: "password", title: "Password", validator: isValidPassword };

export const requiredAttributes = (attributes: string[]) => (req: Request, res: Response, next: NextFunction) => {
    for (const attribute of attributes)
        if (!req.body[attribute]) {
            res.status(406).send({ error: `'${attribute}' field is required!` });
            return;
        }

    next();
};

export const validateAttributes = (extraValidations: IExtraValidation[]) => (req: Request, res: Response, next: NextFunction) => {
    if (extraValidations?.length) for (const validate of extraValidations) {
        if (!validate.validator(req[validate.fieldInRequest || "body"][validate.field])) {
            res.status(406).send({ error: `'${validate.title}' is Invalid!` })
            return;
        }
    }

    next();
};