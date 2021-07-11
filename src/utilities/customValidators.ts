import validator from "validator";

export const isValidPassword = (password: any) => typeof password === "string" && password.length > 7 && password.length < 20;

export const isValidName = (name: any) => typeof name === "string" && name.length > 2 && name.length < 25;

export const isValidEmail = (email: any) => validator.isEmail(email);

export const isValidId = (id: any) => validator.isUUID(id);

export const isStringJson = (string: any) =>
   typeof string === "string" &&
   /^[\],:{}\s]*$/.test(
      string
         .replace(/\\["\\\/bfnrtu]/g, "@")
         .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]")
         .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
   );