export const camelToSnake = (string: string) => string.replace(/[\w]([A-Z])/g, (m) => m[0] + "_" + m[1]).toLowerCase();

export const snakeToCamel = (string: string) => string.replace(/(_\w)/g, (m) => String(m[1]).toUpperCase());

export const camelToDash = (string: string) => string.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

export const spaceToCamel = (string: string) => snakeToCamel(string.replace(/ /g, "_").toLowerCase());